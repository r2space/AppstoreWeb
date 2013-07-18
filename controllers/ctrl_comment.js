var comment = require("../modules/mod_comment")
  , mod_app = require("../modules/mod_app")
  , async = require("async");

exports.create = function (comment_, callback_){
  var date = new Date();
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