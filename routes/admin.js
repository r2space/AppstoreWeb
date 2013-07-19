var admin = require('../controllers/ctrl_admin');
/**
 * GuidingAdmin:
 *  Routing requests to the API functions.
 * @param {app} app
 */
exports.guiding = function(app){
  // 下载模板
  app.get('/admin/download/template', function(req, res){
  	admin.download_template(req, res);
  });

  // 导入用户
  app.post('/admin/csvimport/user', function(req, res){
  	admin.csvimport_user(req, res);
  });
};