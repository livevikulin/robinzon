// ====================
// RBZ: popover-account
// 01-02-2018: Amedomary
// ---------------------
// ====================
define(['jquery', 'webui-popover'], function ($) {

    function initPopover() {
        $('.js-account-popover').webuiPopover({
            container: $('.b-page-wrapper'),
            animation: 'pop',
            placement: 'auto-bottom',
            closeable: false,
            arrow: false,
            padding: false,
            trigger: 'click',
            onShow: function ($element) {
                var pos = $element.position();
                pos.top += $('.js-this-scroll').scrollTop();
                $element.offset(pos);
            }
        });

        WebuiPopovers.hideAll();


        if (window.innerWidth >= 320 && window.innerWidth < 768) {
            $('.js-account-popover').webuiPopover('destroy');
        }
    }

    if ($('.js-account-popover').length > 0) {

        $(window).resize(function () {
            initPopover();
        });
        initPopover();
    }
});
