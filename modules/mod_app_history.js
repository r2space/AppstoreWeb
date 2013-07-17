var mongo = require('mongoose')
  , schema = mongo.Schema;

var AppHistory = new schema({
    appId: {type: String, required: true} //appId
  , name: {type: String, required: true}  //名称
  , description: {type: String}           //详细介绍
  , memo: {type: String}                  //简介
  , release_note: {type: String}           //
  , appType: {type: String}               //应用设备的类型：iphone、ipad、winphone
  , permission: {
      admin: [String]                     //管理者权限
    , edit: [String]                      //编集权限
    , view: [String]                      //阅览权限
    , download: [String]                  //下载权限    
  }
  , icon: {                               //图标
      big: {type:String}
    , small: {type:String}
  }
  , screenshot: [String]                  //截图（最多5张）
  , video: {type:String}                  //视频
  , category: [String]                    //分类
  , version: {type: String}               //版本
  , downloadId: {type: String}            //下载Id
  , open_date: {type: String}             //公开日期
  , expire_date: {type: String}           //过期
  , create_date: {type: String}           //创建日期
  , create_user: {type: String}           //创建者
  , update_date: {type: String}           //更新日期
  , update_user: {type: String}           //更新者
  , require: {
      os: {type: String}                  //系统要求
    , device: {type: String}              //设备要求
    , server: {type: String}              //服务器要求
  }
  , size: {type:int}                      //大小
});

function model() {
  return conn().model('AppHistory', AppHistory);
}

exports.addHistory = function(app_, callback_) {
  var app = model();
  new app(app_).save(function(err, result){
    callback_(err, result);
  });
};