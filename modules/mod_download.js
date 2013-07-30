var mongo = require('mongoose')
    , conn = require('./connection')
    , schema = mongo.Schema;

var Download = new schema({
    app_id : {type:String}
    , create_at: { type: Date, default: Date.now }
    , ip    : {type:String}
    , user_id :{type:String}
    , type  : {type:String}
    , device : {type:String}
});

function model() {
    return conn().model('Download', Download);
}

exports.create = function (down_, callback_) {
    var app = model();
    new app(down_).save(function (err, result) {
        callback_(err, result);
    });
};

exports.count = function(app_id, callback_){
    app.count({app_id: app_id}).exec(function(err, count){
        callback_(err,count);
    });
};
