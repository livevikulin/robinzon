define(['jquery'], function ($) {
    var $linkCheck = $('.js-item-check');
    var $buttonCheck = $('.js-item-button');
    var $blockCheck = $('.js-list-check');

    if (($linkCheck.length > 0) && ($blockCheck.length > 0)) {
        var adaptive = function () {
            if (window.innerWidth >= 320 && window.innerWidth < 768) {
                $(document).on('click','.js-item-check', function () {
                    $('.js-item-check').removeClass("active");
                    $(this).addClass("active");
                });
            } else if (window.innerWidth >= 768) {
                $(document).on('click','.js-item-button', function () {
                    $(this).parents(".js-list-check").find(".js-item-check").removeClass("active");
                    $(this).parent().addClass("active");
                    return false;
                });
            }
        };
        adaptive();

        $(window).resize(function () {
            if ($blockCheck.length > 0) {
                adaptive();
            }
        });
    }
});