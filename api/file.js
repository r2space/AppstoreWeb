var app = require("../controllers/ctrl_app.js")
    , common = lib.api.common
    , dbfile = lib.ctrl.dbfile
    , util = lib.core.util
    , json = lib.core.json;
exports.getIpaFile = function (req_, res_, next) {
    var app_id = req_.params.app_id;
    app.findAppInfoById(app_id,function(err,docs){
        dbfile.ipaFile(docs.downloadId, res_, next);
    });


};

exports.getplist = function (req_, res_, next) {
    var app_id = req_.params.app_id;
    app.findAppInfoById(app_id, function (err, result) {
        console.log(result);
        var url = "http://" + req_.host + ":3000/download/" + result._id + "/app.ipa";
        var bundle_identifier = result.bundle_identifier;
        var bundle_version = result.bundle_version;
        var kind = result.kind;
        var title = result.title;
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
<dict>\
<key>kind</key>\
<string>display-image</string>\
<key>needs-shine</key>\
<true/>\
<key>url</key>\
<string>http://3g.momo.im/down/ICON.PNG</string>\
</dict>\
<dict>\
<key>kind</key>\
<string>full-size-image</string>\
<key>url</key><string>http://3g.momo.im/down/ICON@2x.PNG</string>\
</dict>\
</array><key>metadata</key>\
<dict>\
<key>bundle-identifier</key>               \
<string>"+bundle_identifier+"123123</string>     \
<key>bundle-version</key>                  \
<string>"+bundle_version+"</string>                       \
<key>kind</key>                            \
<string>software</string>                  \
<key>title</key>                           \
<string>"+title+"</string>                     \
</dict>\
</dict>\
</array>\
</dict>\
</plist>");
        return;
    });
}