var comment = require("../controllers/ctrl_comment")
  , util = lib.core.util
  , json = lib.core.json;

exports.create = function(req_, res_){
  var creator = req_.session.user._id;
  var data =  util.checkObject(req_.body);
  data.create_user = creator;
  comment.create(data, function(err, result){
    if (err) {
      return res_.send(json.errorSchema(err.code, err.message));
    } else {
      return res_.send(json.dataSchema(result));
    }
  });
};