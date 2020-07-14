// - ====================
// - 4P: buy-set-slider
// - 01-02-2018: VD
// - --------------------
// -  Слайдер - покупать в комплекте выгодно
// - ====================

define(['jquery', 'slick'], function ($) {

    if ($('.js-buy-set-slider').length > 0) {

        function initSlick(){
            if ($('.js-buy-set-slider').hasClass('slick-initialized')) {
                $('.js-buy-set-slider').slick('unslick');
            }
            $('.js-buy-set-slider').slick({
                dots: true,
                // centerMode: true,
                // centerPadding: '0px',
                // variableWidth: true,
                slidesToShow: 1,
                dotsClass: 'b-slick-dots b-slick-dots--buy-set',
                prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--buy-set prev slick-arrow"><i class="icon-arrow_small_ico b-icon--arrow-slider-set"></i></a>',
                nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--buy-set next slick-arrow"><i class="icon-arrow_small_ico b-icon--arrow-slider-set"></i></a>',
                infinite: false
            });
        }

        $(window).resize(function () {
            initSlick();
        });

        $(document).ready(function () {
            initSlick();
        });

    }

});
