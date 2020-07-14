// ====================
// robinzon: scroll-horizontal
// 10.07.2018: Альберт
// ---------------------
// ps горизонтальный скролл
// ====================

// костыль для инициализации utatti-perfect-scrollbar, чтобы она не показывала ошибку
var module = {};

define(['jquery', 'utatti-perfect-scrollbar','detect'], function ($) {

   var ps = null;

    var currentBrowser = window.ui.browser;
    var currentBrowserVersion = window.ui.version;
    var currentOS = window.ui.os;
    var currentOSVersion = window.ui.osversion;


    var is_mob = window.innerWidth < 1024;
    if (currentBrowser == 'Chrome' && is_mob) {

        $("body").css({
            height: '100vh',
            marginBottom: '2px'
        });

    }

    $('.js-horizontal-scroll, .js-horizontal-tab, .js-vertical-scroll').each(function (e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    });

    function resizeScrollList() {

        $('.js-horizontal-scroll').each(function () {

            ps = new PerfectScrollbar(this, {
                // suppressScrollX: true,
                wheelPropagation: true,
                // для скрола колёсиком
                useBothWheelAxes: false,
            });

        });


        $('.js-vertical-scroll').each(function () {
            ps = new PerfectScrollbar(this, {
                wheelPropagation: true,
                // для скрола колёсиком
                useBothWheelAxes: false,
            });
        });
    }
    resizeScrollList();

    $(window).resize(function () {
        resizeScrollList();
    });

    $('body').on('initHorizontalScroll',function () {
        resizeScrollList();
    });

    if ($('.js-horizontal-tab').length > 0) {

        function resizeScrollTab() {

            $('.js-horizontal-tab').each(function () {

                ps = new PerfectScrollbar(this, {
                    // suppressScrollX: true,
                    wheelPropagation: true,
                    // для скрола колёсиком
                    useBothWheelAxes: false,
                });

            });
        }
        resizeScrollTab();

        $(window).resize(function () {
            resizeScrollTab();
        });
    }
});
