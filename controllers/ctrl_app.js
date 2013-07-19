var app = require("../modules/mod_app.js");

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