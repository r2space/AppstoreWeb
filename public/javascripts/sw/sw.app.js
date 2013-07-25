var $app = {
    app_id: ' ',
    events: {

    },
    createDate: function (data) {
        var sendData = {};
        var crsf = $("#_csrf").val();
        for (var i in data) {
            sendData[data[i].name] = data[i].value;
            if (data[i].name == "screenshot") {

                sendData[data[i].name] = data[i].value.split(',');
            }
            if (data[i].name == "permission.admin") {
                sendData[data[i].name] = data[i].value.split(',');
            }
            if (data[i].name == "permission.edit") {
                sendData[data[i].name] = data[i].value.split(',');
            }
            if (data[i].name == "permission.view") {
                sendData[data[i].name] = data[i].value.split(',');
            }
            if (data[i].name == "permission.download") {
                sendData[data[i].name] = data[i].value.split(',');
            }
            console.log(data[i]);
        }
        sendData["_csrf"] = crsf;
        return sendData;
    },
    initialize: function () {
        var that = this;
        that.viewDidload();
        if (app_id) {
            console.log("app_id  ==  %s", app_id);
            that.app_id = app_id;

            ajaxGetCallback(null, {
                url: "/app/info.json",
                data: {
                    app_id: app_id
                }

            }, that.renderAppDetailById);
        }
    },
    renderAppDetailById: function (msg) {
        console.log(msg);
        var info = eval(msg.data);
        console.log(info);
        $("#app_name").html(info.name);
        $("#info_description").html(info.description);
        $("#info_icon_big").attr("src", "/picture/" + info.icon.big);
        $("#info_screenshot").html("");
        for (var i = 0; i < info.screenshot.length; i++)
            $("#info_screenshot").append("<img src=\"/picture/" + info.screenshot[i] + "\"></img>")

    },
    viewDidload: function () {
        var that = this;

        $("#admin_set_btn").bind("click", function () {
            $("#setuserlist").html('');
            ajaxGetCallback($("#admin_set_btn"), {}, that.didAdminSelectRender);
        });
        $("#edit_set_btn").bind("click", function () {
            $("#setuserlist").html('');
            ajaxGetCallback($("#edit_set_btn"), {}, that.didEditSelectRender);

        });
        $("#view_set_btn").bind("click", function () {
            $("#setuserlist").html('');
            ajaxGetCallback($("#view_set_btn"), {}, that.didViewSelectRender);
        });
        $("#download_set_btn").bind("click", function () {
            $("#setuserlist").html('');
            ajaxGetCallback($("#download_set_btn"), {}, that.didDownloadSelectRender);
        });


        var upload_event = ['icon_small_', 'icon_big_', 'image_big_', 'video_big_'];
        $("#icon_small_btn").bind("click", function () {
            $("#icon_small_file").bind("change", function (e) {
                uploadFiles('didUploadSmallFile', e.target.files, that.didUploadSmallFile);
                $("#icon_small_file").unbind("change");
            });
            var src = $("#icon_small_file");
            src.attr("accept", "");
            src.attr("multiple", "multiple");
            src.trigger('click');
        });
        $("#icon_big_btn").bind("click", function () {
            $("#icon_big_file").bind("change", function (e) {
                uploadFiles('didUploadSmallFile', e.target.files, that.didUploadBigFile);
                $("#icon_big_file").unbind("change");
            });
            var src = $("#icon_big_file");
            src.attr("accept", "");
            src.attr("multiple", "multiple");
            src.trigger('click');
        });
        $("#app_file_btn").bind("click",function(){
            console.log("app_file_btn");
            $("#app_file").bind("change", function (e) {
                uploadFiles('didUploadAppFile', e.target.files, that.didUploadAppFile);
                $("#app_file").unbind("change");
            });
            var src = $("#app_file");
            src.attr("accept", "");
            src.attr("multiple", "multiple");
            src.trigger('click');
        });
        $("#image_big_btn").bind("click", function () {
            $("#image_big_file").bind("change", function (e) {
                uploadFiles('didUploadSmallFile', e.target.files, that.didUploadImageFile);
                $("#icon_big_file").unbind("change");
            });
            var src = $("#image_big_file");
            src.attr("accept", "");
            src.attr("multiple", "multiple");
            src.trigger('click');
        });
        //管理者选择用户初始化
        //绑定设定按钮

        //初始化

    },
    //管理者选择
    didAdminSelectRender: function (msg) {
        $("#setuserlist").html(' ');

        for (var i in msg.data.items) {
            $("#setuserlist").append('<tr class="userCheckBox">' +
                ' <td><input type="checkbox" name="user_id" value="{_id:\'' + msg.data.items[i]._id + '\',name:\'' + msg.data.items[i].name.name_zh + '\'}"/></td>' +
                ' <td>' + msg.data.items[i].name.name_zh + '</td>' +
                ' <td><a href="#" data=' + msg.data.items[i]._id + '>选择</a></td>' +

                ' </tr>');
        }

        $(".userCheckBox").bind("click", function (e) {
            if ("checked" != $($(e.target).parent()[0]).find("input").attr("checked"))
                $($(e.target).parent()[0]).find("input").attr("checked", "checked");
            else
                $($(e.target).parent()[0]).find("input").removeAttr("checked");
        });
        $("#setUser").unbind("click");
        $("#setUser").bind("click", function () {

            $("#document-selector").modal('hide');
            var chk_value = [];
            var chk_value_id = [];

            $("#setuserlist").find('input[name="user_id"]:checked').each(function () {
                var dataJson = eval("(" + $(this).val() + ")");
                chk_value_id.push(dataJson._id);
                chk_value.push(dataJson);

            });
            $("#permission_admin_input").val(chk_value_id);
            console.log(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
            $("#admin_user_selected").html('');
            for (var i = 0; i < chk_value.length; i++) {
                $("#admin_user_selected").append("<li class=\"user_has_selected\" data=\"" + chk_value[i]._id + "\"><div ><div style='float: left'><i class='icon-user'/>" + chk_value[i].name + "</div><div class='close_user' style='display: none;float: right;'>X</div><div><br></li>");
            }

            $(".user_has_selected").each(function (i, li) {
                $(this).mouseover(function () {
                    $(this).find(".close_user").css("display", "block");
                });
                $(this).mouseleave(function () {
                    $(this).find(".close_user").css("display", "none");
                });
                $(this).click(function () {
                    var data = $(this).attr("data");
                    var new_chk_value_id = _.without(chk_value_id, data);
                    $("#permission_admin_input").val(new_chk_value_id);
                    $(this).remove();
                });

            });
        });
    },
    //编辑权限选择
    didEditSelectRender: function (msg) {
        $("#setuserlist").html(' ');
        for (var i in msg.data.items) {
            $("#setuserlist").append('<tr class="userCheckBox">' +
                ' <td><input type="checkbox" name="user_id" value="{_id:\'' + msg.data.items[i]._id + '\',name:\'' + msg.data.items[i].name.name_zh + '\'}"/></td>' +
                ' <td>' + msg.data.items[i].name.name_zh + '</td>' +
                ' <td><a href="#" data=' + msg.data.items[i]._id + '>选择</a></td>' +

                ' </tr>');
        }
        $(".userCheckBox").bind("click", function (e) {
            if ("checked" != $($(e.target).parent()[0]).find("input").attr("checked"))
                $($(e.target).parent()[0]).find("input").attr("checked", "checked");
            else
                $($(e.target).parent()[0]).find("input").removeAttr("checked");
        });
        $("#setUser").unbind("click");
        $("#setUser").bind("click", function () {

            $("#document-selector").modal('hide');
            var chk_value = [];
            var chk_value_id = [];

            $("#setuserlist").find('input[name="user_id"]:checked').each(function () {
                var dataJson = eval("(" + $(this).val() + ")");
                chk_value.push(dataJson);
                chk_value_id.push(dataJson._id);

            });
            $("#permission_edit_input").val(chk_value_id);
            console.log(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
            $("#edit_user_selected").html('');
            for (var i = 0; i < chk_value.length; i++) {
                $("#edit_user_selected").append("<li class=\"user_has_selected\" data=\"" + chk_value[i]._id + "\"><div ><div style='float: left'><i class='icon-user'/>" + chk_value[i].name + "</div><div class='close_user' style='display: none;float: right;'>X</div><div><br></li>");
            }

            $(".user_has_selected").each(function (i, li) {
                $(this).mouseover(function () {
                    $(this).find(".close_user").css("display", "block");
                });
                $(this).mouseleave(function () {
                    $(this).find(".close_user").css("display", "none");
                });
                $(this).click(function () {
                    var data = $(this).attr("data");
                    var new_chk_value_id = _.without(chk_value_id, data);
                    $("#permission_edit_input").val(new_chk_value_id);
                    $(this).remove();
                });

            });
        });
    },
    //阅览者选择
    didViewSelectRender: function (msg) {
        $("#setuserlist").html(' ');
        for (var i in msg.data.items) {
            $("#setuserlist").append('<tr class="userCheckBox">' +
                ' <td><input type="checkbox" name="user_id" value="{_id:\'' + msg.data.items[i]._id + '\',name:\'' + msg.data.items[i].name.name_zh + '\'}"/></td>' +
                ' <td>' + msg.data.items[i].name.name_zh + '</td>' +
                ' <td><a href="#" data=' + msg.data.items[i]._id + '>选择</a></td>' +

                ' </tr>');
        }
        $(".userCheckBox").bind("click", function (e) {
            if ("checked" != $($(e.target).parent()[0]).find("input").attr("checked"))
                $($(e.target).parent()[0]).find("input").attr("checked", "checked");
            else
                $($(e.target).parent()[0]).find("input").removeAttr("checked");
        });
        $("#setUser").unbind("click");
        $("#setUser").bind("click", function () {

            $("#document-selector").modal('hide');
            var chk_value = [];
            var chk_value_id = [];


            $("#setuserlist").find('input[name="user_id"]:checked').each(function () {
                var dataJson = eval("(" + $(this).val() + ")");
                chk_value.push(dataJson);
                chk_value_id.push(dataJson._id);

            });
            $("#permission_view_input").val(chk_value_id);
            console.log(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
            $("#view_user_selected").html('');
            for (var i = 0; i < chk_value.length; i++) {
                $("#view_user_selected").append("<li class=\"user_has_selected\" data=\"" + chk_value[i]._id + "\"><div ><div style='float: left'><i class='icon-user'/>" + chk_value[i].name + "</div><div class='close_user' style='display: none;float: right;'>X</div><div><br></li>");
            }

            $(".user_has_selected").each(function (i, li) {
                $(this).mouseover(function () {
                    $(this).find(".close_user").css("display", "block");
                });
                $(this).mouseleave(function () {
                    $(this).find(".close_user").css("display", "none");
                });
                $(this).click(function () {
                    var data = $(this).attr("data");
                    var new_chk_value_id = _.without(chk_value_id, data);
                    $("#permission_view_input").val(new_chk_value_id);
                    $(this).remove();
                });

            });
        });
    },
    //下载者选择
    didDownloadSelectRender: function (msg) {
        $("#setuserlist").html(' ');
        for (var i in msg.data.items) {
            $("#setuserlist").append('<tr class="userCheckBox">' +
                ' <td><input type="checkbox" name="user_id" value="{_id:\'' + msg.data.items[i]._id + '\',name:\'' + msg.data.items[i].name.name_zh + '\'}"/></td>' +
                ' <td>' + msg.data.items[i].name.name_zh + '</td>' +
                ' <td><a href="#" data=' + msg.data.items[i]._id + '>选择</a></td>' +

                ' </tr>');
        }
        $(".userCheckBox").bind("click", function (e) {
            if ("checked" != $($(e.target).parent()[0]).find("input").attr("checked"))
                $($(e.target).parent()[0]).find("input").attr("checked", "checked");
            else
                $($(e.target).parent()[0]).find("input").removeAttr("checked");
        });
        $("#setUser").unbind("click");
        $("#setUser").bind("click", function () {

            $("#document-selector").modal('hide');
            var chk_value = [];
            var chk_value_id = [];


            $("#setuserlist").find('input[name="user_id"]:checked').each(function () {
                var dataJson = eval("(" + $(this).val() + ")");
                chk_value.push(dataJson);
                chk_value_id.push(dataJson._id);

            });
            $("#permission_download_input").val(chk_value_id);
            console.log(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
            $("#download_user_selected").html('');
            for (var i = 0; i < chk_value.length; i++) {
                $("#download_user_selected").append("<li class=\"user_has_selected\" data=\"" + chk_value[i]._id + "\"><div ><div style='float: left'><i class='icon-user'/>" + chk_value[i].name + "</div><div class='close_user' style='display: none;float: right;'>X</div><div><br></li>");
            }
            $(".user_has_selected").each(function (i, li) {
                $(this).mouseover(function () {
                    $(this).find(".close_user").css("display", "block");
                });
                $(this).mouseleave(function () {
                    $(this).find(".close_user").css("display", "none");
                });
                $(this).click(function () {
                    var data = $(this).attr("data");
                    console.log(data);
                    console.log(chk_value_id);
                    console.log(chk_value_id);
                    var new_chk_value_id = _.without(chk_value_id, data);
                    console.log(new_chk_value_id);
                    console.log();
                    $("#permission_download_input").val(new_chk_value_id);
                    $(this).remove();
                });

            });
        });
    },
    didUserListRender: function (msg) {
        var that = this;
        $("#setuserlist").html('');
        for (var i in msg.data.items) {
            $("#setuserlist").append('<tr class="userCheckBox">' +
                ' <td><input type="checkbox" name="user_id" value="{_id:\'' + msg.data.items[i]._id + '\',name:\'' + msg.data.items[i].name.name_zh + '\'}"/></td>' +
                ' <td>' + msg.data.items[i].name.name_zh + '</td>' +
                ' <td><a href="#" data=' + msg.data.items[i]._id + '>选择</a></td>' +

                ' </tr>');
        }
        $(".userCheckBox").bind("click", function (e) {
            if ("checked" != $($(e.target).parent()[0]).find("input").attr("checked"))
                $($(e.target).parent()[0]).find("input").attr("checked", "checked");
            else
                $($(e.target).parent()[0]).find("input").removeAttr("checked");
        });
        $("#setUser").unbind("click");
        $("#setUser").bind("click", function () {

            $("#document-selector").modal('hide');
            var chk_value = [];


            $("#setuserlist").find('input[name="user_id"]:checked').each(function () {
                var dataJson = eval("(" + $(this).val() + ")");
                chk_value.push(dataJson);

            });
            console.log(chk_value.length == 0 ? '你还没有选择任何内容！' : chk_value);
            $("#admin_user_selected").html('');
            for (var i in chk_value) {
                $("#admin_user_selected").append("<li class=\"user_has_selected\"><div ><div style='float: left'><i class='icon-user'/>" + chk_value[i].name + "</div><div class='close_user' style='display: none;float: right;'>X</div><div><br></li>");
            }

            $(".user_has_selected").each(function (i, li) {
                $(this).mouseover(function () {
                    $(this).find(".close_user").css("display", "block");
                });
                $(this).mouseleave(function () {
                    $(this).find(".close_user").css("display", "none");
                });
                $(this).click(function () {
                    $(this).remove();
                });

            });
        });
        console.log(msg);
    },
    didUserSelect: function (msg) {
        console.log(msg);
    },

    didUploadAppFile: function (status, input, fid) {
        console.log(fid);
        var fid = fid.data.items[0]._id;
        $("#app_file_hid").val(fid);
        $("#app_file_hid").attr("readonly","readonly");
        $("#app_file_btn").after(fid);

    },
    didUploadSmallFile: function (status, input, fid) {
        console.log(input);
        var fid = fid.data.items[0]._id;
        $("#icon_small_file_hid").val(fid);
        $("#icon_small_img").css("display", "block");
        $("#icon_small_btn").css("display", "none");
        $("#icon_small_span").css("display", "none");
        $("#icon_small_img").attr("src", "/picture/" + fid);

    },
    didUploadBigFile: function (status, input, fid) {
        console.log(input);
        var fid = fid.data.items[0]._id;
        $("#icon_big_file_hid").val(fid);
        $("#icon_big_img").css("display", "block");
        $("#icon_big_btn").css("display", "none");
        $("#icon_big_span").css("display", "none");
        $("#icon_big_img").attr("src", "/picture/" + fid);

    },
    didUploadImageFile: function (status, input, fid) {
        console.log(input);
//        var fid = fid.data.items[0]._id;
        var fids = [];
        for (var i = 0; i < fid.data.items.length; i++) {
            console.log(fid.data.items[i]);
            fids.push(fid.data.items[i]._id);
            $("#image_big_img").after("<img class='image_big_show' src='/picture/" + fid.data.items[i]._id + "' />");
        }

        $("#image_big_file_hid").val(fids);
        $("#image_big_btn").css("display", "none");
        $("#image_big_span").css("display", "none");

    },

    didSendAppInfo: function (msg) {
        console.log(msg);
        alert('添加成功');
        window.location.href = "/app/"+msg.data._id;
    }

};