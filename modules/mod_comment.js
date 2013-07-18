var mongo = require('mongoose')
  , conn    = require('./connection')
  , schema = mongo.Schema;

var Comment = new schema({
    appId: {type: String}
  , comment: {type: String}
  , rank: {type: Number}
  , version: {type: String}
  , create_date: {type: String}           //创建日期
  , create_user: {type: String}           //创建者
  , create_custom: {type: String}
  , update_date: {type: String}           //更新日期
});

function model() {
  return conn().model('Comment', Comment);
}

exports.create = function(comment_, callback_){
  var comment = model();
  new comment(comment_).save(function(err, result){
    callback_(err, result);
  });
};

exports.getRankAvg = function(appId_, callback_){
  var comment = model();
  comment.aggregate([
    { $match: {appId: appId_}},
    { $group: {
      _id: '$appId',
      rankAvg: { $avg: '$rank'}
    }}
  ], function(err, result){
    var rank = {};
    if (result.length > 0)
      rank = result[0];
    callback_(err, rank);
  });
};