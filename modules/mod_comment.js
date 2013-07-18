var mongo = require('mongoose')
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