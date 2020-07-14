// - ====================
// - 4P: brand-slider
// - 24-10-2017: Amedomary
// - --------------------
// - Инициализация слайдера на главной странице
// - ====================

define(['jquery', 'slick'], function ($) {

    if ($('.js-pick-slider').length > 0) {
            var $slick = $('.js-pick-slider');
        var initialisation;
        
        function initSlick() {
            clearTimeout(initialisation);
            initialisation = setTimeout(function () {
                if ($slick.hasClass('slick-initialized')) {
                    $slick.slick('unslick');
                }
                $slick
                    .css({'display':'block'})
                    .slick({
                    prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                    nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                    dotsClass: 'b-slick-dots',
                    autoplay: false,
                    speed: 150,
                    infinite: true,
                    waitForAnimate:false,
                    // Разрешение идёт вниз  -1169px
                    responsive: [
                        {
                            breakpoint: 1023,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                arrows: false,
                                infinity: true,
                            }
                            },{
                                breakpoint: 769,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll:2,
                                    dots: true,
                                    arrows: false,
                                    infinity: true,
                            }
                        }
                    ]
                });
            },150);
        }        

        $(window).resize(function () {
            initSlick();
        });

        $(document).ready(function () {
            initSlick();
        });

    }

    if ($('.js-pick-slider-404').length > 0) {
        if ($('.js-pick-slider-404').prev($('.b-brand-recommend__collection')).length > 0) {

            var $slick = $('.js-pick-slider-404');
            var initialisation;
            
            function initSlick404() {
                initialisation = setTimeout(function () {
                    $slick
                        .css({'display':'block'})
                        .slick({
                        prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        arrows: false,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        dotsClass: 'b-slick-dots',
                        autoplay: false,
                        speed: 1000,
                        // Разрешение идёт вниз  -1169px
                        responsive: [
                            {
                                breakpoint: 1023,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    arrows: false,
                                    swipeToSlide: true,
                                }
                            },{
                                breakpoint: 769,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll:2,
                                    dots: true,
                                    arrows: false,
                                    infinity: true,
                                }
                            }
                        ]
                    });
                },150);
            }
    
        } else {

            var $slick = $('.js-pick-slider-404');
            var initialisation;
            
            function initSlick404() {
                initialisation = setTimeout(function () {
                    $slick
                        .css({'display':'block'})
                        .slick({
                        prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        dots: true,
                        dotsClass: 'b-slick-dots',
                        autoplay: false,
                        speed: 1000,
                        // Разрешение идёт вниз  -1169px
                        responsive: [
                            {
                                breakpoint: 1023,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    arrows: false,
                                }
                            },{
                                breakpoint: 769,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll:2,
                                    dots: true,
                                    arrows: false,
                                    infinity: true,
                                }
                            }
                        ]
                    });
                },150);
            }
    
        }

        $(document).ready(function () {
            initSlick404();
        });
    }


    if ($('.js-pick-slider-store').length > 0) {
        var $slick = $('.js-pick-slider-store');
        var initialisation;
        
        function initSlick404() {
            initialisation = setTimeout(function () {
                $slick.slick({
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    dotsClass: 'b-slick-dots',
                    autoplay: false,
                    speed: 1000,
                    // Разрешение идёт вниз  -1169px
                    responsive: [
                        {
                            breakpoint: 1023,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                arrows: false,
                                swipeToSlide: true,
                            }
                        },{
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll:2,
                                dots: true,
                                arrows: false,
                                infinity: true,
                            }
                        }
                    ]
                });
            },150);
        }

        $(document).ready(function () {
            initSlick404();
        });
    }

    if ($('.js-pick-slider-for-404').length > 0) {
        var $slick = $('.js-pick-slider-for-404');
    var initialisation;
    
    function initSlick() {
        clearTimeout(initialisation);
        initialisation = setTimeout(function () {
            if ($slick.hasClass('slick-initialized')) {
                $slick.slick('unslick');
            }
            $slick
                .css({'display':'block'})
                .slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                arrows: false,
                dotsClass: 'b-slick-dots',
                autoplay: false,
                speed: 1000,
                infinite: true,
                // Разрешение идёт вниз  -1169px
                responsive: [
                    {
                        breakpoint: 1023,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: false,
                            swipeToSlide: true,
                            infinity: true,
                        }
                        },{
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                                dots: true,
                                swipeToSlide: true,
                                arrows: false,
                        }
                    }
                ]
            });
        },150);
    }        

    $(window).resize(function () {
        initSlick();
    });

    $(document).ready(function () {
        initSlick();
    });

    }
});


