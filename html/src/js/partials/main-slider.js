// - ====================
// - 4P: main-slider
// - 24-10-2017: Mell.Blimm/Amed
// - --------------------
// - Инициализация слайдера на главной странице
// - ====================

define(['jquery', 'slick'], function ($) {

    if ($('.js-main-slider').length > 0) {

        $('.js-main-slider').slick({
            prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--main-prev"><i class="icon-arrow_big_ico b-icon--arrow-main-slider"></i></a>',
            nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--main-next"><i class="icon-arrow_big_ico b-icon--arrow-main-slider"></i></a>',
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            dotsClass: 'b-slick-dots',
            autoplay: true,
            speed: 1000,
            infinite: true,
            responsive: [
                {
                breakpoint: 767,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                swipeToSlide: true,
                speed: 1500,
                }
            }
        ]
    });

    }

});
