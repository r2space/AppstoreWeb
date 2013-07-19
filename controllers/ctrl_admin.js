var admin = require("../modules/mod_admin.js")
  , csv = require('csv');

/**
 * 下载模板
 */
exports.download_template = function (req_, res_){
  admin.getTemplate(function(err, data){
  	res_.set('Content-Type', 'text/csv');
  	res_.attachment("user_template.csv");

  	csv()
  	.from.array(data)
  	.to.stream(res_);
  })
};

/**
 * CSV导入用户
 */
exports.csvimport_user = function(req_, res_){
	var user = req_.session.user;
	console.log("####### " + req_.files.csvfile.path);

	csv()
	.from.path(req_.files.csvfile.path)
	.to.path(__dirname+'/sample.out')
	.transform( function(row){
	  row.unshift(row.pop());
	  return row;
	})
	.on('record', function(row,index){
	  	console.log('#'+index+' '+JSON.stringify(row));
	  	admin.csvImportRow(req_.session.user, row);
	})
	.on('close', function(count){

	  console.log('Number of lines: '+count);
	  res_.send("close");
	})
	.on('error', function(error){

	  console.log(error.message);
	  res_.send("error");
	});
};