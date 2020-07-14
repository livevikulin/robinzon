// ====================
// 4lapy: map
// 17-11-2017: Mell.Blimm
// --------------------
// Открытие табов в карточке товаров

// костыль для инициализации utatti-perfect-scrollbar, чтобы она не показывала ошибку
var module = {};

define(['jquery', 'webui-popover', 'utatti-perfect-scrollbar'], function ($) {

    var ps;

    function toggleMapOrList(eThis, bl, product) {

        $(eThis).parents('.b-availability-tab-list').find('.active').removeClass('active');
        $(eThis).parent().addClass('active');
        if (bl) {
            $('.js-content-map').addClass('show-map');
            if (window.innerWidth <= 767 && !$('#map').hasClass('js-mobile-event')) {
                $('.js-content-map').addClass('show-full-map');
            }
            $('.js-availability-content').addClass('show-map');
            $('.js-content-list')
                .addClass('in-map')
                .find('.b-delivery-list')
                .addClass('js-catalog--scroll-store js-shadow-scroll');
            if (!ps) {
                ps = new PerfectScrollbar('.js-map-list-scroll');
            }
            if (product) {
                $('.js-content-list').find('.b-delivery-list').addClass('in-map');
            } else {
                if (window.innerWidth < globalVars.desktopMin) {
                    $('.js-content-list').addClass('active');
                } else if (window.innerWidth >= globalVars.desktopMin) {
                    $('.js-content-list').removeClass('active');
                    $('.js-content-list').find('.b-delivery-list').addClass('in-map');
                }
            }
        } else {
            $('.js-content-map').removeClass('show-map show-full-map');

            $('.js-availability-content').removeClass('show-map show-full-map');

            $('.js-content-list')
                .removeClass('in-map')
                .find('.b-delivery-list')
                .removeClass('js-catalog--scroll-store js-shadow-scroll');
            if (ps) {
                ps.destroy();
            }
            ps = null;
            if (product) {
                $('.js-content-list').find('.b-delivery-list').removeClass('in-map');
            } else {
                if (window.innerWidth < globalVars.desktopMin) {
                    $('.js-content-list').removeClass('active');
                }

                if (window.innerWidth >= globalVars.desktopMin) {
                    $('.js-content-list').find('.b-delivery-list').removeClass('in-map');
                }
            }
        }
        if (!product) {
            if (window.innerWidth < globalVars.desktopMin) {
                $('.js-content-list').find('.b-delivery-list').removeClass('in-map');
            }
        }
    }


    $('body').on('setMap',function (e) {
        toggleMapOrList($('.js-product-map'),true,true);
    });


    var isScroll;
    // function getScroll(selector, needScroll) {
    // 	var hasScroll = $(selector).hasClass(selector);

    // 	if (!hasScroll)
    // 		$(selector).perfectScrollbar();
    // 	else
    // 		$(selector).perfectScrollbar('destroy');
    // }
    // getScroll(".js-catalog--scroll-store", true);

    /**
     * Стилизация "список или карта"
     * @param eThis
     * @param scroll
     * @returns {boolean}
     */

    function listAndMap(eThis, scroll) {
        if ($(eThis).hasClass('js-link-map') || $(eThis).hasClass('js-product-map') || scroll) {
            if ($(eThis).hasClass('js-link-map') || scroll) {
                toggleMapOrList(eThis, true, false);
                getScroll('.js-catalog--scroll-store', true);
                var height = $('.js-shadow-scroll').parent().find('.b-tab-delivery__shadow').css('height');
                $('.js-shadow-scroll').on('scroll', function (e) {
                    $(this).parent().find('.b-tab-delivery__shadow').css({height: getPercent(this, height) + 'px'});
                });
                return true;
            } else if ($(eThis).hasClass('js-product-map')) {
                toggleMapOrList(eThis, true, true);
                // $(".js-catalog--scroll-store").perfectScrollbar();
                var height = $('.js-shadow-scroll').parent().find('.b-tab-delivery__shadow').css('height');
                $('.js-shadow-scroll').on('scroll', function (e) {
                    $(this).parent().find('.b-tab-delivery__shadow').css({height: getPercent(this, height) + 'px'});
                });
            }
        } else {
            if ($(eThis).hasClass('js-link-list')) {
                toggleMapOrList(eThis, false, false);
                return false;
            } else if ($(eThis).hasClass('js-product-list')) {
                toggleMapOrList(eThis, false, true);
            }
        }
    }

    $(document).on('click', '.js-product-map', function () {
        listAndMap(this, false);
    });

    $(document).on('click', '.js-product-list', function () {
        listAndMap(this, false);
    });

    var resizeTimer;
    $(window).resize(function (e) {
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {
            listAndMap(false, isScroll);

            if (document.body.clientWidth < 768) {
                $('.js-product-list').click();
            }
            if ((window.innerWidth >= 767) && (window.innerWidth < 1024)) {
                if ($('.js-product-map').parent().hasClass('active')) {
                    $('.js-product-map').click();
                }
            }
        }, 250);
    });

});
