// ====================
// 4P: popover-fiter
// 31-10-2017: Amed \ Петр
// ---------------------
// ====================

define(['jquery', 'webui-popover', './is-mobile'], function ($) {
    var $popover = $('.js-menu-in-popup-link');
    if ($popover.length === 0) {
        return;
    }

    function initPopover() {
        $popover.webuiPopover({
            container: $('.js-smartfilter'),
            animation: 'pop',
            placement: 'auto-bottom',
            closeable: true,
            arrow: false,
            padding: false,
            onShow: function ($element) {
                $('.js-popover[data-target=\'' + $element.attr('id') + '\']')
                    .parent('li')
                    .addClass('active');

                var pos = $element.position();
                pos.top += $('.js-this-scroll').scrollTop();
                //$element.offset(pos);
            },
            onHide: function () {
                $popover.parent('li').removeClass('active');
            }
        });
        $('body').trigger('initPopover');
    }
    initPopover();
    onResize();
    $(window).resize(onResize);

    var $mainList = $('.js-menu-in-popup-main');
    var $closeFilter = $('.js-close-filter-mobile');
    $('.js-menu-in-popup-back').on('click', function () {
        // Amedomary
        $('.js-menu-in-popup-link').removeClass('active');
        $mainList.removeClass('active');
        $mainList.addClass('close');

        $('.js-menu-in-popup-submenu').removeClass('active');
        $(this).removeClass('active');
    });

    // кнопка закрытия попАпа и фильтров
    $closeFilter.on('click', function () {
        $mainList.removeClass('close');
    });

    function altAction() {
        // alert('What are you doing?');
        $(this).addClass('active');
        $mainList.addClass('active');
        $mainList.removeClass('close');

        $('.js-menu-in-popup-submenu[data-submenu-id="' + $(this).data('submenu') + '"]').addClass('active');
        $('.js-menu-in-popup-back').addClass('active');
    }

    function onResize() {
        WebuiPopovers.hideAll();
        var desktop = window.innerWidth >= 768;
        if (desktop) {
            $('.b-popup[data-popup="filter-mobile"]').removeClass('open');
        }
        $popover
            .off('click touchend')
            .on('click',
                (desktop) ? showPopUp : altAction
            );
        backContentMobile();
    }

    function backContentMobile() {

        // Вычисляем ссылки у "js-menu-in-popup-link" по "data-target"
        var $links = $('.js-menu-in-popup-link').filter(function () {
            if ($(this).attr('data-target') != undefined) {
                return $(this);
            }
        });

        if ($links.length) {
            $links.each(function () {
                var $link = $(this);
                var $pop = $('.webui-popover[id=\'' + $link.attr('data-target') + '\']');
                var $content;

                if (window.innerWidth >= 768) {
                    $content = $link.parent().find('.js-menu-in-popup-submenu');

                    if ($pop.find($content).length == 0) {
                        $pop.find('.webui-popover-content').append($content);
                    }

                } else if (window.innerWidth < 768) {
                    $content = $pop.find('.js-menu-in-popup-submenu');

                    if ($link.find($content).length == 0) {
                        $link.parent().append($content);
                    }
                }
            });
        }
    }

    function showPopUp(e) {
        e.stopPropagation();
        $(this).webuiPopover('show');
    }
});
