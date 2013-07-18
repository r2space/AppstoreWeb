var mongo = require('mongoose')
  , schema = mongo.Schema;

// TODO 考虑rank的平均分、comment改成app的内嵌？
var Comment = new schema({
    appId: {type: String}
  , comment: {type: String}
  , rank: {type: Number}
  , version: {type: String}
  , create_date: {type: String}           //创建日期
  , create_user: {type: String}           //创建者
  , update_date: {type: String}           //更新日期
});