// ====================
// RBZ: popover-size
// 01-02-2018: Amedomary / Петр
// ---------------------
// ====================

// TODO: скрипт скопривроа с карзины, надо почистить. 14.03.2018
define(['jquery', 'webui-popover'], function ($) {

    var sizePopoverInit = function () {
        var paramsSize = {
            container: $('.b-page-wrapper'),
            animation: 'pop',
            placement: 'bottom-right',
            arrow: false,
            padding: false,
            trigger: 'click',
            closeable: true,
            title: '',
            onShow: function ($element) {
                var wWidth = $(window).width();
                var pos = $element.position();
                pos.top += $('.js-this-scroll').scrollTop();
                $element.offset(pos);
                if (wWidth > 767 && wWidth < 1024){
                    $element.css({'width':$('.js-size-popover').innerWidth()})
                }else{
                    $element.css({'width':''})
                }
            }
        };

        $('.js-size-popover').webuiPopover(paramsSize);
        WebuiPopovers.hideAll();
    };

    $('body').on('sizePopoverInit',function () {
        sizePopoverInit();
    });

    $('body').trigger('sizePopoverInit');


    $(document).on('click','.js-size-link', function () {
        var id = $(this).parents('.webui-popover').attr('id');
        $('.js-size-popover[data-target=\'' + id + '\']').text($(this).text());
        $('.js-size-link').removeClass('active');
        $(this).addClass('active');
        WebuiPopovers.hideAll();
    });
});
