var app = require("../modules/mod_app.js")
  , user = lib.mod.user
  , async = require("async");
var error = lib.core.error;

exports.create = function (data_, callback_){
  var date = Date.now();
  var app_ = data_;
  app_.create_date = date;
  app_.update_date = date;

  app.create(app_, function(err, result){
      console.log(err);
    err = err ? new error.InternalServer(err) : null;
    return callback_(err, result);
  });
};

exports.getAppInfoById = function(app_id_,callback_){
    app.find(app_id_,callback_);
};

exports.list = function(uid_, sort_, asc_, admin_, start_, count_, callback_){
  var condition = {};
  if (admin_) {
    condition.$or = [
        {'create_user': uid_}
      , {'permission.admin': uid_}
      , {'permission.edit': uid_}
    ];
  }
  var options = {
      start: start_
    , limit: count_
  };
  if (sort_){
    options.sort = {};
    options.sort[sort_] = asc_ == 1 ? 1 : -1;
  }

  var tasks = [];
  var task_getAppList = function(cb){
    app.list(condition, options, function(err, result){
      cb(err,result);
    });
  };
  tasks.push(task_getAppList);

  var task_getCreator = function(result, cb){
    async.forEach(result.items, function(app, cb_){
      user.at(app.create_user, function(err, creator){
        app._doc.creator = creator;
        cb_(err);
      });
    }, function(err){
      cb(err, result);
    });
  };
  tasks.push(task_getCreator);

  var task_getUpdater = function(result, cb){
    async.forEach(result.items, function(app, cb_){
      user.at(app.update_user, function(err, updater){
        app._doc.updater = updater;
        cb_(err);
      });
    }, function(err){
      cb(err, result);
    });
  };
  tasks.push(task_getUpdater);

  async.waterfall(tasks,function(err,result){
    return callback_(err, result);
  });
};