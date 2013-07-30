var download = require("../controllers/ctrl_download")
    , util = lib.core.util
    , json = lib.core.json;

exports.create = function(req_, res_){
    var creator = req_.session.user._id;
    var data = {};
    data.app_id = req_.query.app_id;
    data.create_user = creator;
    data.device = 'ios';
    data.ip = getClientIp(req_);
    download.create(data, function(err, result){
        return ;
    });
};

function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for');
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}