// ====================
// Project: product-slider
// 26-01-2017: drtvader
// ---------------------
// Запуск карусели в карточке товара
// ====================
define(['jquery', 'slick', 'zoom'], function ($) {

    function initCarousel() {
        $('.js-product-slider-for.slick-initialized').slick('unslick');

        $('.js-product-slider-for:not(.slick-initialized)').on('init afterChange', function (e, slick, currentSlide) {
            initProductSlider(currentSlide);
            $('.js-product-slider').slick('slickGoTo', currentSlide);
        });

        $('.js-product-slider-for:not(.slick-initialized)').slick({
            arrows: false,
            asNavFor: '.js-product-slider-nav',
            dots: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 300,
            swipe: false,
            infinite: true,
            fade: true,
            cssEase: 'linear',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        dots: $('.js-product-slider-for .b-product-slider__item').length > 1,
                        dotsClass: 'b-slick-dots',
                        fade: false,
                        swipe: true,
                    }
                }
            ]
        });

        let sliderNav = $('.js-product-slider-nav:not(.slick-initialized)');
        const children = sliderNav.children();
        sliderNav
            .css({'display': 'block'})
            .slick({
                dots: false,
                focusOnSelect: true,
                centerMode: true,
                slidesToShow: children && children.length < 4 ? children.length  : 4,
                useTransform: !(children && children.length < 4),
                speed: 300,
                swipe: false,
                prevArrow:
                    '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--product b-slider-arrow--prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></a>',
                nextArrow:
                    '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--product b-slider-arrow--next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></a>',
                // vertical: true,
                vertical: true,
                infinite: true,
                // variableWidth: true,
                asNavFor: '.js-product-slider-for',
                responsive: [
                    {
                        breakpoint: 1440,
                        settings: {
                            vertical: false,
                            slidesToShow: 4,
                        }
                    },

                    {
                        breakpoint: 1024,
                        settings: {
                            vertical: true,
                        }
                    },

                    {
                        breakpoint: 767,
                        settings: {
                            vertical: false,
                            slidesToShow: 4,
                        }
                    }
                ]
            });
    }

    function initProductSlider(currentSlide) {
        $('.js-product-slider.slick-initialized').slick('unslick');

        let sliderProd = $('.js-product-slider');
        const children = sliderProd.children();
        sliderProd.slick({
            arrows: true,
            dots: false,
            slidesToScroll: 1,
            slidesToShow: children && children.length < 4 ? children.length  : 4,
            useTransform: !(children && children.length < 4),
            vertical: true,
            speed: 300,
            //swipe: true,
            focusOnSelect: true,
            centerMode: true,
            infinite: false,
            prevArrow:
                '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--product b-slider-arrow--popup b-slider-arrow--prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></a>',
            nextArrow:
                '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--product b-slider-arrow--popup b-slider-arrow--next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></a>',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        vertical: false,
                        slidesToShow: 1,
                        swipe: true,
                        slidesToScroll: 1,
                        focusOnSelect: false,
                        centerMode: false,
                        useTransform: true
                    }
                }
            ]
        });

        if (currentSlide) {
            sliderProd.slick('slickGoTo', currentSlide);
        }
    }

    if ($('.js-product-slider').length > 0) {
        initProductSlider();
    }

    if ($('.js-product-slider-for').length > 0) {
        initCarousel();
    }

    $('body').on('initCarousel', function () {
        initCarousel();
    });

    $('body').on('initProductSlider', function () {
        initProductSlider();
    });

    $(document).on('click', '.js-color-link', function () {
        var $this = $(this);
        // ZOOM
        //var id = $this.data('id');
        //$('.js-product-slider').slick('slickUnfilter');
        //$('.js-product-slider').slick('slickFilter', '.color-filter-'+id);
    });


});
