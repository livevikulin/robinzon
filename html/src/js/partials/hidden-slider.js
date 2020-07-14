// ====================
// Project: hidden-slider
// 13-02-2017: drtvader
// ---------------------
// Запуск скрытой карусели в каталоге
// ====================
define(['jquery', 'slick'], function ($) {

    function initCarousel() {
        $('.js-hidden-slider').slick({
            dots: false,
            slidesToShow: 1,
            initialSlide: 1,
            // prevArrow: $('.prev.slick-arrow'),
            // nextArrow: $('.next.slick-arrow'),
            infinite: false,
            arrows: false
        });
    }

    if ($('.js-hidden-slider').length > 0) {
        // initCarousel();
    }

    $('body').on('initHiddenCarousel',function () {
        // initCarousel();
    });
});
