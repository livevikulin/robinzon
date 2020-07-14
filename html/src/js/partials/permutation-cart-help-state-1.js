// ====================
// robinzon: permutation popular
// 16.02.2018: Malich
// ---------------------
// пермутейшен популярного
// ====================

define(['jquery'], function ($) {

    function adaptiveNews() {
        var $object = $(document).find('.js-permutation-cart-help-state-1-object');
        var $containerOnDesktop = $(document).find('.js-permutation-cart-help-state-1-desktop');
        var $containerOnMobile = $(document).find('.js-permutation-cart-help-state-1-mobile');

        if (!$object.length) {
            return;
        }
        if (window.innerWidth < 1024) {
            $containerOnMobile.append($object);
        } else if (window.innerWidth >= 1024) {
            $containerOnDesktop.append($object);
        }
    }

    $(window).resize(function () {
        adaptiveNews();
    });

    var body = $('body');
    body.on('initAdaptiveNews',function (e) {
        adaptiveNews();
    });

    body.trigger('initAdaptiveNews');
});
