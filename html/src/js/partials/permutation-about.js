// - ====================
// - Robinzon: permutation-about
// - 09-07-2018: sashakasha
// - --------------------
// - Перестановка. О компании
// - ====================

define(['jquery'], function ($) {

    if ($('.js-about-banner').length) {

        var adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 1024) {
                $('.js-about-mobile').after($('.js-about-banner'));
            } else if (window.innerWidth >= 1024) {
                $('.js-about-desktop').append($('.js-about-banner'));
            }
        };
        adaptive();

        $(window).resize(function () {
            if ($('.js-about-banner').length > 0) {
                adaptive();
            }
        });
    }

});