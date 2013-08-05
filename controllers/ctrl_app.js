var EventProxy = require('eventproxy');
var app = require("../modules/mod_app.js")
  , user = lib.mod.user
  , downloadInfo = require("../modules/mod_download")
  , async = require("async");
var error = lib.core.error;
var user = lib.mod.user;
exports.create = function (data_, callback_){
  var date = Date.now();
  var app_ = data_;
  app_.create_date = date;
  app_.update_date = date;

  app.create(app_, function(err, result){
    err = err ? new error.InternalServer(err) : null;
    return callback_(err, result);
  });
};
exports.findAppInfoById = function (app_id_, callback_) {
    app.find(app_id_, function (err, docs) {
        callback_(err, docs);
    });
};

exports.getAppInfoById = function (app_id_, callback_) {
    app.find(app_id_, function (err, docs) {
        var proxy = new EventProxy();
        var proxy1 = new EventProxy();
        var proxy2 = new EventProxy();
        var proxy3 = new EventProxy();
        var proxy4 = new EventProxy();
        var admin_list = [];
        var edit_list = [];
        var view_list = [];
        var download_list = [];
        var app_info = docs;
        proxy.after('permission_ready', 4, function () {
            return callback_(null, app_info);
        });
        proxy1.after('admin_ready', docs.permission.admin.length, function () {
            app_info.admin_list = admin_list;
            proxy.emit('permission_ready');
        });

        proxy2.after('edit_ready', docs.permission.edit.length, function () {
            app_info.edit_list = edit_list;
            proxy.emit('permission_ready');
        });

        proxy3.after('view_ready', docs.permission.view.length, function () {
            app_info.view_list = view_list;
            proxy.emit('permission_ready');
        });

        proxy4.after('download_ready', docs.permission.download.length, function () {
            app_info.download_list = download_list;
            proxy.emit('permission_ready');
        });
        proxy.fail(callback_);
        proxy1.fail(callback_);
        proxy2.fail(callback_);
        proxy3.fail(callback_);
        proxy4.fail(callback_);

        docs.permission.admin.forEach(function (id, i) {
            user.find({_id: id}, function (err, user_docs) {
                admin_list.push({id: id, name: user_docs[0].name});
                proxy1.emit('admin_ready');
            });
        });
        docs.permission.edit.forEach(function (id, i) {
            user.find({_id: id}, function (err, user_docs) {
                edit_list.push({id: id, name: user_docs[0].name});
                proxy2.emit('edit_ready');
            });
        });
        docs.permission.view.forEach(function (id, i) {
            user.find({_id: id}, function (err, user_docs) {
                view_list.push({id: id, name: user_docs[0].name});
                proxy3.emit('view_ready');
            });
        });
        docs.permission.download.forEach(function (id, i) {
            user.find({_id: id}, function (err, user_docs) {
                download_list.push({id: id, name: user_docs[0].name});
                proxy4.emit('download_ready');
            });
        });
    });


};

exports.downloadedList = function(uid_, callback_){
  var tasks = [];
  var task_getAppIds = function(cb){
    downloadInfo.appIdsByUser(uid_,function(err, ids){
      cb(err,ids);
    });
  };
  tasks.push(task_getAppIds);

  var task_getApps = function(ids, cb){
    app.getAppsByIds(ids, function(err, result){
      cb(err, result);
    });
  };
  tasks.push(task_getApps);

  async.waterfall(tasks,function(err,result){
    return callback_(err, result);
  });
};

exports.search = function(uid_, keyword_, start_, count_, callback_){
  var condition = {"name": new RegExp("^.*" + keyword_.toLowerCase() + ".*$", "i")};
  var options = {
      start: start_
    , limit: count_
    , sort: {update_date:-1}
  };

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