// ====================
// robinzon: permutation account-popover
// 13.02.2018: Amedomary
// ---------------------
// пермутейшен поиска (account-popover)
// ====================

define(['jquery'], function ($) {

    var $element = $('.js-account-popover-element');
    var $mobilePlace = $('.js-account-popover-move-mobile');
    var $desktopPlace = $('.js-account-popover-move-desktop');

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
