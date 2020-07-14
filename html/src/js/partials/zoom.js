
define(['jquery','slick','zoom'], function ($) {
    $(document).ready(function(){

        
        $(document).on('mouseenter mouseover','.js-zoom-img',function() {
            if ($('.js-zoom-img .zoomImg').length) {
                $('.js-zoom-original').hide();
            }

            setTimeout(function () {
                $('.zoomImg').css('opacity',1);
            })
        });

        $(document).on('mouseleave','.js-zoom-img',function() {
            $('.js-zoom-original').show();
        });


        if ($(window).width() >= 767) $('.js-zoom-img').zoom();

        $(document).on('click', '.js-product-slider .slick-slide',function () {
            var $this = $(this);
            var img = $this.find('img').attr('src');
            var imgHeight = $this.find('img').data('height');
            $('.js-zoom-img').trigger('zoom.destroy'); // remove zoom

            $('.js-zoom-img').find('img.js-zoom-original').attr('src',img).show();

            var zoomWidth = $('.js-zoom-img').width - $('.js-product-slider').offset().left - $('.js-product-slider').width();

            if ($('.zoomImg').width() > zoomWidth || imgHeight > $('.js-zoom-img').height()) {
                setTimeout(function () {
                    if ($(window).width() >= 767) $('.js-zoom-img').zoom();
                });
            }

        });

        $(document).on('click', '.js-product-slider-for .b-product-slider__wrapper', function(){
            if ($(window).width() < 767) $('.js-zoom-img img').hide()

            setTimeout(function () {
                $('[data-popup="product"].js-open-popup').click();
            });

        });

        $(document).on('click ', '[data-popup="product"].js-open-popup, .slick-arrow',function () {
            var $this = $('.js-color-link.active');
            // ZOOM
            var id = $this.data('id');

            var baseZoom = $('.zoomImg').width();
            $('.js-zoom-img').trigger('zoom.destroy'); // remove zoom

            $('.js-zoom-img').find('img').attr('src',
                $('.js-product-slider').find('.slick-current img').attr('src')
            ).show();


            var zoomWidth = $('.js-zoom-img').width() - $('.js-product-slider').offset().left - $('.js-product-slider').width();

            if (baseZoom > zoomWidth) {
                setTimeout(function () {
                    if ($(window).width() >= 767) $('.js-zoom-img').zoom();
                },50);
            }
        });

        $('.js-product-slider').on('afterChange',function () {
            if ($(window).width() >= 767) $('.js-zoom-img').zoom();
        });

    });

});