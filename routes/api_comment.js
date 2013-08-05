var comment = require('../api/comment');

exports.guiding = function(app){
  app.post('/app/comment/create.json', function(req, res){
    comment.create(req, res);
  });

  app.get('/app/comment/list.json', function(req, res){
    comment.list(req, res);
  });

  app.get('/app/comment/ranktotal.json', function(req, res){
    comment.ranktotal(req, res);
  });
};
