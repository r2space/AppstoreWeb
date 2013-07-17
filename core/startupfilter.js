
/**
 * Module dependencies.
 */

var express     = require("express")
  , user        = lib.mod.user
  , auth        = lib.core.auth
  , middleware  = require("../core/middleware");

var userid = "admin";
var password ="admin";

/**
 * 执行Filter
 */
exports.execute = function(err, callback) {
	create_admin_filter();
}

/**
 * 生成管理员帐号的Filter
 */
function create_admin_filter() {
	user.find({uid: userid}, function(err, result){
		if(result && result != "")
			return;

		// 初始没有admin用户，生成默认的admin用户
		create_admin();
	});
}

/**
 * 生成管理员帐号
 */
function create_admin() {
	var email = "";
	var date = Date.now();

	var info = {"uid": userid
	, "name": {"name_zh": userid}
	, "password": auth.sha256(password)
	, "email": {
	  "email1": email
	}
	, createat: date
	, createby: userid
	, updateat: date
	, updateby: userid
	};

	user.create(info, function(err, result){
	  if (err) {
	    return new callback_(error.InternalServer(__("user.error.savedError")));
	  }

	  console.log("Create default admin user. id=admin, password=admin");
	});
}


