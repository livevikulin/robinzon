
define(['jquery', 'webui-popover'], function ($) {

    if ($('.b-tab-delivery-map--stores').length > 0) {

        ymaps.ready(initStoresMap);

        var myMap;
        var ajaxTimeout;
        /**
         * Открытие аккордиона в списке магазинов
         */
        $(document).on('click', '.js-accordion-stores-list', function () {

            if (!$(this).hasClass('active')) {
                $(this).addClass('active').next().slideDown();
            } else {
                $(this).removeClass('active').next().slideUp();
            }
        });

        /**
         * Клик что-то в открывшемся балуне
         */
        $(document).on('click', '.js-map-information-link', function () {

            if (window.innerWidth < 767) {
                $('.js-map-information-popup').addClass('popuped');
                $('.js-map-back2shop').after($('.js-map-information-link'));

            }
        });

        /**
         * Клик что-то в открывшемся балуне
         */
        $(document).on('click', '.js-map-back2shop', function () {
            if (window.innerWidth < 767) {
                $('.js-map-information-popup')
                    .removeClass('popuped')
                    .parent('.b-delivery-list__item')
                    .prepend($('.js-map-information-link'));

            }
        });

        /**
         * Клик на ссылку выберите магазин
         */
        $(document).on('click', '.js-map-shoose-shop', function () {

            if (window.innerWidth < 767) {
                $('.js-availability-parent').append($('.js-availability-list'))
                    .find('.js-product-list').click();
            }
        });

        /**
         * Клик на "иконку/тест" переход на карту
         * "пермутейшен"... что бы это ни значило
         */
        $('.js-product-map').on('click', function (event, ui) {
            myMap.container.fitToViewport();

            if (window.Mymap_center) {
                myMap.setCenter(window.Mymap_center, 10, {});
            } else {
                myMap.setZoom(10);
            }

            if ((window.innerWidth > 767) && (window.innerWidth < 1024)) {
                $('.js-this-scroll').css('overflow', 'hidden').scrollTop('0');
                $('.js-content-map').css('height', 0 + 'px');

                // магия перерасчета высоты блока карты
                var _mapH = $('.js-content-map').offset().top;
                var _allH = $('.js-availability-content').offset().top;

                var mapStoresHeight = _mapH - _allH;

                $('.js-content-map').css('height', mapStoresHeight + 'px');

                myMap.container.fitToViewport();
            } else if (window.innerWidth < 768) {
                $('.b-link--close-baloon.js-product-list').hide();
                $('.js-map-shoose-shop').after($('.js-availability-list'));

                myMap.container.fitToViewport();
            }
        });

        /**
         * Клик на кнопки отображения списка
         * Возвращаем кнопки на прежнее место
         */
        $('.js-product-list').on('click', function (event, ui) {
            if ((window.innerWidth > 767) && (window.innerWidth < 1024)) {
                $('.js-this-scroll').removeAttr('style');
                $('.js-content-map').removeAttr('style');
            } else if (window.innerWidth < 768) {
                $('.js-availability-parent div').after($('.js-availability-list'))
                    .find('.js-product-list').click();

                myMap.container.fitToViewport();

                // $('.js-close-order-baloon').click();1

            }
            myMap.balloon.close();
            $('.js-map-shoose-shop').show();

            $('.js-availability-list li').removeClass('active');
            $('.js-product-list').parent().addClass('active');
        });

        /**
         * Клик на магазин в списке
         */
        $(document).on('click', '.js-shop-link', function () {

            $('.js-shop-link').removeClass('active');

            $('.js-product-map').click();
            $('.b-link--close-baloon.js-product-list').show();
            $('.js-availability-parent div').after($('.js-availability-list'));

            if (!$(this).hasClass('active')) {
                $(this).toggleClass('active');
            }

            myMap.setZoom(15);

            var shop_id = $(this).attr('data-shop-id');
            // getCoordinates() возвращает координаты в виде массива строк, а panTo требует массив чисел, серьёзно?
            var coords = myMap.myplacemarks[shop_id].geometry.getCoordinates();

            myMap.panTo([parseFloat(coords[0]), parseFloat(coords[1])]).then(function () {
                myMap.container.fitToViewport();
                if (window.innerWidth > 767) {
                    myMap.myplacemarks[shop_id].balloon.open();
                }
            });
            if (window.innerWidth <= 767) {
                $('.js-map-shoose-shop').hide();
            }

        });

        /**
         * Клик на кнопку фильтра
         */
        $(document).on('click', '[name="stores-sort[]"], .js-stores-city', function () {

            var url = $(this).data('url');
            if ($(this).hasClass('js-stores-city')) {
                url = $('.js-stores').data('url');
            }
            clearTimeout(ajaxTimeout);
            window.showPreloader(true);
            ajaxTimeout = setTimeout(function () {
                fix_height();
                initStoresMap(url);
            }, 2000);
        });

        /**
         * Поиск магазинов
         */
        $('input.js-stores-search').on('keyup', function () {

            var url = $(this).data('url');
            if ($(this).val().length != 1) {
                clearTimeout(ajaxTimeout);
                window.showPreloader(true);
                ajaxTimeout = setTimeout(function () {
                    fix_height();
                    initStoresMap(url);
                }, 2000);
            }
        });

        /**
         * Сортировка
         */
        $('[name="sort"]').on('change', function () {

            var url = $(this).data('url');
            clearTimeout(ajaxTimeout);
            window.showPreloader(true);
            ajaxTimeout = setTimeout(function () {
                fix_height();
                initStoresMap(url);
            }, 2000);
        });

        function initStoresMap(jurl) {

            var base_url = $('#map').data('url');

            var url = (typeof jurl === 'string') ? jurl : base_url;

            /** сбор данных для фильтра */
            var filter = [];
            $('input.js-stores-search, [name="stores-sort[]"]:checked,[name="sort"]').each(function () {
                var val = $(this).val();
                var name = $(this).attr('name');
                filter.push({name: name, value: val});
            });

            filter.push({name: 'code', value: $('.js-stores').data('code')});

            var data = param(filter);
            $('#map,.js-delivery-list').html('');
            myMap = new ymaps.Map('map', {
                center: [0, 0],
                zoom: 10,
                controls: [],// Отключение ползунка зума по умолчанию
                behaviors: ['drag', 'scrollZoom']
            });

            var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<ul class="b-delivery-list b-delivery-list--stores"><li class="b-delivery-list__item">' +
                '<span class="b-delivery-list__link b-delivery-list__link--stores js-map-information-link" >' +
                '<span class="b-delivery-list__col b-delivery-list__col--addr">' +
                '{% if properties.metro %}' +
                    '<span class="b-delivery-list__col b-delivery-list__col--stores b-delivery-list__col--color b-delivery-list__col{{properties.color}}"></span>' +
                    '{{properties.metro}}' +
                    ', {{properties.mainaddress}}' +
                    ', {{properties.addr}}</span>' +
                '{% else %}' +
                    '{{properties.mainaddress}}' +
                    ', {{properties.addr}}</span>' +
                '{% endif %}' +
                '<span class="b-delivery-list__col b-delivery-list__col--stores b-delivery-list__col--phone">{{properties.telephone}}</span>' +
                '<span class="b-delivery-list__col b-delivery-list__col--stores b-delivery-list__col--time">{{properties.time}}</span> ' +
                '<div class="b-tag">{{properties.tag}}</div>' +
                '</span>' +
                '<div class="b-delivery-list__information b-delivery-list__information--popup js-map-information-popup">' +
                '<a href="javascript:void(0);" class="b-link b-link--popup-back js-map-back2shop">Магазин</a>' +
                '<div class="b-delivery-list__image-wrapper">' +
                '<img src="{{properties.image}}" class="b-delivery-list__image" alt="" title="" />' +
                '</div>' +
                '<div class="b-delivery-list__text">' +
                '<p class="b-delivery-list__information-header">Как нас найти</p>' +
                '<p class="b-delivery-list__information-text">{{properties.howtofind}}</p>' +
                '</div>' +
                '</div>' +
                '</li></ul>');

            var make_html4shop_stores = function (baloons) {
                var html = '';
                for (var j in baloons) {
                    if (baloons.hasOwnProperty(j)) {
                        var shop = baloons[j];

                        var metroClass = '';
                        var metroName = '';

                        // var metroClass = (!!shop['metroClass'] && shop['metroClass'].length > 0) ? '<span class="b-delivery-list__col b-delivery-list__col--color b-delivery-list__col' + shop['metroClass'] + '"></span>' : '';
                        // var metroName  = (!!shop['metro'] && shop['metro'].length > 0) ? shop['metro'] + ', ' : '';

                        if (shop['metroClass'].length >= 1) {
                            metroClass = '<span class="b-delivery-list__col b-delivery-list__col--color b-delivery-list__col' + shop['metroClass'] + '"></span>';
                        }
                        if (shop['metro'].length >= 1) {
                            metroName = shop['metro'] + ', ';
                        }

                        html += '<li class="b-delivery-list__item" data-shop="' + shop.id + '" data-sort-price="' + shop.price + '" data-sort-pop="' + shop.popular + '">\
                                        <a class="b-delivery-list__link b-delivery-list__link--stores js-accordion-stores-list" href="javascript:void(0);" title="">\
                                            <span class="b-delivery-list__col b-delivery-list__col--stores b-delivery-list__col--addr">\
                                                ' + metroClass + ' \
                                                ' + metroName + shop['addr'] +
                                '</span>\
                                <span class="b-delivery-list__col b-delivery-list__col--stores b-delivery-list__col--phone">' + shop['phone'] + '</span>\
                                            <span class="b-delivery-list__col b-delivery-list__col--stores b-delivery-list__col--time">' + shop['schedule'] + '</span>\
                                            <div class="b-tag">';
                        if (Boolean(shop['services'])) {
                            var services;
                            if (typeof (shop['services']) === 'string') {
                                services = shop['services'].split(', ');
                            } else {
                                services = shop['services'];
                            }
                            var serviceLength = services.length;
                            var ii = 0;
                            for (var t in services) {
                                if (services.hasOwnProperty(t)) {
                                    ii++;
                                    var tag = services[t];

                                    html += '<span class="b-tag__item">' + tag + '</span>';
                                    if (ii < serviceLength) {
                                        html += '<span class="b-tag__item">, </span>';
                                    }
                                }
                            }
                        }
                        html += '	</div></a>\
                                        <div class="b-delivery-list__information">\
                                            <div class="b-delivery-list__image-wrapper">\
                                                <img src="' + shop['photo'] + '" class="b-delivery-list__image" alt="" title="" />\
                                            </div>\
                                            <div class="b-delivery-list__text">\
                                                <p class="b-delivery-list__information-header">Как нас найти</p>\
                                                <p class="b-delivery-list__information-text">' + shop['adress'] + '</p>\
                                                <a class="b-delivery-list__information-link js-shop-link" id="shop_id' + shop['id'] + '" data-shop-id="' + shop['id'] + '" href="javascript:void(0);" title="">Показать на карте</a>\
                                                <a class="b-delivery-list__information-link" href="javascript:void(0);" title="">Проложить маршрут</a>\
                                            </div>\
                                        </div>\
                                    </li>';
                    }

                }

                $('.js-delivery-list').append(html).css({'height': ''});
                $('div.b-stores__block div.b-catalog-filter__sort-part > span.b-catalog-filter__label--stores')
                    .html(baloons.length + ' ' + declOfNum(baloons.length, ['магазин', 'магазина', 'магазинов']));
            };

            var afterInit = function (data) {
                if (Boolean(data) && Boolean(data.sortHtml)) {
                    $('select.js-stores-filter').html(data.sortHtml);
                }
                $('.js-preload-stores').removeClass('active');
            };

            myMap.myplacemarks = [];

            var baloonH = -12;

            if ($('#map').height() < 600) {// 560
                baloonH = -245;
            }

            $('body').trigger({
                type: 'drow-map',
                sort: 'sort-asc',
                url: url,
                filter: data,
                myMap: myMap,// объект карты
                BalloonContentLayout: BalloonContentLayout,// шаблон балуна
                balloonOffset: [-80, baloonH],
                make_html4shop: make_html4shop_stores, // html для списка магазинов
                afterInit: afterInit
            });
        }

        $('.js-preload-stores').addClass('active');


        var param = function (data) {
            var result = [];
            $(data).each(function (i, e) {
                result[i] = encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value == null ? '' : e.value);
            });

            return result.join('&');
        };

        var fix_height = function () {
            var height = $('.js-delivery-list').height();
            $('.js-delivery-list').css({'height': height});
        };

        window.showPreloader = function ($show) {
            if ($show) {
                $('.js-preload-stores').addClass('active');
            } else {
                $('.js-preload-stores').removeClass('active');
            }
        };

        if (typeof declOfNum !== 'function') {
            function declOfNum(number, titles) {
                cases = [2, 0, 1, 1, 1, 2];
                return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
            }
        }
    }

});
