var auth    = lib.core.auth
  , util    = lib.core.util
  , user    = lib.mod.user;
/**
 *
 */
var title = [
  { "field": "",
    "name" : ""}
];

exports.getTemplate = function(callback){
	var data = [];
	// title
	data.push(["id", "subject1", "subject2", "subject3"]);
	// data.push([]);

	callback(null, data);
};

exports.csvImportRow = function(exe_user, row, callback) {
 	var now = new Date();
	var u = {
		type:   0      // 用户类型， 默认0.   0: 普通用户, 1: 系统管理员
	   ,active: 1
	};
	if(row[0])  u.uid                                                = row[0];
	if(row[1])  u.password                                           = auth.sha256(row[1]);
	if(row[2])  { u.email = u.email || {}; u.email.email1            = row[2]; }
	if(row[3])  { u.email = u.email || {}; u.email.email2            = row[3]; }
	if(row[4])  { u.name = u.name || {}; u.name.name_zh              = row[4]; }
	if(row[5])  { u.name = u.name || {}; u.name.letter_zh            = row[5]; }
	if(row[6])  u.title                                              = row[6];
	if(row[7])  u.birthday                                           = row[7];
	if(row[8])  { u.address = u.address || {}; u.address.country     = row[8]; }
	if(row[9])  { u.address = u.address || {}; u.address.state       = row[9]; }
	if(row[10]) { u.address = u.address || {}; u.address.province    = row[10]; }
	if(row[11]) { u.address = u.address || {}; u.address.city        = row[11]; }
	if(row[12]) { u.address = u.address || {}; u.address.county      = row[12]; }
	if(row[13]) { u.address = u.address || {}; u.address.district    = row[13]; }
	if(row[14]) { u.address = u.address || {}; u.address.township    = row[14]; }
	if(row[15]) { u.address = u.address || {}; u.address.village     = row[15]; }
	if(row[16]) { u.address = u.address || {}; u.address.street      = row[16]; }
	if(row[17]) { u.address = u.address || {}; u.address.road        = row[17]; }
	if(row[18]) { u.address = u.address || {}; u.address.zip         = row[18]; }
	if(row[19]) { u.tel = u.tel || {}; u.tel.telephone               = row[19]; }
	if(row[20]) { u.tel = u.tel || {}; u.tel.mobile                  = row[20]; }
	if(row[21]) u.lang                                               = row[21];
	if(row[22]) u.timezone                                           = row[22];
	if(row[23]) u.status                                             = row[23];
	if(row[24]) { u.custom = u.custom || {}; u.custom.url            = row[24]; }
	if(row[25]) { u.custom = u.custom || {}; u.custom.memo           = row[25]; }

	u = util.checkObject(u);
    
	// if(!u.uid) {
	// 	callback();
	// 	return;
	// }

	if(!u.password) {// 如果没输入用默认的uid做密码，如果是邮件取"@"前做密码
		/^(.*)@.*$/.test(u.uid);
		u.password = auth.sha256(RegExp.$1);
	}

	user.find({"uid": u.uid}, function(err, result){
		if(result && result.length > 0){               // Update user
			u.editby = exe_user.uid;
			u.editat = now;

			user.update(result[0]._id, u, function(err, result) {
				if(err)
					console.log(err);
				console.log('Update User:' + result);
		 	});
		} else {                                        // Create user
			u.createby = exe_user.uid;
			u.createat = now;
			u.editby = exe_user.uid;
			u.editat = now;

			user.create(u, function(err, result) {
				console.log('Create User:' + result);
		 	});
		}
	});
}