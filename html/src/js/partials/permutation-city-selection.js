// ====================
// robinzon: permutation city selection
// 13.02.2018: Amedomary
// ---------------------
// пермутейшен поиска (выбор города)
// ====================

define(['jquery'], function ($) {

    var $element = $('.js-city-selection-move-element');
    var $mobilePlace = $('.js-city-selection-move-mobile');
    var $desktopPlace = $('.js-city-selection-move-desktop');
    var adaptive;

    if ($element.length > 0) {

        adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                if (!$mobilePlace.find('.js-city-selection-move-element').length) {
                    $mobilePlace.append($('.js-city-selection-move-element').first());
                }
            } else if (window.innerWidth >= 768) {
                if (!$desktopPlace.find('.js-city-selection-move-element').length) {
                    $('.js-city-selection-move-desktop').last().append($('.js-city-selection-move-element'));
                }
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
