var $APP = {
    events: {

    },
    createDate:function(data){
        var sendData = {};
        for(var i in data){
            sendData[data[i].name] = data[i].value;
        }
        return sendData;
    },
    initialize: function () {
        var that = this;
        that.viewDidload();
    },
    viewDidload: function () {
        var that = this;

        $("#setUserList").bind("click",function(){
            $("#setuserlist").html('');
            ajaxGetCallback($("#setUserList"), {}, that.didUserListRender);
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

    },
    didUserListRender: function (msg) {
        for (var i in msg.data.items) {
            $("#setuserlist").append('<tr class="userCheckBox">' +
                ' <td><input type="checkbox" value="' + msg.data.items[i]._id + '"/></td>' +
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

        console.log(msg);
    },
    didUploadSmallFile: function (status, input, fid) {
        console.log(input);
        var fid = fid.data.items[0]._id;
        $("#icon_small_img").css("display", "block");
        $("#icon_small_btn").css("display", "none");
        $("#icon_small_span").css("display", "none");
        $("#icon_small_img").attr("src", "/picture/" + fid)
    },
    didUploadBigFile: function (status, input, fid) {
        console.log(input);
        var fid = fid.data.items[0]._id;
        $("#icon_big_img").css("display", "block");
        $("#icon_big_btn").css("display", "none");
        $("#icon_big_span").css("display", "none");
        $("#icon_big_img").attr("src", "/picture/" + fid)
    },
    didUploadImageFile: function (status, input, fid) {
        console.log(input);
        var fid = fid.data.items[0]._id;
        $("#image_big_img").css("display", "block");
        $("#image_big_btn").css("display", "none");
        $("#image_big_span").css("display", "none");
        $("#image_big_img").attr("src", "/picture/" + fid)
    },

    didSendAppInfo: function (msg) {
        console.log(msg);
    }

};