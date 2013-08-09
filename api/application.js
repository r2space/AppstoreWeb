var app = require("../controllers/ctrl_app.js")
    , util = lib.core.util
    , json = lib.core.json
    , apputil = require("../core/apputil.js")
    , starerrors = require("../core/starerrors.js");
exports.updateAppStep1 = function (req_, res_) {
    var creator = req_.session.user._id;
    var appId = req_.body._id;
    var name = req_.body.name;
    var version = req_.body.version;
    var memo = req_.body.memo;
    var description = req_.body.description;
    var device = req_.body['require.device'];
    var os = req_.body['require.os'];
    var appType = req_.body.appType;
    var category = req_.body.category;
    var bundle_identifier = req_.body.bundle_identifier;
    var bundle_version = req_.body.bundle_version;
    var title = req_.body.title;
    var editstep = 1;
    app.findAppInfoById(appId, function (err, docs) {
        // check编辑权限
        if(!apputil.isCanEdit(docs, req_.session.user._id))
            return json.sendError(res_, new starerrors.NoEditError);

        docs.name = name;
        docs.version = version;
        docs.bundle_identifier = bundle_identifier;
        docs.bundle_version = bundle_version;
        docs.title = title;
        docs.memo = memo;
        docs.description = description;
        docs.require = {device: device, os: os};
        docs.appType = appType;
        docs.category = category;
        docs.update_date = new Date();
        docs.update_user = creator;
        if (docs.editstep < editstep) {
            docs.editstep = editstep;
        }
        if (!docs.editstep) {
            docs.editstep = editstep;
        }
        docs.save(function (err_, result) {
            if (err_) {
                return res_.send(json.errorSchema(err_.code, err_.message));
            } else {
                return res_.send(json.dataSchema(result));
            }
        });
    });
};
exports.createAppStep1 = function (req_, res_) {
    var creator = req_.session.user._id;
    var data = util.checkObject(req_.body);
    data.require = {
        device: req_.body['require.device'],
        os: req_.body['require.os']
    };
    data.create_user = creator;
    data.editstep = 1;
    data.editing = 0;
    data.status = -1;
    data.category = req_.body.category;
    data.permission = {
        admin: [creator],
        edit: [creator],
        view: [creator],
        download: [creator]

    };
    data.update_date = new Date();
    data.update_user = creator;
    app.create(data, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            return res_.send(json.dataSchema(result));
        }
    });
};
exports.createAppStep2 = function (req_, res_) {
    var creator = req_.session.user._id;
    var appId = req_.body._id;
    var icon_big = req_.body['icon.big'];
    var icon_small = req_.body['icon.small'];
    var screenshot = req_.body.screenshot;
    var pptfile = req_.body.pptfile;
    var video = req_.body.video;
    var downloadId = req_.body.downloadId;
    var plistDownloadId = req_.body.plistDownloadId;
    var editstep = 2;
    console.log(icon_big.length);
    console.log(icon_small.length);
    console.log(screenshot.length);
    if (icon_small.length == 0) {
        return res_.send(json.dataSchema({status: 300, error: "没有上传小图标"}));
    }
    if (icon_big.length == 0) {
        return res_.send(json.dataSchema({status: 300, error: "没有上传大图标"}));
    }
    if (screenshot.length == 0) {
        return res_.send(json.dataSchema({status: 300, error: "没有上传素材图片"}));
    }

    app.findAppInfoById(appId, function (err, docs) {
        // check编辑权限
        if(!apputil.isCanEdit(docs, req_.session.user._id))
            return json.sendError(res_, new starerrors.NoEditError);

        docs.update_date = new Date();
        docs.update_user = creator;
        docs.icon.big = icon_big;
        docs.icon.small = icon_small;
        docs.screenshot = screenshot;
        docs.pptfile = pptfile;
        docs.video = video;
        docs.downloadId = downloadId;
        docs.plistDownloadId = plistDownloadId;
        console.log(docs.editstep);
        if (docs.editstep < editstep) {
            console.log("set step   %s", editstep);
            docs.editstep = editstep;
        }
        if (!docs.editstep) {
            docs.editstep = editstep;
        }

        docs.save(function (err_, result) {
            if (err_) {
                return res_.send(json.errorSchema(err_.code, err_.message));
            } else {
                return res_.send(json.dataSchema(result));
            }
        });
    });
};
exports.createAppStep3 = function (req_, res_) {
    var creator = req_.session.user._id;
    var appId = req_.body._id;

    var permission_edit = req_.body['permission.edit'];
    var permission_view = req_.body['permission.view'];
    var permission_download = req_.body['permission.download'];
    var permission_admin = req_.body['permission.admin'];
    console.log(permission_view);
    console.log(permission_edit);
    console.log(permission_download);
    console.log(permission_admin);
    var editstep = 3;
    app.findAppInfoById(appId, function (err, docs) {
        // check编辑权限
        if(!apputil.isCanEdit(docs, req_.session.user._id))
            return json.sendError(res_, new starerrors.NoEditError);

        docs.permission.admin = permission_admin;
        docs.permission.download = permission_download;
        docs.permission.view = permission_view;
        docs.permission.edit = permission_edit;
        docs.update_date = new Date();
        docs.update_user = creator;
        if (docs.editstep < editstep) {
            docs.editstep = editstep;
        }
        if (!docs.editstep) {
            docs.editstep = editstep;
        }
        console.log(docs);
        docs.save(function (err_, result) {

            if (err_) {
                console.log(err_);
                return res_.send(json.errorSchema(err_.code, err_.message));
            } else {
                return res_.send(json.dataSchema(result));
            }
        });
    });
};
exports.createAppStep4 = function (req_, res_) {
    var creator = req_.session.user._id;
    var appId = req_.body._id;
    var support = req_.body.support;
    var notice = req_.body.notice;
    var release_note = req_.body.release_note;
    var editstep = 4;
    app.findAppInfoById(appId, function (err, docs) {
        // check编辑权限
        if(!apputil.isCanEdit(docs, req_.session.user._id))
            return json.sendError(res_, new starerrors.NoEditError);

        docs.support = support;
        docs.notice = notice;
        docs.release_note = release_note;
        docs.update_date = new Date();
        docs.update_user = creator;
        if (docs.editstep < editstep) {
            docs.editstep = editstep;
        }
        if (!docs.editstep) {
            docs.editstep = editstep;
        }
        docs.save(function (err_, result) {
            if (err_) {
                return res_.send(json.errorSchema(err_.code, err_.message));
            } else {
                return res_.send(json.dataSchema(result));
            }
        });
    });
};
exports.createAppStep5 = function (req_, res_) {
    var creator = req_.session.user._id;
    var appId = req_.body._id;
    var editstep = 5;
    app.findAppInfoById(appId, function (err, docs) {
        // check编辑权限
        if(!apputil.isCanEdit(docs, req_.session.user._id))
            return json.sendError(res_, new starerrors.NoEditError);

        docs.editing = 1;
        docs.status = 1;
        docs.editstep = editstep;
        docs.update_date = new Date();
        docs.update_user = creator;
        docs.save(function (err_, result) {
            if (err_) {
                return res_.send(json.errorSchema(err_.code, err_.message));
            } else {
                return res_.send(json.dataSchema(result));
            }
        });
    });
};


