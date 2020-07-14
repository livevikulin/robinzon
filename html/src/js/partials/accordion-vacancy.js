// ====================
// robinzon: accordion-vacancy
// 13-07-2017: Альберт
// ---------------------
// Аккордион в вакансиях
// ====================

define(['jquery'], function ($) {

    function closeAccordion() {
        $('.js-accordion-vacancy').removeClass('open');
        $('.js-hidden-vacancy').slideUp();
    }

    function DoScroll($scollMe) {
        var i = 50;
        var fix;
        if (typeof $scollMe === 'undefined'){
            $scollMe = $('.js-accordion-vacancy.open');
        }

        if ($scollMe.length) {
            fix = setInterval(function () {
                if (i-- == 0 || $scollMe.length==0) clearInterval(fix);
                $scollMe[0].scrollIntoView();
            },10);
        }
    }

    $('.js-accordion-vacancy').each(function (i) {
        $(this).data('count', i);
    });
    $('.js-open-vacancy').on('click', function() {
        var $thisHiddenOred = $(this).closest('.js-accordion-vacancy').find('.js-hidden-vacancy');
        var $content = $(this).parents('.js-accordion-vacancy');
        var top = $('.js-accordion-vacancy:first').position().top;
        var vHeight = $('.b-accordion-vacancy__visible:first').height();

        closeAccordion();
        if ($thisHiddenOred.is(":visible")) {
            $content.removeClass('open');
        } else {
            // Зкарываем
            $(this).closest('.js-accordion-vacancy').find('.js-hidden-vacancy').stop().slideDown();
            $(this).closest('.js-accordion-vacancy').find('.js-visible-vacancy').addClass('open');
            $content.addClass('open');
        }
        //TODO правильный доскролл
        DoScroll();

        if (0) $('.js-this-scroll').animate({
            scrollTop: top + vHeight * $content.data('count')
        });
    });

    $(document).on('click', '.js-close-accordion', function (event) {
        closeAccordion();
        DoScroll(
            $(this).parents('.js-accordion-vacancy')
        );
    });
});
