// - ====================
// - Robinzon: permutation-permutation-store-card
// - 29-06-2018: sashakasha
// - --------------------
// - Перестановка. Магазины
// - ====================

define(['jquery'], function ($) {

    if ($('.js-store-card-map').length) {

        var adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 1024) {
                $('.js-store-card-mobile').prepend($('.js-store-card-map'));
            } else if (window.innerWidth >= 1024) {
                $('.js-store-card-desktop').append($('.js-store-card-map'));
            }
        };
        adaptive();

        $(window).resize(function () {
            if ($('.js-store-card-map').length > 0) {
                adaptive();
            }
        });
    }

});
