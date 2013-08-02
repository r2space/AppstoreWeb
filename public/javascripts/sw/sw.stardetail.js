
var app_id = window.location.href.split("/")[4];

$(function () {

  // 初始化评价框
  $Comment.initialize();

  // 获取详细信息，显示
  smart.doget("/app/info.json?app_id=" + app_id, function(err, star){

    console.log("-----");
    console.log(star);

    // 侧栏
    $("#app_name").html(star.name);
    $('#version').html(star.version);
    $('#lastupdate').html(smart.date(star.update_date).substr(2, 8));

//    $("#info_description").html(info.description);
//    $("#info_icon_big").attr("src", "/picture/" + info.icon.big);
//    $("#info_screenshot").html("");
//
//    console.log("info.downloadId   :%s", info.downloadId);
//    $("#download").attr("href", "/file/download.json?_id=" + info.downloadId);
//    for (var i = 0; i < info.screenshot.length; i++)
//      $("#info_screenshot").append("<img src=\"/picture/" + info.screenshot[i] + "\"></img>")


  });
});
