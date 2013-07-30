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
  app.list(condition, options, function(err, result){
    callback_(err,result);
  });
};