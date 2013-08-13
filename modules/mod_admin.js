var auth    = lib.core.auth
  , util    = lib.core.util
  , user    = lib.mod.user
  , check     = require("validator").check
  , sanitize  = require("validator").sanitize;
/**
 *
 */
var title = [
  { "field": "",
    "name" : ""}
];

exports.getTemplate = function(callback){
	var data = [
        [ // titles
            "uid(*)", "密码(默认uid邮件地址中@之前的名)", "邮件1", "邮件2", "中文名称", "中文拼音", "职位", "生日"
            ,"国家", "州", "省", "城市", "县", "行政区", "镇", "村", "街道", "公路", "邮编"
            ,"电话", "手机", "语言", "时区", "状态", "主页地址", "备注"
        ]
        ,[ // line1
            'temp@gmail.com', '', 'temp@gmail.com','', 'temp', 'temp', '', '2000/10/12'
             ,'China', '', 'Liao ning','dalian', 'sha he kou', '', '', '', '','', '116600'
            ,'0411-8888888', '+8113999999999', 'zh','GMT+08:00', '', 'http://www.baidu.com', ''
        ]
    ];
	callback(null, data);
};

exports.csvImportRow = function(exe_user, row, callback) {
 	var now = new Date();
	var u = {
		type:   0      // 用户类型， 默认0.   0: 普通用户, 1: 系统管理员
	   ,active: 1
	};
	if(row[0])  { u.uid                                              = row[0]; }
	if(row[1])  { u.password                                         = auth.sha256(row[1]); }
	if(row[2])  { u.email = u.email || {}; u.email.email1            = row[2]; }
	if(row[3])  { u.email = u.email || {}; u.email.email2            = row[3]; }
	if(row[4])  { u.name = u.name || {}; u.name.name_zh              = row[4]; }
	if(row[5])  { u.name = u.name || {}; u.name.letter_zh            = row[5]; }
	if(row[6])  { u.title                                            = row[6]; }
	if(row[7])  { u.birthday                                         = row[7]; }
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
	if(row[21]) { u.lang                                             = row[21]; }
	if(row[22]) { u.timezone                                         = row[22]; }
	if(row[23]) { u.status                                           = row[23]; }
	if(row[24]) { u.custom = u.custom || {}; u.custom.url            = row[24]; }
	if(row[25]) { u.custom = u.custom || {}; u.custom.memo           = row[25]; }

	u = util.checkObject(u);

    // Check uid
	if(!u.uid) {
		callback(new Error("uid不能为空"));
		return;
	}else if(u.uid == "admin") {
        callback(new Error("uid不能使用管理帐号"));
        return;
    }

    // Check password
	if(!u.password) {// 如果没输入用默认的uid做密码，如果是邮件取"@"前做密码
		/^(.*)@.*$/.test(u.uid);
        if(!RegExp.$1) {
            callback(new Error("密码不能为空"));
            return;
        }
		u.password = auth.sha256(RegExp.$1);
	}

    // Check email
    if(u.email) {
        if(u.email.email1 && !util.isEmail(u.email.email1)) {
            callback(new Error("邮件格式不正确"));
            return;
        }
        if(u.email.email2 && !util.isEmail(u.email.email2)) {
            callback(new Error("邮件格式不正确"));
            return;
        }
    }

    // Check tel
    if(u.tel) {
        if(u.tel.telephone && !util.isTel(u.tel.telephone)) {
            callback(new Error("电话号码格式不正确"));
            return;
        }
        if(u.tel.mobile && !util.isTel(u.tel.mobile)) {
            callback(new Error("手机号码格式不正确"));
            return;
        }
    }

    // Check language
    if(u.lang){
        if(u.lang != "zh" && u.lang != "en" && u.lang != "ja") {
            callback(new Error('语言入力不正确，目前语言只支持"zh","en","ja"'));
            return;
        }
    }else {
        u.lang = "zh"; // default language
    }

    // Check timezone
    if(u.timezone) {
        if(u.timezone != "GMT+08:00" && u.timezone != "GMT+09:00" && u.timezone != "GMT-05:00") {
            callback(new Error('时区格式不正确，目前支持的时区格式,中国"GMT+08:00", 日本"GMT+09:00", 美国"GMT-05:00"'));
            return;
        }
    }else {
        u.timezone = "GMT+08:00"; // default timezone
    }

    if(u.custom) {
        // Check url
        if(u.custom.url && !util.isUrl(u.custom.url)) {
           callback(new Error('主页地址格式不正确'));
           return;
        }
    }

	user.find({"uid": u.uid}, function(err, result){
		if(result && result.length > 0){               // Update user
			u.editby = exe_user.uid;
			u.editat = now;

			user.update(result[0]._id, u, function(err, result) {
                console.log('Update User.');
                callback(err, result);
		 	});
		} else {                                        // Create user
			u.createby = exe_user.uid;
			u.createat = now;
			u.editby = exe_user.uid;
			u.editat = now;

			user.create(u, function(err, result) {
				console.log('Create User.');
                callback(err, result);
		 	});
		}
	});
}