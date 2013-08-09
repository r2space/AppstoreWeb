var user = lib.api.user
    , application = require('../api/application')
    , file = require('../api/file')
    , util = lib.core.util
    , admin = require('./admin')
    , fileapi = require('./api_file')
    , commentapi = require('./api_comment')
    , appapi = require('./api_app')
    , userapi = require('./api_user')
    , categorory = require('../modules/mod_category');

var ctrlapp = require('../controllers/ctrl_app');

/*
 * GET home page.
 */

exports.guiding = function (app) {
    admin.guiding(app);
    appapi.guiding(app);
    commentapi.guiding(app);
    fileapi.guiding(app);
    userapi.guiding(app);

    app.get('/', function (req, res) {
        res.render("login", {"title": "login"});
    });

    // 显示Login画面
    app.get('/login', function (req, res) {
        res.render("login", {"title": "login"});
    });

    // ----------------------------------
    // 登陆（/login与登陆画面的URL重叠，所以API使用/simplelogin）
    app.get('/simplelogin', function (req, res) {
        var logined = function (result) {
            if (req.session.user.type == 1) // 重新设定管理员画面
                req.query.home = "/admin";
        };
        user.login(req, res, logined);
    });

    // 注销
    app.get("/simplelogout", function (req, res) {
        user.logout(req, res);
    });

    // 注册
    app.post("/register", function (req, res) {
        user.register(req, res);
    });

    // 确认注册
    app.post("/register/confirm", function (req, res) {
        user.registerConfirm(req, res);
    });

    // 主页面
    app.get('/index', function (req, res) {
        res.render("index", {
            title: "index", bright: "home", user: req.session.user
        });
    });
    // 主页面
    app.get('/detail', function (req, res) {
        res.render("detail", {
            title: "index", bright: "home", user: req.session.user
        });
    });
    // ----------------------------------
    // 主页面
    app.get('/starwall', function (req, res) {

        res.render("starwall", {
            title: "starwall", bright: "home", user: req.session.user
            ,categories: categorory.getCategories()
        });
    });

    // APP画面
    app.get('/star', function (req, res) {
        res.render("star", {
            title: "star", bright: "home", user: req.session.user
        });
    });

    app.get('/app/add/step1', function (req, res) {
        ctrlapp.renderAppStep(req, res, 1);
    });
    app.get('/app/add/step2', function (req, res) {
        ctrlapp.renderAppStep(req, res, 2);
    });

    app.get('/app/add/step3', function (req, res) {
        ctrlapp.renderAppStep(req, res, 3);
    });
    app.get('/app/add/step4', function (req, res) {
        ctrlapp.renderAppStep(req, res, 4);
    });

    app.get('/app/add/step5', function (req, res) {
        ctrlapp.renderAppStep(req, res, 5);
    });

    app.get('/app/addview', function (req, res) {
        res.render("app_add", {
            title: "star", bright: "home", user: req.session.user
        });
    });

    // App详细画面
    app.get('/app/:app_id', function (req, res) {
        var app_id = req.params.app_id;
        ctrlapp.renderDetail(req, res, app_id);
    });

    // 检索结果一览
    app.get('/list/search', function (req, res) {
        res.render("list_search", { title: "检索结果一览", bright: "home", user: req.session.user
            ,keywords: req.query.keywords
            ,categories: categorory.getCategories()
            ,apptypes: categorory.getAppTypes()
        });
    });
    // 已下载一览
    app.get('/list/download', function (req, res) {
        res.render("list_download", { title: "已下载一览", bright: "home", user: req.session.user
            ,categories: categorory.getCategories()
            ,apptypes: categorory.getAppTypes()
        });
    });
    // 通知一览
    app.get('/list/notification', function (req, res) {
        res.render("list_notification", { title: "通知一览", bright: "home", user: req.session.user
            ,categories: categorory.getCategories()
            ,apptypes: categorory.getAppTypes()
        });
    });
    // 管理一览
    app.get('/list/manage', function (req, res) {
        res.render("list_manage", { title: "管理一览", bright: "home", user: req.session.user
            ,categories: categorory.getCategories()
            ,apptypes: categorory.getAppTypes()
        });
    });
    app.get('/ios/plist/:app_id/cross.plist', application.getPlist);

    app.get('/download/:app_id/app.html', function(req, res){
        var app_id = req.params.app_id;
        var host = req.host;
        console.log(host)
        res.render("download_ios",{title:'fdfd',app_id:app_id,host:host});
    });
    app.get('/download/:app_id/app.plist',file.getplist);
    app.get('/download/:app_id/app.ipa',file.getIpaFile);

    app.get('*', function (req, res) {
        res.send("404");
    });
};

