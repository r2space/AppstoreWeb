var app = require("../controllers/ctrl_app.js")
    , download = require("../controllers/ctrl_download")
    , common = lib.api.common
    , dbfile = lib.ctrl.dbfile
    , util = lib.core.util
    , json = lib.core.json
    , apputil = require("../core/apputil.js")
    , error = lib.core.error
    , starerrors = require("../core/starerrors.js");

exports.getIpaFile = function (req_, res_, next) {
    var app_id = req_.params.app_id;
    var user_id = req_.params.user_id;


    //获得APP信息
    app.findAppInfoById(app_id, function (err, docs) {
        //错误处理
//        if(err)
//            return starerrors.render(req_, res_, err);
//        //权限Check
//        if(!apputil.isCanDownload(docs, user_id))
//            return starerrors.render(req_, res_, new starerrors.NoDownloadError);

        var creator = user_id;
        app.findAppInfoById(app_id, function (err, docs) {
            dbfile.ipaFile(docs.downloadId, res_, function () {
//            //错误处理
//            if(err)
//                return starerrors.render(req_, res_, err);
//            //权限Check
//            if(!apputil.isCanDownload(docs, req_.session.user._id))
//                return starerrors.render(req_, res_, new starerrors.NoDownloadError);
                var data = {};
                data.app_id = docs._id;
                data.create_user = creator;
                data.device = docs.require.device;
                data.ip = getClientIp(req_);
                download.create(data, function (err, result) {
                    return;
                });
                next();
            });
        });
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
exports.getplist = function (req_, res_, next) {
    var app_id = req_.params.app_id;
    var user_id = req_.params.user_id;
    app.findAppInfoById(app_id, function (err, result) {
        console.log(result);
        var protocol = req_.protocol;
        var host = req_.host;
        var port = req_.app.get("port");
        port = ( port == 80 || port == 443 ? '' : ':' + port );// fixed

        var url = "http://"  + host + port +"/download/" + result._id + "/" + user_id + "/app.ipa";
        var bundle_identifier = result.bundle_identifier;
        var bundle_version = result.bundle_version;
        var kind = result.kind;
        var title = result.title;
        console.log("bundle_identifier is %s  bundle_version  is %s  title  is %s",bundle_identifier, bundle_version, title  );
        res_.setHeader('Content-Type', "text/xml");
        res_.send("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\
<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\
<plist version=\"1.0\">\
<dict>\
<key>items</key>\
<array>\
<dict>\
<key>assets</key>\
<array>\
<dict>\
<key>kind</key>\
<string>software-package</string>\
<key>url</key>"
            + "<string>"
            + url
            + "</string>"
            + "</dict>\
</array><key>metadata</key>\
<dict>\
<key>bundle-identifier</key>               \
<string>" + bundle_identifier + "</string>     \
<key>bundle-version</key>                  \
<string>" + bundle_version + "</string>                       \
<key>kind</key>                            \
<string>software</string>                  \
<key>title</key>                           \
<string>" + title + "</string>                     \
</dict>\
</dict>\
</array>\
</dict>\
</plist>");
        return;
    });
}