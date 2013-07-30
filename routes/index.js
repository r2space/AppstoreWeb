var user = lib.api.user
    , util = lib.core.util
    , admin = require('./admin')
    , fileapi = require('./api_file')
    , commentapi = require('./api_comment')
    , appapi = require('./api_app')
    , userapi = require('./api_user');

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
        });
    });

    // APP画面
    app.get('/star', function (req, res) {
        res.render("star", {
            title: "star", bright: "home", user: req.session.user
        });
    });

    app.get('/app/add/step1', function (req, res) {
        var appId = req.query.appId || '0';
        res.render('app_add_step_1', {
            title: "star", bright: "home", user: req.session.user, appId: appId
        });
    });
    app.get('/app/add/step2', function (req, res) {
        var appId = req.query.appId || '0';
        res.render('app_add_step_2', {
            title: "star", bright: "home", user: req.session.user, appId: appId
        });
    });

    app.get('/app/add/step3', function (req, res) {
        var appId = req.query.appId || 0;
        res.render('app_add_step_3', {
            title: "star", bright: "home", user: req.session.user, appId: appId
        });
    });
    app.get('/app/add/step4', function (req, res) {
        var appId = req.query.appId || 0;
        res.render('app_add_step_4', {
            title: "star", bright: "home", user: req.session.user, appId: appId
        });
    });

    app.get('/app/add/step5', function (req, res) {
        var appId = req.query.appId || 0;
        res.render('app_add_step_5', {
            title: "star", bright: "home", user: req.session.user, appId: appId
        });
    });

    app.get('/app/addview', function (req, res) {
        res.render("app_add", {
            title: "star", bright: "home", user: req.session.user
        });
    });


    app.get('/app/:app_id', function (req, res) {
        var app_id = req.params.app_id;


        res.render("app_detail", {
            app_id: app_id,
            title: "star", bright: "home", user: req.session.user
        });
    });

    // 已下载一览
    app.get('/list/download', function (req, res) {
        res.render("list_download", { title: "已下载一览", bright: "home", user: req.session.user });
    });
    app.get('*', function (req, res) {
        res.send("404");
    });
};

