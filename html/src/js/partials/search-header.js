// ====================
// robinzon: search-header
// 6.02.2018: Amedomary
// ---------------------
// Открытие поиска на мобилке на страницах кроме главное
// ====================

define(['jquery'], function ($) {

    var $linkSearch = $('.js-search-header-link');
    var $blockSrarch = $('.js-search-header-input');

    if (($linkSearch.length > 0) && ($blockSrarch.length > 0)) {

        // Клик по лупе для открытия поиска
        $linkSearch.on('click', function () {
            if ($(this).hasClass('active')) {
                $blockSrarch.slideUp();
                $(this).removeClass('active');
            } else {
                $blockSrarch.slideDown();
                $(this).addClass('active');
                if ($(window).width() < 768){
                    $('.js-this-scroll').scrollTop(0);//TODO
                }
            }
        });
    }

});
