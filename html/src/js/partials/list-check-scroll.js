// ====================
// robinzon: scroll-tag
// 15.01.2018: Amedomary
// ---------------------
// ps скрол на теги (каталог)
// ====================

// костыль для инициализации utatti-perfect-scrollbar, чтобы она не показывала ошибку
var module = {};

define(['jquery', 'utatti-perfect-scrollbar'], function ($) {

    var ps = null;
    if ($('.js-list-check-scroll').length > 0) {

        function resizeScrollTag() {

            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                if (ps != null) {
                    ps.destroy();
                    ps = null;
                }
            } else if (window.innerWidth >= 768) {
                ps = new PerfectScrollbar('.js-list-check-scroll', {
                    suppressScrollX: true,
                    wheelPropagation: true,

                    // для скрола колёсиком
                    useBothWheelAxes: true,
                });
            }
        }
        resizeScrollTag();


        // $('.js-list-check-scroll').on('ps-scroll-left', function (event) {
        //     $('.js-next-arrow').addClass('active');
        // });

        // $('.js-list-check-scroll').on('ps-scroll-right', function (event) {
        //     $('.js-prev-arrow').addClass('active');
        // });

        // $('.js-list-check-scroll').on('ps-x-reach-start', function (event) {
        //     $('.js-prev-arrow').removeClass('active');
        // });

        // $('.js-list-check-scroll').on('ps-x-reach-end', function (event) {
        //     $('.js-next-arrow').removeClass('active');
        // });

        // var timeUp;
        // var timeDown;
        // $('.js-prev-arrow, .js-next-arrow').on('mousedown touchstart', function (event) {
        //     var numb;
        //     var duration;
        //     var distance = ps.contentWidth - ps.containerWidth;

        //     if ($(this).hasClass('js-prev-arrow')) {
        //         numb = 0;
        //         duration = (distance) - ((distance) - $('.js-list-check-scroll').scrollLeft());
        //     } else {
        //         numb = distance;
        //         duration = (distance) - $('.js-list-check-scroll').scrollLeft();
        //     }

        //     timeDown = new Date().getTime();
        //     startAnimScroll(numb, duration);
        // });

        // // Подняли мышку
        // var timeId;
        // $('.js-next-arrow, .js-prev-arrow').on('mouseup touchend', function (event) {
        //     timeUp = new Date().getTime();
        //     var timeHold = timeUp - timeDown;
        //     if (timeHold < 300) {
        //         clearTimeout(timeId);
        //         timeId = setTimeout(function () {
        //             $('.js-list-check-scroll').stop();
        //         }, 300 - timeHold);
        //     } else {
        //         $('.js-list-check-scroll').stop();
        //     }
        // });

        // function startAnimScroll(numb, duration) {
        //     $('.js-list-check-scroll').stop().animate({
        //         scrollLeft: numb,
        //     }, duration, 'linear');
        // }

        $(window).resize(function () {
            resizeScrollTag();
        });
    }
});
