// ====================
// Project: script
// 00-00-2017: Dima
// ---------------------
// Свернуть/Развернуть в отзывах
// ====================
define(['jquery'], function($) {

    $('.js-more-text').each(function () {
        var $content = $(this).siblings('.js-content');
        var $textBlock = $content.find('.js-text-container');

        var height = $textBlock.height();
        if ($content.height()==height){
      
            $(this).hide();
        }
    });

    $('.js-more-text').on('click', function () {
        var $content = $(this).siblings('.js-content');
        var $textBlock = $content.find('.js-text-container');

        var height = $textBlock.height();
        var diration = 625;

        $content.css('transition', 'none');


        if ($(this).hasClass('close')) {
            $content.attr('data-def-height', $content.height());

            $content.stop().animate({
                maxHeight: height,
            }, diration);

            $(this).removeClass('close').addClass('open');
            $(this).text('Скрыть');
            $(this).parents('.js-review-element').addClass("active");
        } else {

            $content.stop().animate({
                maxHeight: $content.attr('data-def-height'),
            }, diration);

            $(this).removeClass('open').addClass('close');
            $(this).text('Ещё');
            $(this).parents('.js-review-element').removeClass("active");
        }
    });
});
