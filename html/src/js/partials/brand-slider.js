// - ====================
// - 4P: brand-slider
// - 24-10-2017: Amedomary
// - --------------------
// - Инициализация слайдера на главной странице
// - ====================

define(['jquery', 'slick'], function ($) {

    var $slicks = $('.js-brand-slider');
    var initialisation;

    function initSlick() {
        clearTimeout(initialisation);
        initialisation = setTimeout(function () {
            $slicks.each(function () {
                var $slick = $(this);
                if ($slick.hasClass('slick-initialized')) {
                    $slick.slick('unslick');
                }

                var $slides = $slick.find('a.b-brand');
                var slides = $slides.length;
                var windowWidth = $(window).width();
                //$slides.addClass('show_me');

                //в зависимости от ширины экрана обрезаем слайдер до нужного количества
                if (windowWidth > 768 && slides >5){
                    //$slides.filter(':nth-child(n+'+(parseInt(5*Math.floor(slides/5)))+')').removeClass('show_me');
                } else {

                }

                $slick
                //.css({'display':'block'})
                    .slick({
                        prevArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-prev"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        nextArrow: '<a href="javascript:void(0);" class="b-slider-arrow b-slider-arrow--brand-next"><i class="icon-arrow_small_ico b-icon--arrow-slider"></i></a>',
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        dots: slides>5,
                        dotsClass: 'b-slick-dots',
                        autoplay: false,
                        speed: 300,
                        infinite: false,
                        waitForAnimate:false,
                        // Разрешение идёт вниз  -1169px
                        responsive: [
                            {
                                breakpoint: 1023,
                                settings: {
                                    slidesToShow: 5,
                                    slidesToScroll: 5,
                                    dots: slides>4,
                                }
                            },{
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 5,
                                    slidesToScroll: 5,
                                    dots: slides>2,
                                }
                            },{
                                breakpoint: 767,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    dots: slides>2,
                                    //infinite: true,
                                }
                            }
                        ]
                    });
                setTimeout(function () {
                    //$slick.slick('slickFilter','.show_me')
                });

            });

        },150);
    }

    $(window).resize(function () {
        initSlick();
    });

    $(document).ready(function () {
        initSlick();
    });

    $('body').on('initSlickBrand',function () {
        initSlick();
    });

});

//     var dots = $('.my-slider li');
//     //вешаем обработчик на наши точки
//     dots.click(function(){
//         var $this = $(this);
//         dots.removeClass('before after');
//         //отображаем 2 предыдущие точки
//         $this
//             .prev().addClass('before')
//             .prev().addClass('before');
//         //отображаем 2 следующие точки
//         $this
//             .next().addClass('after')
//             .next().addClass('after');

    
//       //если мы в самом начале - добавляем пару последующих точек
//         if(!$this.prev().length) {
//         $this.next().next().next()
//             .addClass('after').next()
//               .addClass('after');
//     }
//         //на 2й позиции - добавляем одну точку
//       if(!$this.prev().prev().length) {
//         $this.next().next().next()
//           .addClass('after');
//     }
//         //в самом конце - добавляем пару доп. предыдущих точек
//         if(!$this.next().length) {
//             $this.prev().prev().prev()
//                 .addClass('before').prev()
//                 .addClass('before');
//         }
//         //предпоследний элемента - добавляем одну пред. точку
//         if(!$this.next().next().length) {
//             $this.prev().prev().prev()
//                 .addClass('before');
//         }   
//     });
//     dots.eq(0).click();//кликаем на первую точку
// });


