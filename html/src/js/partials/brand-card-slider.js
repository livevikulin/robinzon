// - ====================
// - Robinzon: popular-slider
// - 02-06-2018: sashakasha
// - --------------------
// - Инициализация слайдера. Бренд
// - ====================

define(['jquery', 'slick'], function ($) {

    if ($('.js-brand-card-slider').length > 0) {
        $('.js-brand-card-slider')
            .css({'display':'block'})
            .slick({
            prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-card-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
            nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-card-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            dotsClass: 'b-slick-dots',
            autoplay: false,
            speed: 1000,

            responsive: [
                {
                    breakpoint: 1279,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

    }
});
