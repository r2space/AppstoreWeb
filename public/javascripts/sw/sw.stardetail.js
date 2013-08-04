
var app_id = window.location.href.split("/")[4];

$(function () {

  // 初始化评价框
  $Comment.initialize();

  // 获取详细信息，显示
  smart.doget("/app/info.json?app_id=" + app_id, function(err, star){

    console.log(star);

    // 侧栏
    $("#app_name").html(star.name);
    $('#version').html(star.version);
    $('#lastupdate').html(smart.date(star.update_date).substr(2, 8));

    if (star.size) {
      $('#appsize').html(star.size);
    } else {
      $('#appsize').parent().hide();
    }
    $("#info_icon_big").attr("src", "/picture/" + star.icon.big);

    // 说明栏Tab
    var description = star.description.replace(new RegExp('\r?\n', 'g'), '<br />');
    $('#description').html(description);

    var releasenote = star.release_note.replace(new RegExp('\r?\n', 'g'), '<br />');
    $('#releasenote').html(releasenote);

    var support = star.support.replace(new RegExp('\r?\n', 'g'), '<br />');
    $('#support').html(support);

    var precautions = star.notice.replace(new RegExp('\r?\n', 'g'), '<br />');
    $('#precautions').html(precautions);

    // 截图
    var tmpl = $('#gallery-template').html();
    _.each(star.screenshot, function(imgid){
      $('#gallery').append(_.template(tmpl, {'imgid': imgid}));
    });

  });

  // 获取评价等级
  smart.doget("/app/comment/ranktotal.json?appId=" + app_id, function(err, rank) {
    var tmpl = $('#score-template').html();
    $('#score').html(_.template(tmpl, {'avg': rank.sum / rank.count}));
    $('#commenter').html(rank.count);

  });

});