exports.createApp = function (req_, res_) {
    var creator = req_.session.user._id;
    var data = util.checkObject(req_.body);
    data.create_user = creator;
    data.update_user = creator;
    app.create(data, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            return res_.send(json.dataSchema(result));
        }
    });
};

exports.getAppInfo = function (req_, res_) {
    var app_id = req_.query.app_id;
    app.getAppInfoById(app_id, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            if(apputil.isCanView(result, req_.session.user._id))
                return res_.send(json.dataSchema(result));
            else
                return json.send(res_, new starerrors.NoViewError); // 没有阅览权限
        }
    });
};

exports.downloadedList = function (req_, res_) {
    var uid = req_.session.user._id;

    app.downloadedList(uid, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            return res_.send(json.dataSchema(result));
        }
    });
};

exports.search = function (req_, res_) {
    var start = Number(util.checkString(req_.query.start));
    var count = Number(util.checkString(req_.query.count));
    var uid = req_.session.user._id;
    var keywords = req_.query.keywords;
    var category = req_.query.category;

    app.search(uid, keywords, start, count, category, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            return res_.send(json.dataSchema(result));
        }
    });
};

exports.list = function (req_, res_) {
    var start = Number(util.checkString(req_.query.start));
    var count = Number(util.checkString(req_.query.count));
    var sort = util.checkString(req_.query.sort);
    var asc = Number(util.checkString(req_.query.asc));
    var uid = req_.session.user._id;
    var admin = req_.query.admin ? true : false;
    var category = req_.query.category;

    app.list(uid, sort, asc, admin, category, start, count, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            return res_.send(json.dataSchema(result));
        }
    });
};


exports.getPlist = function (req_, res_) {
    console.log(req_.host);
    var app_id = req_.params.app_id;
    app.getAppInfoById(app_id, function (err, result) {
        if (err) {
            return res_.send(json.errorSchema(err.code, err.message));
        } else {
            var url = "http://"+req_.host+":3000/file/download.json?_id="+result.downloadId+"&amp;app_id="+app_id+"&amp;flag=phone";
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
+"<string>"
+url
+"</string>"
+"</dict>\
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
<string>"+bundle_identifier+"</string>     \
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
        }
    });

}
