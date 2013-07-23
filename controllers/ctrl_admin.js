var admin = require("../modules/mod_admin.js")
  , csv = require('csv')
  , confapp = require("config").app
  , json = lib.core.json;

/**
 * 下载模板
 */
exports.download_template = function (req_, res_){
  admin.getTemplate(function(err, data){
  	res_.set('Content-Type', 'text/csv');
  	res_.attachment("user_template.csv");

  	csv()
  	.from.array(data)
  	.to.stream(res_, {rowDelimiter: '\r\n'});
  })
};

/**
 * CSV导入用户
 */
exports.csvimport_user = function(req_, res_){

    if(!req_.files.csvfile || !req_.files.csvfile.path) {
        json.send(res_, { code: 400, message: "Can't find import file!"});
        return;
    }

	var user = req_.session.user;
    var records = [];
    var error_import;
	csv()
	.from.path(req_.files.csvfile.path)
	.on('record', function(row,index){
        if(index > 0) { // 跳过Head
            records.push(row);
        }
	})
	.on('end', function(count){
        if(error_import) {
            error_import.message = "第" + (index + 1) + "行: " + error_import.message;
            json.send(res_, { code: 200, message: error_import.message, line_num: index});
        } else {
            for(var index=0;  index < records.length; index++) {
                var row = records[index];
                console.log('#'+index+' '+JSON.stringify(row));
                admin.csvImportRow(req_.session.user, row, function(err, result){
                    if(err) { error_import = err; }
                });

                if(error_import) {
                    error_import.message = "第" + (index + 1) + "行: " + error_import.message;
                    json.send(res_, { code: 200, message: error_import.message, line_num: index});
                    break;
                } else if(index == records.length -1) {
                    json.send(res_, null, { message: "导入成功" + records.length + "条数据" });
                }
            };
        }

	})
	.on('error', function(error){
      var error_message = "解析csv文件出错。";
      error_import = {
          code: 200
          ,message: error_message
      };
	  console.log(error_message + '\n' + error.message);
	});
};