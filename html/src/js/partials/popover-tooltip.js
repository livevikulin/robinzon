// ====================
// RBZ: popover-tooltip
// 01-02-2018: drtvader
// ---------------------
// ====================
define(['jquery', 'webui-popover'], function ($) {

    function initPopover() {
        if ($('.js-tooltip').length > 0) {
            $('.js-tooltip:not([data-target])').webuiPopover({
                container: $('.b-page-wrapper'),
                animation: 'pop',
                placement: 'vertical',
                closeable: true,
                arrow: true,
                padding: false,
                // content: function () {
                //     return $('.b-popup[data-popup="reservation"]')[0].innerHTML;
                // } ,
                onShow: function ($element) {
                    $('.js-tooltip[data-target="' + $element.attr('id') + '"]').parent('li').addClass('active');
                    var pos = $element.position();
                    var id = $element.attr('id');
                    var offset = -10;

                    pos.top += $('.js-this-scroll').scrollTop();
                    $element.offset(pos);

                    setTimeout(function () {

                        if ($('[data-target="'+id+'"]').offset().top - $('#'+id+'').offset().top < 0){
                            offset = 10;
                        }
                        pos.top += offset;
                        $element.offset(pos);
                    });
                },
                onHide: function ($element) {
                    $('.js-tooltip').parent().removeClass('active');
                }
            });

            if ($('.js-tooltip:not([data-target])').length) {
                WebuiPopovers.hideAll();

                if (window.innerWidth >= 320 && window.innerWidth < 768) {
                    $('.js-tooltip').webuiPopover('destroy');
                }
            }
        }
    }
    
    $(window).resize(function () {
        initPopover();
    });
    initPopover();
    $('body').on('initPopover',function () {
        initPopover();
    });
    $('body').on('click',function (e) {
        if ($(e.target).hasClass('close')) return;
        $('.webui-popover-inner .close:visible').click();
    });

});
