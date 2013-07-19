var comment = require("../modules/mod_comment")
  , mod_app = require("../modules/mod_app")
  , user = lib.mod.user
  , async = require("async");

exports.create = function (comment_, callback_){
  var date = Date.now();
  var appId = comment_.appId;
  comment_.create_date = date;
  comment_.update_date = date;

  if(comment_.rank > 5){
    comment_.rank = 5;
  }

  if (comment_.rank < 0) {
    comment_.rank = 0;
  }

  var tasks = [];
  var task_createComment = function(cb){
    comment.create(comment_, function(err, result){
      err = err ? new error.InternalServer(err) : null;
      if (err) {
        return callback_(err);
      } else {
        cb(err, result);
      }
    });
  };
  tasks.push(task_createComment);

  var task_getRankAvg = function(result, cb){
    comment.getRankAvg(appId, function(err, rank){
      if (err) {
        return callback_(err);
      } else {
        var data = {
            comment: result
          , rank: rank
        };
        cb(err, data);
      }
    });
  };
  tasks.push(task_getRankAvg);

  var task_updateAppRank = function(result, cb){
    var rank = result.rank.rankAvg;
    var id = result.rank._id;
    mod_app.updateRank(id, rank, function(err, app){
      result.app = app;
      cb(err, result);
    });
  };
  tasks.push(task_updateAppRank);

  async.waterfall(tasks,function(err,result){
    return callback_(err, result.comment);
  });
};

exports.list = function(appId_, version_, start_, count_, callback_){
  var tasks = [];
  var task_getComments = function(cb){
    var condition = {
        appId: appId_
      , version: version_
    };
    var options = {
        start: start_
      , limit: count_
    };
    comment.list(condition, options, function(err, result){
      cb(err, result);
    });
  };
  tasks.push(task_getComments);

  var task_getUsers = function(result, cb){
    async.forEach(result.items, function(cmt, cb_){
      user.at(cmt.create_user, function(err, user){
        cmt._doc.user = user;
        cb_(err);
      });
    }, function(err){
      cb(err, result);
    });
  };
  tasks.push(task_getUsers);

  async.waterfall(tasks,function(err,result){
    return callback_(err, result);
  });
};