
/*
 * GET home page.
 */

exports.guiding = function(app){

  app.get("/index", function(req, res){
    res.render('login', { title: 'Express' });
  });

};
