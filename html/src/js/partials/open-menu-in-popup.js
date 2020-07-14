// - ====================
// - 4P: open-menu-in-popup
// - 16-02-2018: Malich
// - --------------------
// -  открытие и закрытие мобильного меню в попапе
// - ====================

define(['jquery', './is-mobile'], function ($, isMobile) {

    // if ($('.js-menu-in-popup-cont').length) {
    //     var $mainList = $('.js-menu-in-popup-main');
    //     var $closeFilter = $('.js-close-filter-mobile');

    // js-menu-in-popup-cont
    // js-menu-in-popup-back
    // js-menu-in-popup-link | data-submenu="filter-mobile"
    // js-menu-in-popup-submenu | data-submenu-id="filter-mobile"

    // initPopupSub();

    // $('.js-menu-in-popup-link').on('open-menu-in-popup', function () {
    //     initPopupSub();
    // });

    // Событие "Закрытие"
    // $('.js-menu-in-popup-back').on('click', function () {

    //     // Amedomary
    //     $('.js-menu-in-popup-link').removeClass('active');
    //     $mainList.removeClass('active');
    //     $mainList.addClass('close');

    //     $('.js-menu-in-popup-submenu').removeClass('active');
    //     $(this).removeClass('active');
    // });

    // // кнопка закрытия попАпа и фильтров
    // $closeFilter.on('click', function () {
    //     $mainList.removeClass('close');
    // });

    // function initPopupSub() {
    // $('.js-menu-in-popup-link').off('click');

    // // Событие "Открытие"
    // $('.js-menu-in-popup-link').on('click', function () {
    //     console.log('SubMenu');
    //     console.log($(this));

    //     // Amedomary
    //     $(this).addClass('active');
    //     $mainList.addClass('active');
    //     $mainList.removeClass('close');

    //     $('.js-menu-in-popup-submenu[data-submenu-id="' + $(this).data('submenu') + '"]').addClass('active');
    //     $('.js-menu-in-popup-back').addClass('active');
    // });
    // }
    // }
});
