
define(['jquery', 'utatti-perfect-scrollbar'], function ($) {

    $('body').on('drow-map', function (e) {

        var sort = e.sort;
        var url = e.url;
        var data = e.filter;
        var myMap = e.myMap;
        var json = e.json;
        var BalloonContentLayout = e.BalloonContentLayout;
        var balloonOffset = e.balloonOffset;
        var afterInit = e.afterInit;
        var makeHtml4shop = e.makeHtml4shop;
        var js_static = (window.js_static) ? window.js_static : '';
        var ps;

        var clusterer;
        drawMapWithShops();

        /**
         * Рисуем карту
         */
        function drawMapWithShops() {
            if (typeof (sort) === 'undefined') {
                sort = 'sort-asc';
            }

            if (typeof (json) === 'undefined') {
                $.ajax({

                    url: url,
                    data: data,
                    // url: '/ajax/shops.php?sortby=' + sort,
                    method: 'GET',
                    dataType: 'json',
                    success: function (json) {
                        mapDrowingJson(json);
                    }

                });
            } else {
                if (typeof mapData !== 'undefined') {
                    mapDrowingJson(mapData);
                }else{
                    console.error('no map data')
                }
            }
        }
        function addBaloons(baloons) {

            for (var j = 0; j < baloons.length; j++) {

                var shop = baloons[j];

                if (typeof shop['services'] !== 'undefined') {
                    shop['services'] = shop['services'].join(', ');
                } else {
                    shop['services'] = '';
                }

                myPlacemark = new ymaps.Placemark([shop['gps_s'], shop['gps_n']], {

                    color: shop['metroClass'],
                    metro: shop['metro'],
                    name: shop['name'],
                    PREVIEW_TEXT: shop['PREVIEW_TEXT'],
                    addr: JSON.stringify(shop['adress']),
                    telephone: shop['phone'],
                    time: shop['schedule'],
                    amount: shop['amount'],
                    pickup: shop['pickup'],
                    tag: shop['services'],
                    shop_id: shop['id'],
                    image: shop['photo'],
                    howtofind: JSON.stringify(shop['adress']),
                    mainaddress: JSON.stringify(shop['addr'])
                }, {
                    balloonContentLayout: BalloonContentLayout,
                    balloonOffset: balloonOffset,
                    balloonPanelMaxMapArea: 163840,
                    balloonPanelMaxHeightRatio: 0.5,
                    // visible: visible,
                    shop_id: shop['id'],
                    shop: shop,
                    clusterCaption: shop['id']
                    // iconImageSize: [100, 100]
                });

                myPlacemark.events.add('balloonopen', function (e) {

                    // закрываем предыдущие балуны
                    for (var i=0; i<window.closebaloon.length; i++) {
                        var e_target = window.closebaloon[i];
                        SetCloseStyles(e_target);
                    }
                    window.closebaloon = [];
                    window.closebaloon.push(e.get('target'));
                    if ($('#map').hasClass('js-product-map')) {
                        e.get('target').options.set('cursor', 'url("https://api-maps.yandex.ru/2.1.56/build/release/images/util_cursor_storage_grab.cur") 16 16, url("https://api-maps.yandex.ru/2.1.56/build/release/images/util_cursor_storage_grab.cur"), move');
                    }

                    // особые условия показа инфопопапа
                    e.get('target').options.set('iconImageSize', [32, 40]);
                    e.get('target').options.set('iconImageOffset', [-16, -20]);
                    e.get('target').options.set('iconImageHref', js_static+'images/inhtml/map/tag-opened.svg');

                    if ($('#map').hasClass('js-mobile-event')) {
                        return false;

                    } else if (window.innerWidth > 320) {
                        setActiveShop(e.get('target').options.get('shop_id'));
                    }

                });
                myPlacemark.events.add('balloonclose', function (e) {
                    var shop_id = e.get('target').options.get('shop_id');
                    var opened_shop_id = $('.js-delivery-list .js-shop-link.active').data('shopId');

                    // если уже открыт балун и еще раз на него кликаем  - отменяем закрытие
                    if (window.innerWidth >= 768 && shop_id==opened_shop_id && $('#map').hasClass('js-product-map')) {
                        return false;
                    }

                    SetCloseStyles(e.get('target'));
                });

                myMap.myplacemarks[shop['id']] = myPlacemark;
                // html = '';

                $('#shop_id' + shop['id']).attr('data-coord_0', shop['gps_s']);
                $('#shop_id' + shop['id']).attr('data-coord_1', shop['gps_n']);

                // myMap.geoObjects.add(myPlacemark);
                // geoObjects[j] = myPlacemark;

                // if (visible == true) {
                clusterer.add(myPlacemark);
                // }
            }
            makeHtml4shop(baloons);
            myMap.geoObjects.add(clusterer);

            $('.js-map-found').html($('.b-shop-card:visible').length);
        }

        function mapDrowingJson(json) {
            if (json.success == false) {
                window.popupAddAndEdit(json);
                return false;
            }
            if (window.showPreloader) {
                window.showPreloader(false);
            }

            var geoObjects = [];

            clusterer = new ymaps.Clusterer({
                // preset: 'islands#invertedVioletClusterIcons',
                clusterIcons: [
                    {
                        href: js_static + 'images/inhtml/map/cluster.svg',
                        size: [26, 26],
                        offset: [-20, -20]
                    }
                ],
                groupByCoordinates: false,
                clusterDisableClickZoom: false,
                clusterHideIconOnBalloonOpen: false,
                hasBalloon: false,
                geoObjectHideIconOnBalloonOpen: false
            });

            //myMap.behaviors.disable('scrollZoom');// Отключение зума
            // myMap.behaviors.disable("drag");//Отключение перетаскивания мышкой
            // Позиционирование пользовательского ползунка зума
            myMap.controls.add(new ymaps.control.ZoomControl({options: {position: {right: 20, top: 200}}}));
            
            myMap.geoObjects.options.set({
                iconLayout: 'default#image',
                iconImageHref: js_static + 'images/inhtml/map/tag.svg',
                // iconImageHref: '/html/buildimg/map/map_placemark.png',
                iconImageSize: [26, 26],
                iconImageOffset: [-13, -13]
            });
            if (Boolean(json.data) && Boolean(json.data.items)) {

                addBaloons(json.data.items);
                if (Boolean(json.data.services)) {
                    var html = '';
                    var $checkboxBlock = $('.b-stores__block .b-stores-sort div.b-stores-sort__checkbox-block');
                    var services = json.data.services;
                    var checkboxUrl = $checkboxBlock.data('url');
                    for (var index in services) {
                        if (services.hasOwnProperty(index)) {
                            var service = services[index];
                            html += '<div class="b-checkbox b-checkbox--stores">\n' +
                                '    <input class="b-checkbox__input"\n' +
                                '           type="checkbox"\n' +
                                '           name="stores-sort[]"\n' +
                                '           id="stores-sort-' + index + '"\n' +
                                '           data-url="' + checkboxUrl + '"\n' +
                                '           value="' + service.ID + '" />\n' +
                                '    <label class="b-checkbox__name b-checkbox__name--stores"\n' +
                                '           for="stores-sort-' + index + '">\n' +
                                '        <span class="b-checkbox__text">' + service.UF_NAME + '</span>\n' +
                                '    </label>\n' +
                                '</div>';
                        }
                    }
                    $checkboxBlock.html(html);
                }
            }

            myMap.events.add('click', function () {// закрытие балуна при клике на карту
                myMap.balloon.close();
            });
            if (typeof afterInit === 'function') {
                afterInit(json.data);
            }
        }
        window.closebaloon = [];
        /**
         * Добавляем магазины к списку
         * @param baloons
         */


        function setActiveShop(shop_id) {

            $('[data-shop-id]').removeClass('active');

            var $shop = $('[data-shop-id="' + shop_id + '"]');
            $('.js-shop-link').removeClass('active');
            $shop.addClass('active');

            $('.js-fix-scroll.js-map-list-scroll').css({'overflow': ''});
            var parent = '.js-map-list-scroll';
            var element = '.js-shop-link.active';
            var scroll_top = $(parent).offset().top - $('.js-delivery-list').offset().top;
            $(parent).animate({scrollTop: scroll_top + $(element).offset().top - $(parent).offset().top}, function () {
                // $('.js-map-list-scroll').perfectScrollbar('update');
                if (ps) {
                    ps.update();
                }

                $('.js-fix-scroll.js-map-list-scroll').css({'overflow': 'visible'});
            });

            // центрирование текущего магазина
            var coords = myMap.myplacemarks[shop_id].geometry.getCoordinates();

            /** двигаем центр карты правее чтобы точка попала в центр */


            (temp = myMap._projection.toGlobalPixels(coords, myMap._zoom));
            var width = ($('.b-delivery-list--stores').width()) / 2;
            if (width) {
                temp[0] -= width;
                coords = (myMap._projection.fromGlobalPixels(temp, myMap._zoom));
            }

            myMap.panTo([parseFloat(coords[0]), parseFloat(coords[1])]);
        }

        /**
         * Стилизация закрытого балуна
         * @param e_target
         * @constructor
         */
        function SetCloseStyles(e_target) {
            // console.log(e_target);
            e_target.options.set('iconImageSize', [26, 26]);
            e_target.options.set('iconImageOffset', [-13, -13]);
            e_target.options.set('iconImageHref', js_static + 'images/inhtml/map/tag.svg');
            e_target.options.set('cursor', 'pointer');
        }

        $('body').on('setActiveShop',function (e) {
            var shopid = e.shopid;
            setActiveShop(shopid);
        });

        $('body').on('addBaloons',function (e) {
            var baloons = e.json['shops'];
            addBaloons(baloons);
        });

    });

});
