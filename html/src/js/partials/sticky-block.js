// ====================
// RBZ: sticky-block
// 20-07-2018: Malich
// ---------------------
// Прилипание блока при скроле в шагах крзины
// ====================
define(['jquery'], function($) {
    var $itemsHeight = $('.js-item-height');
    var $stickyBlock = $('.js-sticky-block');
    var $scroll = $('.js-this-scroll');

    var widthParam = $stickyBlock.data('sticky-type') === 'order' ? 1024 : 768;

    if ($itemsHeight.length && $stickyBlock.length && $scroll.length) {
        $scroll.on('scroll', function (event) {
            var $itemsHeight = $('.js-item-height:visible');
            var eFirstBlock = $itemsHeight.first()[0];
            var eLastBlock = $itemsHeight.last()[0];
            var maxHeight = 0;
            var wWidth = $(window).width();
            if (wWidth <= widthParam) {
                $stickyBlock.css({
                    position: '',
                    width: '',
                    height: '',
                    top: ''
                });
                return;
            }
            $itemsHeight.each(function () {
                maxHeight += $(this).outerHeight(true);
            });

            if (maxHeight > parseInt($stickyBlock.css('height'))) {

                var top = eFirstBlock.getBoundingClientRect().top;
                var bottom = eLastBlock.getBoundingClientRect().bottom;

                if (top < 15) {
                    if (bottom < parseInt($stickyBlock.css('height'))) {
                        $stickyBlock.css({
                            position: 'relative',
                            top: maxHeight - parseInt($stickyBlock.css('height')),
                            width: '',
                            height: '',
                        });
                    } else {
                        $stickyBlock.css({
                            position: 'fixed',
                            width: parseInt($stickyBlock.css('width')),
                            height: parseInt($stickyBlock.css('height')),
                            top: 15
                        });
                    }

                } else {
                    $stickyBlock.css({
                        position: '',
                        width: '',
                        height: '',
                        top: ''
                    });
                }
            }
        });
    }
});