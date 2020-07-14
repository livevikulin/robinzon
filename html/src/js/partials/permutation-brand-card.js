// - ====================
// - Robinzon: permutation-brand-card
// - 07-06-2018: sashakasha
// - --------------------
// - Перестановка. Бренд
// - ====================

define(['jquery'], function ($) {

    if ($('.js-brand-card-desk').length) {

        var adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 1170) {
                $('.js-brand-card-mobile').append($('.js-brand-card-banner'));
                $('.js-brand-card-desk').append($('.js-brand-card-desc'));
            } else if (window.innerWidth >= 1170) {
                $('.js-brand-card-mobile').append($('.js-brand-card-desc'));
                $('.js-brand-card-desk').append($('.js-brand-card-banner'));
            }
        };
        adaptive();

        $(window).resize(function () {
            if ($('.js-brand-card-desk').length > 0) {
                adaptive();
            }
        });
    }

});
