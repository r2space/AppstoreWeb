var download = require("../modules/mod_download.js");

exports.create = function (data_, callback_){
    var down_ = data_;

    download.create(down_, function(err, result){
        err = err ? new error.InternalServer(err) : null;
        return callback_(err, result);
    });
};