// ====================
// robinzon: anchor-link
// 19-04-2017: Malich
// ---------------------
// Яконрные ссылки
// ====================

define(['jquery'], function ($) {
    window.tabAnimating = false;
    $(document).on('click', '.js-anchor-link', function (event) {
        var $link = $(this);
        var link = $link.attr('data-anchor-link');
        setTimeout(function () {//линк должен сработать позже таба
            var $section = $('[data-anchor=\'' + link + '\']');
            var $tab = $('[data-tab-content=\'' + $link.attr('data-tab') + '\']');
            var scrollTop = $('.js-this-scroll').scrollTop();
            var isScrollTo = $link.data('scroll-to');
            var heightTab;
            var top;
            var rs;

            // Когда мы нажали на ссылку
            if (!$section.length && $tab.length) { // и есть таб
                //console.log('есть только таб');
                if ($('.js-tab-card-wrapper').length) {
                    top = $('.js-tab-card-wrapper').offset().top;    
                }
                
                heightTab = $('.js-fixed-tab-product').outerHeight() - $('.js-tab-card-wrapper').outerHeight();
            } else if ($section.length && !$tab.length) { // и нету таба
                console.log('есть только секция');
                top = $section.offset().top;
                heightTab = $('.js-fixed-tab-product').outerHeight();

                if (!$('.js-fixed-tab-product').length) {
                    heightTab = 0;
                }
            }else{
                console.log('есть и таб и секция?');
                top = $section.offset().top;
                heightTab = $('.js-fixed-tab-product').outerHeight();

                if (!$('.js-fixed-tab-product').length) {
                    heightTab = 0;
                }
            }

            if (($section.length || $tab.length) && isScrollTo) {
                rs = (scrollTop + top) - heightTab;
                window.tabAnimating = true;
                $('.js-this-scroll').stop().animate({
                    scrollTop: rs,
                }, 350,function () {
                    window.tabAnimating = false;
                });
            }
        }, (link=='review')?500:10);
    });
});
