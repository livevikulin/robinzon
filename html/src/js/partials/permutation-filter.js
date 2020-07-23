// ====================
// robinzon: permutation popular
// 16.02.2018: Malich
// ---------------------
// пермутейшен популярного
// ====================

define(['jquery'], function ($) {

    if ($('.js-prem-filter').length) {

        var adaptiveFilter = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                //console.log('do mobile');
                $('.js-filter-mobile').append($('.js-prem-filter'));
            } else if (window.innerWidth >= 768) {
                $('.js-filter-desk').append($('.js-prem-filter'));
            }
        };
        adaptiveFilter();

        $(window).resize(function () {
            if ($('.js-filter-desk').length > 0) {
                adaptiveFilter();
            }
        });
	}

});
