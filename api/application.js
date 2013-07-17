var app = require("../controllers/ctrl_app.js")
  , util = require("../core/util");

exports.createApp = function(req_, res_){
  var creator = req_.session.user._id;
  var data =  util.checkObject(req_.body);
  app.create(data, function(err, result){
    return res_.send(result);
  });
};