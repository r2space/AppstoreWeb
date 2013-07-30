var app = require("../modules/mod_app.js");
var error = lib.core.error;

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

exports.getAppInfoById = function(app_id_,callback_){
    app.find(app_id_,callback_);
};