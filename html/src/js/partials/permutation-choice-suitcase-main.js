// ====================
// robinzon: choice-suitcase
// 16.02.2018: Amedomary
// ---------------------
// пермутейшен Выбора чемодана на главной
// ====================

define(['jquery'], function ($) {

    var $element = $('.js-permutation-suitcase');
    var $mobilePlace = $('.js-mobile-permutation-suitcase');
    var $desktopPlace = $('.js-desktop-permutation-suitcase');

    if ($element.length > 0) {

        var adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                $mobilePlace.append($element);
            } else if (window.innerWidth >= 768) {
                $desktopPlace.append($element);
            }
        };
        adaptive();

        $(window).resize(function () {
            if ($element.length > 0) {
                adaptive();
            }
        });
    }

});
