var app = require("../controllers/ctrl_app.js")
    , util = lib.core.util
    , json = lib.core.json;
exports.updateAppStep1 = function (req_, res_) {
    var appId = req_.body._id;
    var name = req_.body.name;
    var version = req_.body.version;
    var memo = req_.body.memo;
    var description = req_.body.description;
    var device = req_.body.device;
    var appType = req_.body.appType;
    var category = req_.body.category;
    var editstep = 1;
    app.getAppInfoById(appId, function (err, docs) {
        docs.name = name;
        docs.version = version;
        docs.memo = memo;
        docs.description = description;
        docs.require = {device: device};
        docs.appType = appType;
        docs.category = category;
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
    data.require = {device: req_.body['require.device']};
    data.create_user = creator;
    data.editstep = 1;
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
    var editstep = 2;

    app.getAppInfoById(appId, function (err, docs) {
        docs.icon.big = icon_big;
        docs.icon.small = icon_small;
        docs.screenshot = screenshot;
        docs.pptfile = pptfile;
        docs.video = video;
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
    var editstep = 3;
    app.getAppInfoById(appId, function (err, docs) {
        docs.permission.admin = permission_admin;
        docs.permission.download = permission_download;
        docs.permission.view = permission_view;
        docs.permission.edit = permission_edit;

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
exports.createAppStep4 = function (req_, res_) {
    var appId = req_.body._id;
    var support = req_.body.support;
    var notice = req_.body.notice;
    var release_note = req_.body.release_note;
    var editstep = 4;
    app.getAppInfoById(appId, function (err, docs) {
        docs.support = support;
        docs.notice = notice;
        docs.release_note = release_note;

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
    var appId = req_.body._id;
    var downloadId = req_.body.downloadId;
    var editstep = 5;
    app.getAppInfoById(appId, function (err, dosc) {
        dosc.downloadId = downloadId;

        dosc.save(function (err_, result) {
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
            return res._send(json.errorSchema(err.code, err.message));
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

    app.list(sort, asc, start, count, function (err, result) {
        if (err) {
            return res._send(json.errorSchema(err.code, err.message));
        } else {
            return res_.send(json.dataSchema(result));
        }
    });
};