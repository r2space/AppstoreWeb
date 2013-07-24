var application = require('../api/application');

exports.guiding = function(app){
  app.post('/app/create.json', function(req, res){
    application.createApp(req, res);
  });

  app.get('/app/info.json',function(req,res){
    application.getAppInfo(req,res);
  })

  
};