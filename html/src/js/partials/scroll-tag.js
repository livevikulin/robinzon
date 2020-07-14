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
    if ($('.js-scroll-tag').length > 0) {

        function resizeScrollTag() {
            var ulWidth = $('.js-scroll-tag').width();
            var liWidth = 0;
            $('.js-scroll-tag li').each(function () {
                var style = window.getComputedStyle(this, null);
                var margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                liWidth+=this.clientWidth + margin;
            });
            setTimeout(function () {
                if (ulWidth > liWidth) {
                    $('.js-next-arrow').removeClass('active');
                }else{
                    $('.js-next-arrow').addClass('active');
                }
            });


        //     if (window.innerWidth >= 320 && window.innerWidth < 768) {
        //         if (ps != null) {
        //             ps.destroy();
        //             ps = null;
        //         }
        //     } else if (window.innerWidth >= 768) {
        //         ps = new PerfectScrollbar('.js-scroll-tag', {
        //             suppressScrollY: true,
        //             wheelPropagation: true,

        //             // для скрола колёсиком
        //             useBothWheelAxes: true,
        //         });
        //     }

        // }  НЕ РАБОТАЛО НА МОБИЛКЕ В КАТАЛОГЕ
            if (window.innerWidth >= 320) {
                ps = new PerfectScrollbar('.js-scroll-tag', {
                    suppressScrollY: true,
                    wheelPropagation: true,

                    // для скрола колёсиком
                    useBothWheelAxes: true,
                });
                if ($('.js-scroll-tag .active').length){
                    $('.js-scroll-tag')[0].scrollLeft = $('.js-scroll-tag .active').position().left;
                }

            }
        }
        resizeScrollTag();

        $('.js-scroll-tag').on('ps-scroll-left', function (event) {
            $('.js-next-arrow').addClass('active');
        });

        $('.js-scroll-tag').on('ps-scroll-right', function (event) {
            $('.js-prev-arrow').addClass('active');
        });

        $('.js-scroll-tag').on('ps-x-reach-start', function (event) {
            $('.js-prev-arrow').removeClass('active');
        });

        $('.js-scroll-tag').on('ps-x-reach-end', function (event) {
            $('.js-next-arrow').removeClass('active');
        });

        var timeUp;
        var timeDown;
        $('.js-prev-arrow, .js-next-arrow').on('mousedown touchstart', function (event) {
            var numb;
            var duration;
            var distance = ps.contentWidth - ps.containerWidth;

            if ($(this).hasClass('js-prev-arrow')) {
                numb = 0;
                duration = (distance) - ((distance) - $('.js-scroll-tag').scrollLeft());
            } else {
                numb = distance;
                duration = (distance) - $('.js-scroll-tag').scrollLeft();
            }

            timeDown = new Date().getTime();
            startAnimScroll(numb, duration);
        });

        // Подняли мышку
        var timeId;
        $('.js-next-arrow, .js-prev-arrow').on('mouseup touchend', function (event) {
            timeUp = new Date().getTime();
            var timeHold = timeUp - timeDown;
            if (timeHold < 300) {
                clearTimeout(timeId);
                timeId = setTimeout(function () {
                    $('.js-scroll-tag').stop();
                }, 300 - timeHold);
            } else {
                $('.js-scroll-tag').stop();
            }
        });

        function startAnimScroll(numb, duration) {
            $('.js-scroll-tag').stop().animate({
                scrollLeft: numb,
            }, duration, 'linear');
        }

        $(window).resize(function () {
            resizeScrollTag();
        });
    }
});
