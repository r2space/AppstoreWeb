
var user = lib.api.user
  , util = lib.core.util;

/*
 * GET home page.
 */

exports.guiding = function(app){

  app.get('/', function(req, res){
    res.render("login", {"title": "login"});
  });

  // 显示Login画面
  app.get('/login', function(req, res){
    res.render("login", {"title": "login"});
  });

  // ----------------------------------
  // 登陆（/login与登陆画面的URL重叠，所以API使用/simplelogin）
  app.get('/simplelogin', function(req, res){
    user.login(req, res, function(err, result){
      if (err) return false; // 错误处理还使用api中的

      if (util.isBrowser(req)) {
        var url;
        if(req.session.user.type == 1) // 管理员画面
          url = "/starwall";
        else
          url = "/starwall";

        console.log("######### " + req.session.user);
        res.redirect(url);
        return true;
      }
      return false;
    });
  });

  // 注销
  app.get("/simplelogout", function(req, res){
    user.logout(req, res);
  });

  // 注册
  app.post("/register", function(req, res){
    user.register(req, res);
  });

  // 确认注册
  app.post("/register/confirm", function(req, res){
    user.registerConfirm(req, res);
  });

  // ----------------------------------
  // 主页面
  app.get('/starwall', function(req, res){
    res.render("starwall", {
        title: "starwall"
      , bright: "home"
      , user: req.session.user
    });
  });

  // APP画面
  app.get('/star', function(req, res){
    res.render("star", {
        title: "star"
      , bright: "home"
      , user: req.session.user
    });
  });


  app.get('/app/addview',function(req,res){
    res.render("app_add", {
        title: "star"
      , bright: "home"
      , user: req.session.user
    });
  });



};

