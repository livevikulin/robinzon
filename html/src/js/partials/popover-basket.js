// ====================
// RBZ: popover-basket
// 01-02-2018: Amedomary / Петр
// ---------------------
// ====================
define(['jquery', 'webui-popover'], function ($) {
    var $popUpWindowSelector;

    var params = {
        container: $('.b-page-wrapper'),
        animation: 'pop',
        placement: 'auto',
        closeable: false,
        arrow: false,
        padding: false,
        trigger: false,
        onShow: function ($element) {
            var pos = $element.position();
            if (window.innerWidth < 1024) {
                $element.hide();
                return;
            }
            $popUpWindowSelector = $element;
            pos.top += $('.js-this-scroll').scrollTop();
            $element.offset(pos);

            $wrapper.on('click.basket',function () {
                WebuiPopovers.hideAll();
                $wrapper.off('click.basket');
            });
        }
    };

    var basketSelector = '.js-basket-popover';
    var popUpWindowSelector = '#webuiPopover1';
    var altAction = function () {
        //location.href = '/cart-step1.html';
    };
    var $basket = $('.js-basket-popover');
    var $wrapper = params.container;

    $basket.webuiPopover(params);


    $('body').on('basket_popover_init',function () {
        var $basket = $('.js-basket-popover');
        $basket.webuiPopover(params);
    });

    $('body').on('basket_popover', function (event) {
        var data = event.json.data;
        var $html = $(data.baskethtml);
        var $cart = $html.find('.js-basket-popover');
        var content = $html.find('#myContent')[0].outerHTML;

        WebuiPopovers.updateContent('.js-basket-popover',content);


        if  ($cart.hasClass('unactive')) {
            $('.js-basket-popover').addClass('unactive');
        }else{
            $('.js-basket-popover').removeClass('unactive');
        }

        $('.js-basket-popover').html($cart[0].outerHTML);
        
        
    });

    // перенастройка под разную ширину
    function onResize() {
        WebuiPopovers.hideAll();
        $basket
            .off('touchend click')
            .on('touchend click',
                (window.innerWidth >= 1024) ? showPopUp : altAction
            );
    }
    onResize();
    $(window).resize(onResize);
    $wrapper.on('click', closePopUp);

    // открывает попАп и задает обработчик
    function showPopUp(e) {
        e.stopPropagation();
        $basket.webuiPopover('show');
    }
    function closePopUp(e) {
        if ($(e.target).closest($popUpWindowSelector).length === 0) {
            // Нужно переделать
            // WebuiPopovers.hideAll(); убрал эту ересь. т.к. мешает во множетве других мест
        }
    }
});
