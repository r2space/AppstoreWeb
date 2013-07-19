
var log = lib.core.log
  , user = lib.api.user;

/**
 * GuidingUserApi:
 *  Routing requests to the API functions.
 * @param {app} app
 */
exports.guiding = function(app){
  //得到所有用户列表
  app.get("/user/list.json", function(req, res){
    
    user.getUserList(req, res);
  });

};


