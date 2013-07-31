var app = require("../modules/mod_app.js");
var EventProxy = require('eventproxy');
var error = lib.core.error;
var user = lib.mod.user;
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
            console.log(app_info);
            return callback_(null, app_info);
        });

        proxy1.after('admin_ready', docs.permission.admin.length, function () {
            app_info.admin_list = admin_list;
            proxy.emit('permission_ready');
        });

        proxy2.after('edit_ready', docs.permission.edit.length, function () {
            console.log(edit_list)  ;
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
            console.log(id);
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

exports.list = function(sort_, asc_, start_, count_, callback_){
  var condition = {};
    var options = {
        start: start_
      , limit: count_
    };
    if (sort_){
      options.sort = {};
      options.sort[sort_] = asc_ == 1 ? 1 : -1;
    }
  app.list(condition, options, function(err, result){
    callback_(err,result);
  });
};