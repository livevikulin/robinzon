
define(['jquery', 'webui-popover'], function ($) {

    /**
     * @class  js-mobile-event для определения нажатия на ссылку в списке мобильного отображения карты
     */
    /* eslint-disable max-len */
    var placemarks = [];
    var myMap;
    var clusterer;

    /**
     * Если не соотвестует фильтру - скрываем
     * @param search
     * @constructor
     */
    var filterSearch = function () {
        var search = $('#stores-search').val().toLowerCase();
        var $partTitle = $('.js-availability-content .b-tab-delivery__addition-header');

        // изначальн мы видим все элементы
        $('.js-shop-link').show();
        $partTitle.show();

        // производим поиск соответсвия строке поиска
        $('.js-shop-link .b-delivery-list__col--addr').each(function (i, tags) {
            var parent = $(tags).parents('.js-shop-link');
            var text = $(this).text().toLowerCase();
            if (text.indexOf(search) === -1) {
                parent.hide();
            }
        });

        // производим фильтрацию по наличию заказа
        if ($('[name="stores-sort-avlbl"]').is(':checked')) {
            $('.js-delivery-part-list .js-shop-link').hide();
        }

        // производим фильтрацию по времени работы
        if ($('[name="stores-sort-time"]').is(':checked')) {
            $('.js-shop-link .b-delivery-list__col--time').each(function (i, tags) {
                var parent = $(tags).parents('.js-shop-link');
                var text = $(this).text().toLowerCase();
                if (text.indexOf('круглосуточно') === -1) {
                    parent.hide();
                }
            });
        }

        // если в части неполных заказов пусто скрываем заголовк
        if ($('.js-delivery-part-list .js-shop-link:visible').length === 0) {
            $partTitle.hide();
        } else {
            $partTitle.show();
        }
    };

    /**
     * Создание li-элементов из массива
     * @param data
     * @returns {string}
     */
    var makeLiParts = function (data) {
        var result = '';
        data.forEach(function (e) {
            result += '<li>' + e.name + '</li>';
        });
        return result;
    };

    /**
     * Создание li-элементов для Чека из массива
     * @param data
     * @returns {string}
     */
    var makeLiPartsEx = function (data) {
        var result = '';
        data.forEach(function (e) {
            var sht = (e.quantity)?' ('+e.quantity+' шт)':'';
            result += '<li class="b-order-list__item b-order-list__item--aside">'+
                '<div class="b-order-list__order-text b-order-list__order-text--aside">'+
                '<div class="b-order-list__clipped-text">'+
                '<div class="b-order-list__text-backed">'+e.name+sht+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="b-order-list__order-value b-order-list__order-value--aside">'+(e.price*e.quantity).toFixed(2)+' ₽'+
                '</div>'+
                '</li>';
        });
        return result;
    };

    var calcWeight = function (data) {
        var result = 0;
        data.forEach(function (e) {
            result += e.weight;
        });
        return result/1000;
    };

    var calcCount = function (data) {
        var result = 0;
        data.forEach(function (e) {
            result += e.quantity;
        });
        return result;
    };

    var fillShopData = function (data,force) {

        $('.js-my-pickup').text('Забрать '+data.pickup);
        $('.js-pickup-tab-mobile').text(data.pickup_short_full+', 0 ₽');
        if (window.innerWidth < 768) {
            $('.js-my-pickup.js-pickup-time').text('Забрать '+data.pickup_short_full);
        }

        $('.js-pickup_full').text(data.pickup_full);

        // aдрес
        $('.js-myself-shop span.b-delivery-list__link--myself').text(data.adress);
        // расписание
        $('.js-myself-shop div.b-input-line__text-line--myself').text(data.schedule);
        // стоимость имеющихся товаров
        $('.js-myself-shop div.b-order-list__order-value--myself.js-parts-price').text(data.price+' ₽');
        // полная стоимость
        $('.js-myself-shop div.b-order-list__order-value--myself.js-full-price').text(data.full_price+' ₽');

        // отображение/сокрытие блока товаров которых есть в наличии хоть что-то
        if (Boolean(data.parts_delayed_html) && data.parts_delayed_html.length) {
            $('#order-pick-time-then').parent().show();
            $('.js-list-orders-cont .js-excluded-parts').show();
            $('.js-myself-shop .js-delay-items').html(data.parts_delayed_html);
        } else {
            $('#order-pick-time-then').parent().hide();
            $('.js-list-orders-cont .js-excluded-parts').hide();
        }

        // отображение/сокрытие блока 'в наличии/частично' если
        if (Boolean(data.parts_available) && data.parts_available.length===0) {
            $('#order-pick-time-then').prop('checked',true);
            $('#order-pick-time-now').parent().hide();
        } else {
            $('#order-pick-time-now').prop('checked',true);
            $('#order-pick-time-now').parent().show();
        }

        $('.js-excluded-parts-text').show();
        // изменение текста о полноте заказа
        if (data.order==='parts') {
            $('.js-parts-info').text('Заказ в наличии частично');
        }
        if (data.order==='delay') {
            $('.js-parts-info').text('Требуется ждать поставки со склада');
        }
        if (data.order==='full') {
            $('.js-parts-info').text('Заказ доступен в полном составе');
            $('.js-excluded-parts-text').hide();
        }

        // заполнение информации в чеке
        setCheckList(data);
        $('[name="order-pick-time"]').trigger('change');
    };

    /**
     * пересчет стоимости заказа исходя из полученных данных
     * @param data
     */
    function calcPrice(data) {
        var full = parseInt(calcPartsSumm(data.parts_available));
        var delivery = parseInt($('.js-delivery:checked').data('delivery'));
        var total = full+delivery;

        $('input[data-check="js-list-orders-cont"]').data('full',full);

        $('.js-price-full').text(full +' ₽');
        $('.js-price-deliv').text(delivery +' ₽');
        $('.js-price-total').text(total +' ₽');
    }

    function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }

    function strReplace(search, replace, subject) {
        return subject.split(search).join(replace);
    }

    function setCheckList(data) {

        var parts_available = makeLiPartsEx(data.parts_available);
        var parts_delayed = makeLiPartsEx(data.parts_delayed);

        var available_weight = calcWeight(data.parts_available);
        var delayed_weight = calcWeight(data.parts_delayed);

        var available_count = calcCount(data.parts_available);
        var delayed_count = calcCount(data.parts_delayed);

        var fill_title = '<span class="js-mobile-title-order">Заказ: '+available_count+' '+declOfNum(available_count,['товар','товара','товаров'])+'</span> ('+available_weight+' кг) на сумму '+calcPartsSumm(data.parts_available)+' ₽'; // eslint-disable-line max-len
        var part_title = '<span class="js-mobile-title-order">Останется в корзине: '+delayed_count+'</span> '+declOfNum(available_count,['товар','товара','товаров'])+' ('+delayed_weight+' кг) на сумму '+calcPartsSumm(data.parts_delayed)+' ₽'; // eslint-disable-line max-len

        $('.js-parts-list-title, .js-parts-list, .js-full-list-title, .js-full-list,.js-list-orders-cont .js-back-to-basket').show(); // eslint-disable-line max-len

        $('.js-list-orders-cont .js-parts-list').html(parts_delayed);
        $('.js-list-orders-cont .js-full-list').html(parts_available);
        $('.js-list-orders-cont .js-full-list-title').html(fill_title);
        $('.js-list-orders-cont .js-parts-list-title').html(part_title);

        if (data.order==='full' || data.order==='delay') {
            $('.js-list-orders-cont .js-parts-list-title,.js-list-orders-cont .js-parts-list,.js-list-orders-cont .js-back-to-basket').hide();
        }


        if (data.order==='delay') {
            part_title = '<span class="js-mobile-title-order">Заказ: '+delayed_count+' '+declOfNum(delayed_count,['товар','товара','товаров'])+'</span> ('+delayed_weight+' кг) на сумму '+calcPartsSumm(data.parts_delayed)+' ₽';
            $('.js-list-orders-cont .js-full-list').html(parts_delayed);
            $('.js-list-orders-cont .js-full-list-title').html(part_title);
        }

        $(window).trigger('resize');

        calcPrice(data);
    }

    function calcPartsSumm(parts) {
        var result = 0;
        parts.forEach(function (e) {
            result +=e.price*e.quantity;
        });
        return result.toFixed(2);
    }

    function initOrderMaps() {
        var data = '';
        var url = $('#map').data('url');

        var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<ul class="b-delivery-list b-delivery-list--order js-open-info" data-shop-id="{{properties.shop_id}}">' +
            '<li class="b-delivery-list__item">' +
            '<span class="b-delivery-list__link" >' +
            '<span class="b-delivery-list__col b-delivery-list__col--addr">' +
            '<span class="b-delivery-list__col b-delivery-list__col--color b-delivery-list__col{{properties.color}}"></span> {{properties.addr}}</span>' +
            '<span class="b-delivery-list__col b-delivery-list__col--all">' +
            '<span class="b-delivery-list__col b-delivery-list__col--time">{{properties.time}}</span> ' +
            '<span class="b-delivery-list__col b-delivery-list__col--amount">' +
            '<span class="b-delivery-list__col b-delivery-list__col--self-picked">' +
            ' {{properties.pickup}}</span>' +
            '</span>' +
            '</span>' +
            '</li></ul>');

        var make_html4shop_order = function (shop) {

            // НЕ ТРОГАЙ, Если не знаешь, как это работает! Нужна ВСЯ li-шка, а не только ее содержимое
            var full_template = $('.js-delivery-list li:first')[0].outerHTML;
            var part_template = $('.js-delivery-part-list li:first')[0].outerHTML;
            var delay_template = $('.js-delivery-delay-list li:first')[0].outerHTML;

            var full_html = '';
            var part_html = '';
            var delay_html = '';
            var item;

            for (key in shop) {
                item = shop[key];
                if (item.order === 'full') {
                    var template = full_template;
                    for (prop in item) {
                        template = strReplace('{{' + prop + '}}', item[prop], template);
                    }

                    full_html += template;
                }
                if (item.order === 'parts') {
                    var template = part_template;
                    for (var prop in item) {

                        if (prop === 'parts_delayed') {
                            item['parts_delayed_html'] = makeLiParts(item[prop]);
                            template = strReplace('{{parts_delayed_html}}', item['parts_delayed_html'], template);
                        }

                        template = strReplace('{{' + prop + '}}', item[prop], template);
                    }

                    part_html += template;
                }
                if (item.order === 'delay') {
                    var template = delay_template;
                    for (var prop in item) {

                        if (prop === 'parts_delayed') {
                            item['parts_delayed_html'] = makeLiParts(item[prop]);
                            template = strReplace('{{parts_delayed_html}}', item['parts_delayed_html'], template);
                        }
                        template = strReplace('{{' + prop + '}}', item[prop], template);
                    }
                    delay_html += template;
                }
            }

            $('.js-delivery-list').html(full_html);

            $('.js-delivery-part-list').html(part_html);
            if (part_html==='') {
                $('.js-header-part-list').hide();
            }

            $('.js-delivery-delay-list').html(delay_html);
            if (delay_html==='') {
                $('.js-header-delay-list').hide();
            }

            $('.js-orders-shop-count').html('(всего '+shop.length+')');
            $('.js-content-list').show();

            // fillShopData(shop[0],1);
        };

        myMap = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 10,
            controls: [],// Отключение ползунка зума по умолчанию
            behaviors: ['drag', 'scrollZoom']
        });

        myMap.myplacemarks = [];
        $('body').trigger({
            type: 'drow-map',
            sort: 'sort-asc',
            url: url,
            data: data,
            myMap: myMap,// объект карты
            BalloonContentLayout: BalloonContentLayout,// шаблон балуна
            balloonOffset: [-80, -12],
            make_html4shop: make_html4shop_order // html для списка магазинов
        });
        if (!ps) {
            ps = new PerfectScrollbar('.js-map-list-scroll', {suppressScrollX: true});
        }

    }

    if ($('.b-tab-delivery-map--order').length > 0) {

        $('.js-content-list').hide();

        ymaps.ready(initOrderMaps);

        $(document).on('click','.js-open-info',function () {
            var shopid = $(this).data('shopId');
            $('body').trigger({
                type: 'setActiveShop',
                shopid: shopid
            });
        });

        $(document).on('click', '.js-shop-link-close', function () {

            $('.js-shop-link').removeClass('active');
            placemarks.map(function (e, i) {
                e.balloon.close();
            });

        });

        $(document).on('click', '.js-close-order-baloon', function () {

            $('.js-shop-link').removeClass('active');

            $('.js-map-list-scroll').removeAttr('style');
            placemarks.map(function (e, i) {
                e.balloon.close();
            });

        });

        $(document).on('click', '.js-shop-link', function () {

            var shopId = $(this).data('shop-id');
            var coords = myMap.myplacemarks[shopId].geometry.getCoordinates();

            $('.js-shop-link').removeClass('active');

            if (!$(this).hasClass('active')) {
                $(this).toggleClass('active');
            }

            /**
             * активируем PerfectScroll
             */
            if ($('#scroll-'+shopId).length) {
                new PerfectScrollbar('#scroll-'+shopId);
            }


            if ($(this).parent('.b-delivery-list__item').length && window.innerWidth <=767 && $(this).data('shopId')) {
                $('#map').addClass('js-mobile-event');
            }

            // открываем карту
            $('.js-product-map').click();

            // КОСТЫЛЬ!
            $('.js-map-list-scroll').css('overflow', 'visible');

            // if (ps) ps.disable();

            myMap.setZoom(15);

            myMap.panTo([parseFloat(coords[0]), parseFloat(coords[1])]).then(function () {
                myMap.container.fitToViewport();
                // myMap.myplacemarks[shop_id].balloon.open();
            });

        });

        $(document).on('click', '.js-load-shops', function () {
            var url = $('#map').data('url');

            $.ajax({
                url: url,
                // url: '/ajax/shops.php?sortby=' + sort,
                method: 'GET',
                dataType: 'json',
                success: function (json) {
                    if (json['shops'].length > 0) {

                        addBaloons(json['shops']);
                    }
                }
            });
        });

        $(document).on('click','.js-product-list',function () {
            $('.js-map-list-scroll').css('overflow','');
            $('#map').removeClass('js-mobile-event');
        });

        $(document).on('change','.js-delivery',function () {
            var check = $(this).data('check');
            $('.b-order__list:not(.'+check+')').hide();
            $('.'+check).show();
        });

        /**
         * Поиск магазинов
         */
        $('#stores-search, #stores-sort-1, #stores-sort-2').on('keyup change', function () {
            filterSearch();
        });

        $(document).on('click', '.js-shop-myself', function () {
            var shopId = $(this).data('shopid');
            var data = myMap.myplacemarks[shopId].options.get('shop');
            $('#order-step [name="shopId"]').val(shopId);

            fillShopData(data);
            $('.js-close-popup').click();
        });

        $('.js-product-map').bind('click', function (event, ui) {
            myMap.container.fitToViewport();
            myMap.balloon.close();
        });

        /**
         * Пересчет стоимости доставки
         */
        $('#order-delivery-address, #order-delivery-pick-up').on('change',function () {
            var full = $(this).data('full');
            var delivery = parseInt($('.js-delivery:checked').data('delivery'));
            var total = full+delivery;

            $('.js-price-full').text(full +' ₽');
            $('.js-price-deliv').text(delivery +' ₽');
            $('.js-price-total').text(total +' ₽');
            $('[name="order-pick-time"]').trigger('change');
        });

        /**
         * Пересчет стоимости покупки
         */
        $('[name="order-pick-time"]').on('change',function () {

            var pickupTime = $('[name="order-pick-time"]:checked')
                .siblings('.js-price-block')
                .find('.js-pickup-time')
                .text();

            var fullText = $('[name="order-pick-time"]:checked')
                .siblings('.js-price-block')
                .find('.b-order-list__order-value--myself')
                .text();

            var delivery = parseInt($('.js-delivery:checked').data('delivery'));
            var full = parseInt(strReplace(' ','',fullText));
            var total = full+delivery;

            if (pickupTime==='') {
                pickupTime = $('[name="order-pick-time"]:checked')
                    .siblings('.b-radio__addition-text')
                    .find('.js-pickup-time')
                    .text();
            }
            pickupTime+=', бесплатно';
            $('.js-my-pickup.js-pickup-tab').text(strReplace('Забрать ','',pickupTime));

            $('.js-price-full').text(full +' ₽');
            $('.js-price-deliv').text(delivery +' ₽');
            $('.js-price-total').text(total +' ₽');
        });

        $('.js-pickup-date').on('change',function () {
            var $option = $('.js-pickup-date :selected');
            var text = $option.data('text');
            var mobile = $option.data('mobile');

            $('.js-cur-pickup').text(text);
            $('.js-cur-pickup-mobile').text(mobile);
        });

    }

});
