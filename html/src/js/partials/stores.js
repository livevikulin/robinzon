// ====================
// RBZ: stores
// 27-04-2018: Malich
// --------------------
// Ховер для "Наши магазины в Москве"
// ====================
define(['jquery'], function ($) {

    $('.js-link-hover').hover(

        // Приход
        function () {
            var mainClass = 'js-hover-main';
            var target = $(this).attr('data-hover-target');
            var $img = $('.js-image-hover[data-hover-id=\'' + target + '\']');
            var $main = $('.' + mainClass);
            var duration = 350;
            var src = $img.attr('src');
            
            $main.stop().animate({
                opacity: .3,
            }, duration, function () {
                $main.attr('src', src);
                $main.stop().animate({
                    opacity: 1,
                }, duration);
            });

        },

        // Уход
        function () {}
    );
});
