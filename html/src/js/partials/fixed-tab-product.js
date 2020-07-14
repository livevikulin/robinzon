// ====================
// robinzon: b-fixed-tab-product
// 6.03.2018: Amedomary
// ---------------------
// Закрепления табов на карточке товара
// ====================

define(['jquery'], function ($) {

    var $fixedBar = $('.js-fixed-tab-product'); // Обьект который будет появляться
    var topTabBlock; // позиция блока от верха браузера
    var scrollWrapper; // положение скрола
    var windowsOS = (navigator.userAgent.toLowerCase().indexOf('windows') !== -1);
    var $staticBar = $('.js-tab-card-wrapper');

    // Проверка на наличие скролаа
    function getScroll(scroll, selector) {
        var doc = document;
        var body = doc.body;
        var element = doc.querySelector(selector);
        var client = 'client' + scroll;
        scroll = 'scroll' + scroll;
        return /CSS/.test(doc.compatMode)? (element[client]< element[scroll]) : (body[client]< body[scroll]);
    }

    // Проверяем операционную систему на Win и Скролл
    if ((windowsOS) && (getScroll('Height', '.b-page-wrapper'))) {
        $fixedBar.addClass('windows-os');
    }

    // скролим страницу
    $('.js-this-scroll').scroll(function () {
        topTabBlock = $staticBar.offset().top;
        scrollWrapper = $('.js-this-scroll').scrollTop();

        // Появление по нижней полоске
        // если положение скрола больше чем расстояние от начала страницы до обьекта
        if (scrollWrapper + ($fixedBar.outerHeight() - $staticBar.outerHeight() + 2) > topTabBlock + scrollWrapper && $staticBar.is(':visible')) {
            $fixedBar.addClass('active');
        } else {
            $fixedBar.removeClass('active');
        }
    });

});
