var app = require("../controllers/ctrl_app.js")
  , util = lib.core.util
  , json = lib.core.json;

exports.createApp = function(req_, res_){
  var creator = req_.session.user._id;
  var data =  util.checkObject(req_.body);
  data.create_user = creator;
  app.create(data, function(err, result){
    if (err) {
      return res_.send(json.errorSchema(err.code, err.message));
    } else {
      return res_.send(json.dataSchema(result));
    }
  });
};