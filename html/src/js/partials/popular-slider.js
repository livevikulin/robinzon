// - ====================
// - Robinzon: popular-slider
// - 02-06-2018: sashakasha
// - --------------------
// - Инициализация слайдера на карточке
// - ====================

define(['jquery', 'slick'], function ($) {

    if (1) {

        var initialisation;

        function initSlick() {
            var $slick = $('.js-popular-slider');

            var width = window.innerWidth || document.body.clientWidth;

            clearTimeout(initialisation);
            initialisation = setTimeout(function () {
                if ($slick.hasClass('slick-initialized')) {
                    $slick.slick('unslick');
                }
                if (width >= 1024) {
                    $slick.slick({
                        prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--similar-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--similar-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        dots: $('.js-popular-slider .b-recommended-item').length > 1,
                        dotsClass: 'b-slick-dots',
                        autoplay: false,
                        speed: 1000,

                        // 1169px
                        responsive: [
                            {
                                breakpoint: 1169,
                                settings: {
                                    slidesToShow: 5,
                                    slidesToScroll: 5,
                                    dots: false,
                                    arrows: false,
                                    swipeToSlide: true,
                                }
                            }
                        ]
                    });
                }
            }, 150);
        }

        $(window).resize(function () {
            initSlick();
        });

        $('body').on('initSlick',initSlick);

        $(document).ready(function () {
            initSlick();
        });
    }
});
