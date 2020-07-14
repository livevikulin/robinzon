// ====================
// ps скрол на текст
// ====================

// костыль для инициализации utatti-perfect-scrollbar, чтобы она не показывала ошибку
var module = {};

define(['jquery', 'utatti-perfect-scrollbar'], function ($) {

    var ps = null;
    if ($('.js-help-text-scroll').length > 0) {

        function resizeScrollTag() {

            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                if (ps != null) {
                    ps.destroy();
                    ps = null;
                }
            } else if (window.innerWidth >= 768) {
                ps = new PerfectScrollbar('.js-help-text-scroll', {
                    suppressScrollX: true,
                    wheelPropagation: true,

                    // для скрола колёсиком
                    useBothWheelAxes: true,
                });
            }
        }
        resizeScrollTag();

        $(window).resize(function () {
            resizeScrollTag();
        });
    }
});
