// ====================
// robinzon: permutation popular
// 16.02.2018: Malich
// ---------------------
// пермутейшен популярного
// ====================

define(['jquery'], function ($) {

    if ($('.js-popular-desk').length) {

        var adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                $('.js-popular-mobile').append($('.js-popular-title'));
                $('.js-popular-mobile').append($('.js-popular-list'));
            } else if (window.innerWidth >= 768) {
                $('.js-popular-desk').append($('.js-popular-title'));
                $('.js-popular-desk').append($('.js-popular-list'));
            }
        };
        adaptive();

        $(window).resize(function () {
            if ($('.js-popular-desk').length > 0) {
                adaptive();
            }
        });
    }

});
