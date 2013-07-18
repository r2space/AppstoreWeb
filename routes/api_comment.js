var comment = require('../api/comment');

exports.guiding = function(app){
  app.post('/app/comment/create.json', function(req, res){
    comment.create(req, res);
  });
};