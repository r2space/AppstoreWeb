
/*
 * GET home page.
 */

exports.guiding = function(app){

  app.get('/', function(req, res){
    if (req.session.user) {

    } else {
      res.render("login", {"title": "login"});
    }
  });

  // 显示Login画面
  app.get('/login', function(req, res){
    res.render("login", {"title": "login"});
  });
};

