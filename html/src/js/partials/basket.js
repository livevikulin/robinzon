// ====================
// robinzon: permutation popular
// 16.02.2018: Malich
// ---------------------
// пермутейшен популярного
// ====================

define(['jquery'], function ($) {
    var timer;
    $(document).on('change', '#cart-form input:not(#id-promo-code)', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            $('#cart-form').submit();
        },1000);
    });

    var scroll = $('.js-this-scroll');
    $(document).on('click', '.js-promo-code-open', function () {
        var promoForm = $(document).find('.js-promo-code-form');
        promoForm.removeClass('hide');
        var stickyBlock = $(document).find('.js-sticky-block');
        var order = stickyBlock[0];
        var promoBlock = promoForm;
        var orderHeight = (order ? $(order).outerHeight() : 0);
        var promoBlockHeight = (promoBlock ? $(promoBlock).outerHeight() : 0);
        var height = orderHeight + promoBlockHeight;
        scroll.animate({
            scrollTop: height
        }, 1000);
        scroll.trigger('scroll');
    });


    $(document).on('click', '.js-accordion-open', function () {
        var open = $(this);
        var parent = open.closest('.js-accordion');
        var body = parent.find('.js-accordion-body');
        open.toggleClass('active');
        body.slideToggle();
        setTimeout(function () {
            scroll.trigger('scroll');
        }, 500);

    });

    $(document).on('click', '.js-change-city-open', function () {
        var open = $(this);
        var parent = open.closest('.js-change-city');
        var search = parent.find('.js-change-city-search');
        open.toggleClass('hide');
        search.toggleClass('hide');
    });


    $('body').on('updateBasket', function (e) {
        var $data = $(e.json);

        $data.each(function () {
            var $this = $(this);


            $('.js-basket').html(
                $this.find('.js-basket').html()
            );

            $('.b-basket__number').html(
                $this.find('.b-basket__number').html()
            );
            $('#myContent').html(
                $this.find('#myContent').html()
            );
        });

        $('body').trigger('initAdaptiveNews');
    });

    $('body').on('add-product-in-order', function (e) {
        var data = e.json;
        console.log(data.dataSend['id']);
        $('.js-product-in-order[ data-id="'+data.dataSend.id+'"]')
            .replaceWith(
                $('<span>')
                    .addClass('b-product-basket__add')
                    .text('Добавлено')
            );
    });
});

