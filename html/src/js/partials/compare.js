/**
 * Created by biyk on 11.04.18.
 */


define(['jquery'], function ($) {

    var windowsOS = (navigator.userAgent.toLowerCase().indexOf('windows') !== -1);

    // Проверка на наличие скролаа
    var getScroll = function (scroll, selector) {
        var doc = document;
        var body = doc.body;
        var element = doc.querySelector(selector);
        var client = 'client' + scroll;
        scroll = 'scroll' + scroll;
        return /CSS/.test(doc.compatMode)? (element[client]< element[scroll]) : (body[client]< body[scroll]);
    };

    /**
     * Выявление строк с одинаковыми значениями
     */
    var checkAlick = function () {
        $('.js-compate-row').each(function () {
            var $row = $(this);
            var $cover = $row.parents('.b-compare__row--hover');
            var last = null;
            var empty = 0;
            $cover.attr('data-alike',1);
            // проверяем данне в строчках сравнения

            $row.find('[data-product-id]').each(function () {
                var $cel = $(this);
                var value = $cel.data('value');
                if (value=='') empty++;
                if (last===null) {
                    last = value;
                } else {
                    if (last != value) {
                        $cover.attr('data-alike',0);
                    }
                    last = value;
                }
            });
            if (empty== $row.find('[data-product-id]').length) {
                $cover.remove();
            }
        });
    };

    var moveNext = function () {
        var $last = $('.b-compare__cell--heading:last');
        var width = $last.outerWidth();
        var Wwidth = window.innerWidth || document.body.clientWidth;
        var Rwidth =$('.b-compare__content-row:first .b-compare__cell').length;

        var cels = Math.floor(Wwidth/width);

        var matrix = $('.b-compare__row').css('-webkit-transform').match(/matrix\((.*), (.*), (.*), (.*), (.*), (.*)\)/i);
        var left = Boolean(matrix)? parseInt(matrix[5]):0;
        var lcels = Math.floor(left/width);

        //console.log('next ' + cels+' '+lcels +'('+left+') '+ Rwidth);
        console.log($last.offset().left, width, Wwidth);
        if ($last.offset().left + width <= Wwidth) {
            hideArrows();
            return false;
        }

        //left = Math.floor(left/width)*width;

        $('.b-compare__row').css({'-webkit-transform': 'translate('+Math.round(left-width)+'px)'});
        $('.js-compate-heading').css({'-webkit-transform': 'translate('+Math.round(-left+width)+'px)'});

        setTimeout(hideArrows,500);
    };

    var movePrev = function () {
        var $first = $('.b-compare__cell--heading:first');
        var width = $first.outerWidth();
        var matrix = $('.b-compare__row').css('-webkit-transform').match(/matrix\((.*), (.*), (.*), (.*), (.*), (.*)\)/i);
        var left = Boolean(matrix)? parseInt(matrix[5]):0;
        var lcels = Math.ceil(left/width);

        console.log('prev' + lcels);
        if (lcels >= 0) {
            hideArrows();
            return false;
        }

        left = Math.round(left/width)*width;

        $('.b-compare__row').css({'-webkit-transform': 'translate('+Math.round(left+width)+'px)'});
        $('.js-compate-heading').css({'-webkit-transform': 'translate('+Math.round(-left-width)+'px)'});

        setTimeout(hideArrows,500);
        return;
    };

    var hideArrows = function () {
        var $last = $('.b-compare__cell--heading:last');
        var width = $last.outerWidth();
        var Wwidth = window.innerWidth || document.body.clientWidth;
        var $first = $('.b-compare__cell--heading:first');

        if ($last.length===0) return;

        if ($last.offset().left <= Wwidth-width) {
            $('.js-next-compare').addClass('hide');
        } else {
            $('.js-next-compare').removeClass('hide');
        }

        if ($first.offset().left >= 0) {
            $('.js-prev-compare').addClass('hide');
        } else {
            $('.js-prev-compare').removeClass('hide');
        }

        if ($('.js-next-compare').offset().top < $('.js-compare-full').offset().top){
            $('.js-prev-compare').addClass('hide');
            $('.js-next-compare').addClass('hide');
        }
        if ($('.js-next-compare').offset().top+$('.js-next-compare').height() > $('.js-compare-full').offset().top +$('.js-compare-full').height()){
            $('.js-prev-compare').addClass('hide');
            $('.js-next-compare').addClass('hide');
        }


    };
    hideArrows();

    /**
     * Нужно при удалении товара возвращать скрол на 1 позицию вправо
     */
    var fixLastSlide = function () {
        var Wwidth = window.innerWidth || document.body.clientWidth;
        var $last = $('.b-compare__cell--heading:last');
        var width = $last.outerWidth();
        if ($last.offset().left <= Wwidth-width) {
            movePrev();
        }
    };

    var initAlike = function () {
        if ($('#id-compare-show').is(':checked')) {
            $('[data-alike="1"]').hide();
        } else {
            $('[data-alike="1"]').show();
        }
    }


    /**
     * убрать/показать одинаковые свойства товаров
     */
    $('#id-compare-show').on('click',function () {
        initAlike();
    });

    $('.js-del-compare').on('click',function () {
        var id = $(this).data('productId');
        $('[data-product-id="'+id+'"]').remove();

        checkAlick();
        fixLastSlide();
        initAlike();
    });

    // $('.js-compare-fixed').hide();
    // скролим страницу
    $('.js-this-scroll').scroll(function () {
        var $fixedBar = $('.js-compare-fixed');
        var $staticBar = $('.js-compare-heading');

        var topTabBlock = $staticBar.offset().top;
        var scrollWrapper = $('.js-this-scroll').scrollTop();

        // Появление по нижней полоске
        // если положение скрола больше чем расстояние от начала страницы до обьекта

        if (scrollWrapper + ($fixedBar.outerHeight() - $staticBar.outerHeight() + 2) > topTabBlock + scrollWrapper) {
            $fixedBar.addClass('active');
        } else {
            $fixedBar.removeClass('active');
        }

        hideArrows();
    });


    /**
     * Какая - то магия с классами, хз зачем
     */

    // Проверяем операционную систему на Win и Скролл
    if ((windowsOS) && (getScroll('Height', '.b-page-wrapper'))) {
        $('.js-compare-fixed').addClass('windows-os');
    }


    $('.js-next-compare').on('click',function () {
        moveNext();
    });

    $('.js-prev-compare').on('click',function () {
        movePrev();
    });

    var pageX0,pageX1;
    $('.js-compare-full').on('mousedown touchstart',function (e) {
        if (Boolean(e.touches)){
            pageX0 = e.touches[0].clientX;
        }
    });

    $('.js-compare-full').on('mousemove touchmove',function (e) {
        if (Boolean(e.touches)){
            pageX1 = e.touches[0].clientX;
        }
    });

    $('.js-compare-full').on('mouseup touchend',function (e) {
        var diff = pageX0 - pageX1;

        if (isNaN(diff) || diff ==0) return;
        if (diff >0){
            moveNext();
        }else{
            movePrev();
        }

    });

    checkAlick();

});
