define(['jquery', 'slick'], function ($) {
    
        var initialisation;

        function initSlick() {
            var $slicks = $('.js-accessorize-slider');
            var width = window.innerWidth || document.body.clientWidth;

            clearTimeout(initialisation);
            initialisation = setTimeout(function () {
                $slicks.each(function () {
                    var $slick = $(this);
                    if ($slick.hasClass('slick-initialized')) {
                        $slick.slick('unslick');
                    }
                    if (width >= 1024) {
                        $slick.slick({
                            prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--similar-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                            nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--similar-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                            slidesToShow: 6,
                            slidesToScroll: 6,
                            dots: $slick.find('li').length > 6,
                            dotsClass: 'b-slick-dots',
                            autoplay: false,
                            speed: 1000,
                            infinite: false,

                            // Разрешение идёт вниз не включая  x < 1170px
                            responsive: [
                                {
                                    breakpoint: 1170,
                                    settings: {
                                        slidesToShow: 5,
                                        slidesToScroll: 5,
                                        dots: false,
                                        arrows: false,
                                    }
                                }
                            ]
                        });
                    }
                });


            }, 1000);

        }

        $(window).resize(function () {
            initSlick();
        });

        $(document).ready(function () {
            initSlick();
        });

        $('body').on('initSlick',function () {
            initSlick();
        });
});


