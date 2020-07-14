// - ====================
// - 4P: desc-full-text
// - 22-03-2018: Malich
// - --------------------
// -  Текст в описании товара
// - ====================
define(['jquery'], function ($) {
    var $descFullText = $('.js-description-text');
    var $descFullTextWrapper = $('.js-show-more-product-description-wrapper');

    $('.js-show-more-product-description').on('click', function (event) {
        $descFullText.addClass('open');
        $descFullTextWrapper.removeClass('active');
        if ($descFullTextWrapper.hasClass('active')) {

        }
    });

    // $(window).resize(function () {
    //     testHeightOnResize();
    // });

    function getHeightInDesc() {
        var height = 0;
        $descFullText.children().each(function () {
            if (!$(this).hasClass('js-show-more-product-description')) {
                height += $(this).outerHeight();
            }
        });
        return height;
    }

    function testHeightOnResize() {
        if (window.innerWidth >= 320 && window.innerWidth < 1024) {
            if ($descFullText.outerHeight() < getHeightInDesc()) {
                $descFullTextWrapper.addClass('active');
            } else {
                $descFullTextWrapper.removeClass('active');
                $descFullText.removeClass('open');
            }
        } else if (window.innerWidth >= 1024) {
            $descFullTextWrapper.removeClass('active');
            $descFullText.removeClass('open');
        }
    }

    testHeightOnResize();
});
