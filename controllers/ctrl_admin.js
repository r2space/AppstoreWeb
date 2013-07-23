var admin = require("../modules/mod_admin.js")
  , csv = require('csv')
  , confapp = require("config").app
  , json = lib.core.json
  , fs = require('fs');

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

    // 先读文件的目的是为了预处理回车换行符，当前csv模块处理有问题。
    fs.readFile(req_.files.csvfile.path, 'utf-8', function(err, data) {
        if (err) {
            json.send(res_, { code: 400, message: "Can't find import file!"});
            return;
        }

        // 统一换行符，解决这个csv模块的回车换行的bug
        data = data.replace(/\r\n/g, '\n');
        data = data.replace(/\r/g, '\n');

        var user = req_.session.user;
        var records = [];
        var error_import;
        csv()
        .from.string(data)
        .on('record', function(row,index){
            if(index > 0) { // 跳过Head
                records.push(row);
            }
            return row;
        })
        .on('end', function(count){
            if(error_import) {
                error_import.message = "第" + (index + 1) + "行: " + error_import.message;
                json.send(res_, { code: 200, message: error_import.message});
            } else {
                if(records.length == 0) {
                    json.send(res_, null, { message: "没有数据可导入，请输入数据。" });
                    return;
                }

                for(var index=0;  index < records.length; index++) {
                    var row = records[index];
                    console.log('#'+index+' '+JSON.stringify(row));
                    admin.csvImportRow(req_.session.user, row, function(err, result){
                        if(err) { error_import = err; }
                    });

                    if(error_import) {
                        error_import.message = "第" + (index + 1) + "行: " + error_import.message;
                        json.send(res_, { code: 200, message: error_import.message});
                        break;
                    } else if(index == records.length -1) {
                        json.send(res_, null, { message: "成功导入" + records.length + "条数据" });
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
    });
};