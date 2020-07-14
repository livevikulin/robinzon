/**
 * Created by biyk on 27.03.18.
 * после таргет-клика определяем корневой раздел
 * ставим после него блок для копии
 * TODO переход в крайние положения / работа в крайних положениях
 */
define(['jquery'], function ($) {

    var activeCount = null;
    var lastCount = null;

    /**
     * Получаем рандомный код
     * @returns {string}
     */
    var getRandomCode = function () {
        return Math.random().toString(36).substring(2);
    };

    /**
     * Получаем конец линии кратный 4
     * @param i номер элемента
     * @returns {number}
     */
    var getEOL = function (i) {
        return Math.ceil(i/4)*4;
    };

    /**
     * Удалям пустые блоки после использования
     */
    var removeEmptyList = function () {
        $('.js-product-list-clone').each(function () {
            if ($(this).find('.b-product-item').length === 0 && $(this).find('b-pagination').length===0) {
                $(this).remove();
            }
        });
    };

    /**
     * Создаем копию блока связваем по коду
     * @param $list
     * @returns {string}
     */
    var cloneList = function ($list) {
        var code = getRandomCode();
        if ($list.data('code')) {
            code = $list.data('code');
        }

        if ($list.siblings('.js-product-list-clone').length === 0) {
            $list.attr('data-code',code);
            $list.after('<div ' +
                'data-code="'+code+'" ' +
                'class="b-product-list js-product-list-clone" ' +
                'itemscope="itemscope" ' +
                'itemtype="http://schema.org/Product"></div>');
        }
        return code;
    };

    /**
     * делаем все "как было" - спрятать блок с товаром - склеить листы
     * @returns {boolean}
     */
    var makeSimpleLists = function () {

        var code = $('.js-product-list-clone').data('code');
        var $moreButton = $('.b-catalog__add-more');
        var $pagination = $('.b-pagination');

        $('.js-product-list-clone .b-product-item').each(function () {
            $('.b-product-list:not(.js-product-list-clone)[data-code="'+code+'"]').append($(this));
        });
        $('.js-product-list-clone').remove();


        code = ($moreButton.data('code'));
        $('.b-product-list[data-code="'+code+'"]').parent().append($('.b-catalog__add-more'));
        code = ($pagination.data('code'));
        $('.b-product-list[data-code="'+code+'"]').parent().append($('.b-pagination'));

        return true;
    };

    /**
     * "Привязываем" стрелку к товару
     */
    var pinArrow = function () {
        var timeout = 0;
        if ($('.js-preview').length===0) {
            timeout = 10;
        }
        setTimeout(function () {
            var count = $('.js-preview').data('count');
            var width = $('.js-preview').width();
            var i = count % 4;
            if (i ===0) {
                i = 4;
            }
            $('.js-preview-arrow').css('left',i*width-width/2-20);
            getNPSlideId();
        },timeout);

    };

    /**
     * Делаем активным элемент - отображаем превью
     * @param id
     */
    var activateProductById = function (id) {

        // делаем все "как было" - спрятать блок с товаром - склеить листы
        // var ms = makeSimpleLists();
        var $active = $('.b-product-item[data-id="'+id+'"]');
        activeCount = $active.data('count');

        if ($('.js-hidden-slid .b-hidden-slider__wrapper-animation.active').length==0){
            return setTimeout(function () {
                activateProductById(id);
            },200);
        }

        // информация о продукте
        var $product = $('.b-product-item[data-id="'+id+'"]');
        var icount = $product.data('count');

        // информация о соседях
        var $list = $product.parents('.b-product-list');
        var $items = $list.find('.b-product-item');

        // создаем блок "разреза"
        var code = cloneList($list);
        var $block = $product.parents('.b-container');
        var $moreButton = $block.find('.b-catalog__add-more').attr('data-code',code);
        var $pagination = $block.find('.b-pagination').attr('data-code',code);

        var previewTop = $('.js-this-scroll').scrollTop();
        var clientTop = $('.js-hidden-slid')[0].getBoundingClientRect().top;
        var newClientTop = null;

        var eOL = getEOL(icount);

        lastCount = ($('.js-preview').length)?$('.js-preview').data('count'):null;

        if (Boolean(id)===false) {
            return;
        }

        $('.b-product-item').removeClass('js-preview');
        $product.addClass('js-preview');

        // перемещение блока
        $('.b-product-item[data-count="'+eOL+'"]').after($('.b-hidden-slider.js-hidden-slid'));

        // fix блока
        newClientTop = $('.js-hidden-slid')[0].getBoundingClientRect().top;
        previewTop = $('.js-this-scroll').scrollTop();

        // скролл вправо падение с линии

        if ((lastCount % 2 ===0 && activeCount===lastCount+1) || (activeCount % 2 ===0 && activeCount===lastCount-1)) {
            $('.js-this-scroll').scrollTop(previewTop+newClientTop-clientTop);
        }
        else{
            var clientHeight  = Math.max(($(window).height()-$('.js-hidden-slid').height())/2,0);
            $('.js-this-scroll').scrollTop(previewTop+newClientTop-clientHeight);
        }

        //TODO подгружаем информацию по соседним товарам
        $('.b-product-item[data-count="'+(activeCount+1)+'"],.b-product-item[data-count="'+(activeCount-1)+'"]').each(function () {
            var $this = $(this);
            var url = $this.find('.js-qick-view.js-ajax-link').data('url');
            var id = $this.data('id');
            
            $('body').append($('<a>').attr({
                'class':'js-ajax-link remove_me',
                'data-url':url,
                'data-id':id
            }));

            $('.remove_me').click();
            setTimeout(function () {
                $('.remove_me').remove();
            })
        });


        return true;
    };

    /**
     * Центрируем превью товара по высоте
     */
    var fixPreview = function (oldTop) {
        var previewTop = $('.js-hidden-slid')[0].getBoundingClientRect().top;

        var top = $('.js-hidden-slid').offset().top;
        var scrollTop = $('.js-this-scroll').scrollTop();

        $('.js-this-scroll').animate({
            scrollTop: scrollTop+top
        }, 1);
    };

    var getNext = function (way) {
        var count = $('.js-preview').data('count');
        var total = $('.b-product-item').length;
        var id = $('[data-count="'+count+'"]').data('id');

        if (count<1 || count>total) {
            return false;
        }

        // пропуск нетоваров - получение id
        if (way) {
            count++;
            for (i=count; i<=total; i++) {
                id = $('[data-count="'+i+'"]').data('id');
                if (Boolean(id)) {
                    return id;
                }
            }
        } else {
            count--;
            for (i=count; i>=0; i--) {
                id = $('[data-count="'+i+'"]').data('id');
                if (Boolean(id)) {
                    return id;
                }
            }
        }
    };

    var animateNext = function (html) {
        $('.js-hidden-slider')
            .append(html)
            .find('.b-product-top--hidden-slider')
            .css('position','relative')
            .animate({
                'left': '-=100%'
            },500,function () {
                $('.js-hidden-slider .b-product-top--hidden-slider:not(:last)').remove();
                $('.js-hidden-slider .b-product-top--hidden-slider').css('left','');
            });
        pinArrow();
    };

    var animatePrev = function (html) {
        $('.js-hidden-slider')
            .prepend(html)
            .find('.b-product-top--hidden-slider')
            .css({
                'position': 'relative',
                'left': '-100%'
            })
            .animate({
                'left': '+=100%'
            },500,function () {
                $('.js-hidden-slider .b-product-top--hidden-slider:not(:first)').remove();
                $('.js-hidden-slider .b-product-top--hidden-slider').css('left','');
            });
        pinArrow();
    };

    /**
     * Получаем номера следующего/предыдущего слайдера
     */
    var getNPSlideId = function () {
        var count = $('.js-preview').data('count');
        var $prev = false;
        var $next = false;

        //region cnt_elements - количесво блоков с товарами
        var cnt_elements = 0;
        $( ".b-product-item" ).each(function() {
            cnt_elements++;
        });
        //endregion

        //region $next - ссылка на следующий блок ( пропускаем блоки с классами b-product-item--image flag-banner )
        for( var i = count+1; i <= cnt_elements; i++ ) {
            var selector_next = '[data-count="'+i+'"]';
            if (!$(selector_next).hasClass('b-product-item--image') && !$(selector_next).hasClass('flag-banner')) {
                $next = $('[data-count="'+i+'"]');
                break;
            }
        }
        //endregion

        //region $prev - ссылка на предыдущий блок ( пропускаем блоки с классами b-product-item--image flag-banner )
        for( var g = count-1; g >= 0; g-- ) {
            var selector_prev = '[data-count="'+g+'"]';
            if (!$(selector_prev).hasClass('b-product-item--image') && !$(selector_prev).hasClass('flag-banner')) {
                $prev = $('[data-count="'+g+'"]');
                break;
            }
        }
        //endregion

        $('.js-preview-prev,.js-preview-next').show();
        
        if ($prev.length) {
            $('.prev.slick-arrow').data('id',$prev.data('id'));
        } else {
            $('.prev.slick-arrow').data('id',false);
            $('.js-preview-prev').hide();
        }

        if ($next.length) {
            $('.next.slick-arrow').data('id',$next.data('id'));
        } else {
            $('.next.slick-arrow').data('id',false);
            $('.js-preview-next').hide();
        }

        console.log('--------------------');
    };

    /**
     * Клик на "Быстрый просмотр"
     */
    $(document).on('click','.js-qick-view',function () {
        var id = $(this).data('id');
        var $product = $('.b-product-item[data-id="'+id+'"]');
        activeCount = $(this).parents('[data-count]').data('count');

        $('.b-product-item').removeClass('js-preview');
        $product.addClass('js-preview');
        activateProductById(id);
    });

    /**
     * Клик - закрыть превью
     */
    $(document).on('click','.js-close-preview',function () {
        var $active = $('.js-preview');
        makeSimpleLists();
        $('.b-hidden-slider__wrapper-animation').removeClass('active');

        // прокрутить старницу до элемента
        $active[0].scrollIntoView()
    });


    $('body').on('getNext',function (e) {
        var json = e.json;
        var id = getNext(true);

        if (json.success && id) {
            activateProductById(id);
            if (Boolean(json.data) && Boolean(json.data.html)) {
                animateNext(json.data.html);
            }
        }
    });

    $('body').on('getPrev',function (e) {
        var json = e.json;
        var id = getNext(false);

        if (json.success && id) {
            activateProductById(id);

            if (Boolean(json.data) && Boolean(json.data.html)) {
                animatePrev(json.data.html);
            }
        }
    });

    /**
     * Событие открыть превью
     */
    $('body').on('open-preview',function (e) {
        var json = e.json;
        var $sliderBlok =$('.b-hidden-slider__wrapper-animation');
        //debugger; //TODO
        $('body').trigger('initPopover');
        $(window).trigger('resize');

        // если блок превью еще не открыт
        if (!$sliderBlok.hasClass('active') && Boolean(json.data) && Boolean(json.data.html)) {
            $sliderBlok.addClass('active');
            $('.js-hidden-slider').html(json.data.html);
            $('body').trigger('initHiddenCarousel');
        } else if (Boolean(json.data) && Boolean(json.data.html)) {
            if (lastCount >= activeCount) {
                animateNext(json.data.html);
            }
            if (lastCount < activeCount) {
                animatePrev(json.data.html);
            }
        }
        pinArrow();
    });

    /**
     * Устанавливаем номера для товаров
     */
    $('.b-product-list .b-product-item').each(function (i) {
        $(this).attr('data-count',i+1);
    });
    $('.js-hidden-slider').css({
        'overflow': 'hidden',
        'display': 'flex'
    });

    $(window).resize(function () {
        pinArrow();
    });

    /* scrolling into view after all perversions */
    $(document).on('click', '.js-qick-view', function() {
        var $boxxx = $('.js-hidden-slid');
        setTimeout(function () {
             $($boxxx)[0].scrollIntoView(false);
         }, 1000);
    });

});

// $(function() {
//     $(document).on('click', '.js-qick-view', function() {
//         var $button = $('.b-hidden-slider');
//         $button.removeClass('active-prev').addClass('active-prev').attr('active-prev', 'active-prev');
//         setTimeout(function () {
//             $button.removeClass('active-prev').addClass('active-prev').removeAttr('active-prev');
//         }, 1000);
//     });
// });
