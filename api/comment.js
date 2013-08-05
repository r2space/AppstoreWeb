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

exports.list = function(req_, res_){
  var start = Number(util.checkString(req_.query.start));
  var count = Number(util.checkString(req_.query.count));
  comment.list(req_.query.appId, req_.query.version, start, count, function(err, result){
    if (err) {
      return res_.send(json.errorSchema(err.code, err.message));
    } else {
      return res_.send(json.dataSchema(result));
    }
  });
};

// 获取指定评价的总和及评价人数（用于计算平均评价值）
exports.ranktotal = function(req_, res_){
  comment.ranktotal(req_.query.appId, function(err, result){
    if (err) {
      return res_.send(json.errorSchema(err.code, err.message));
    } else {
      return res_.send(json.dataSchema(result));
    }
  });
};