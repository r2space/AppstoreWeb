function initEnv() {

    if ($.browser.msie && /6.0/.test(navigator.userAgent)) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {
        }
    }
    //清理浏览器内存,只对IE起效
    if ($.browser.msie) {
        window.setInterval("CollectGarbage();", 10000);
    }

    $(window).resize(function () {
        initLayout();
    });

    var ajaxbg = $("#progressBar");
    $(document).ajaxStart(function () {
        ajaxbg.attr("value", "loading");
    }).ajaxStop(function () {
            ajaxbg.attr("value", "submit");
        });


    setTimeout(function () {
        initLayout();
        initUI();
    }, 10);

}
function initLayout() {
    var iContentW = $(window).width();
    var iContentH = $(window).height();
    console.log("initLayout  width : %s  , height : %s", iContentW, iContentH);
}

function initUI(_box) {
    var $p = $(_box || document);

    $("form.required-validate", $p).each(function () {
        var $form = $(this);
        $form.validate({
            onsubmit: false,
            focusInvalid: true,
            focusCleanup: true,
            errorClass: "help-inline",
            errorElement: "span",
            ignore: ".ignore",
            invalidHandler: function (form, validator) {
                var errors = validator.numberOfInvalids();
                if (errors) {
                    var message = $DAC.msg("validateFormError", [errors]);
                    $alertMsg.error(message);
                }
            },
            highlight: function (element, errorClass, validClass) {
                console.log(errorClass);
            },
            unhighlight: function (element, errorClass, validClass) {

            }
        });
    });
    if ($.fn.loadUrl) $("[target=loadUrl]", $p).loadUrl();
    if ($.fn.ajaxGet) $("[target=ajaxGet]", $p).ajaxGet();
}


