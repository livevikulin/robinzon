// ====================
// 7-6-2018: Amed
// --------------------
// карта PVZ общая

define(['jquery', 'webui-popover'], function ($) {

    var myMapOne;
    var cluster = [];
    // Дождёмся загрузки API и готовности DOM.
    //ymaps.ready(initPVZMap); // из-за этой строчки веб-визор кадую секунду фиксировал изменения и отсылал ajax запрос

    var addBaloon = function (coords, point) {
        var merto = (point.metro)?'<span>Метро:<span></span>'+point.metro+'</span><br/>':'';
        var tel = (point.PROPERTY_PHONE_VALUE)?'тел: '+point.PROPERTY_PHONE_VALUE:'';
        var myPlacemark = new ymaps.Placemark([coords[1],coords[0]], {
            balloonContent: '<div class="b-pvz-popup__content"' +
            'class="js-item-button" ' +
            'data-text="'+point.PROPERTY_ADDRESS_VALUE+' '+point.PROPERTY_VREMYA_RABOTY_VALUE+' '+ tel +'"' +
            '>' +
            '<span class="b-pvz-popup__title"><strong>'+point.MAP_NAME+':</strong> '+point.PROPERTY_ADDRESS_VALUE+'</span><br/>' +
            '<span class="b-pvz-popup__text">Служба доставки:<span class="b-pvz-popup__text"></span>'+point.TYPE+'</span><br/>' +
            '<span class="b-pvz-popup__text">Срок доставки:<span class="b-pvz-popup__text"></span>'+point.PROPERTY_SROK_DOSTAVKY_VALUE+'</span><br/>' +
            merto +
            '<span class="b-pvz-popup__text">Время работы:<span class="b-pvz-popup__text"></span>'+point.PROPERTY_VREMYA_RABOTY_VALUE+'</span><br/>' +
            ((point.comment.length)?'<span class="b-pvz-popup__text"'+point.comment+'</span><br/>':'') +
            '<a class="b-button b-button--pvz-popap b-button--list-check b-button--mobile-hide js-item-button" '+'data-howto="'+point.PROPERTY_HOWTOGET_VALUE+'"'+'data-mapname="'+point.MAP_NAME+'" data-text="'+point.PROPERTY_ADDRESS_VALUE+' '+point.PROPERTY_VREMYA_RABOTY_VALUE+' '+ tel +'" data-value="'+point.NAME+'" href="javascript:void(0);" title="Выбрать">Выбрать</a></div>',
            clusterCaption: point.MAP_NAME,

        }, {
            preset: 'islands#icon',
            iconColor: '#0095b6',
            //hideIconOnBalloonOpen:false,
            iconOffset:[0,0],
        });
        myPlacemark.events.add('click', function (e) {
            if (window.innerWidth < 768 && window.innerWidth > 355) {
                //уменьшить размер балуна

                var width =  Math.min(window.innerWidth*0.9-20, 400);
                e.get('target').options.set('balloonMaxWidth', width);

                //подвинуть карту
                var timer = setInterval(function () {
                    var pixelCenter = myMapOne.getGlobalPixelCenter();
                    if ($('.ymaps-2-1-74-balloon__content').length) {
                        var left = $('.ymaps-2-1-74-balloon__content').offset().left;
                        var top = $('.ymaps-2-1-74-balloon__content').offset().top;
                        var offsetTop = 120;
                        pixelCenter = [
                            pixelCenter[0] + left,
                            pixelCenter[1] + top - offsetTop
                        ];

                        if ((left >= 0 && left < 5) && Math.abs(offsetTop-offsetTop) < 5 ) clearInterval(timer);

                        var geoCenter = myMapOne.options.get('projection').fromGlobalPixels(pixelCenter, myMapOne.getZoom());
                        myMapOne.setCenter(geoCenter);
                    }
                },10);


            }

        });
        myMapOne.myplacemarks[parseInt(point.ID)] = myPlacemark;
        cluster.push(myPlacemark);
    };

    function initPVZMap() {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        $('#id-map-pvz-popup-7492716').html('');

        myMapOne = new ymaps.Map('id-map-pvz-popup-7492716', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [55.76, 37.64], // Москва
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
        myMapOne.myplacemarks = [];
        cluster = []
        var clusterer = new ymaps.Clusterer({
            /**
             * Через кластеризатор можно указать только стили кластеров,
             * стили для меток нужно назначать каждой метке отдельно.
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
             */
            preset: 'islands#invertedNightClusterIcons',
            groupByCoordinates: false,
            minClusterSize : 2
            /**
             * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
             */
//								 clusterIcons: clusterIcons,
            //groupByCoordinates: true,
            /**
             * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
             */
            //          clusterDisableClickZoom: true,
            //         clusterHideIconOnBalloonOpen: true,
            //         geoObjectHideIconOnBalloonOpen: false
        });


        if (typeof window.pvzCity !== 'undefined'){
            var address = 'г.'+window.pvzCity;
            $.ajax({
                url: 'https://geocode-maps.yandex.ru/1.x/?geocode='+address+'&format=json&apikey='+window.pvzApiKeyYandexMap,
                dataType:'json',
                success:function (data) {
                    var coords = data.response.GeoObjectCollection.featureMember["0"].GeoObject.Point.pos.split(' ');
                    myMapOne.setCenter([coords[1],coords[0]]);
                }
            });
        }
        if (typeof window.pvz !== 'undefined'){
            $.each(window.pvz,function () {
                var point = this;
                var address = 'г.'+point.PROPERTY_GOROD_VALUE+' '+point.PROPERTY_ADDRESS_VALUE;
                if (typeof point.PROPERTY_LATITUDE_VALUE=== 'undefined' || typeof point.PROPERTY_LONGITUDE_VALUE=== 'undefined'){
                    $.ajax({
                        url: 'https://geocode-maps.yandex.ru/1.x/?geocode='+address+'&format=json&apikey='+window.pvzApiKeyYandexMap,
                        dataType:'json',
                        success:function (data) {
                            var coords = data.response.GeoObjectCollection.featureMember["0"].GeoObject.Point.pos.split(' ');
                            addBaloon(coords,point);
                        }
                    })
                }else{
                    addBaloon([point.PROPERTY_LONGITUDE_VALUE,point.PROPERTY_LATITUDE_VALUE],point);
                }

            });
            setTimeout(function () {
                clusterer.add(cluster);
                myMapOne.geoObjects.add(clusterer);
            });
        }

        $('.js-list-check-scroll').on('scroll',function () {
            if  ($(window).width() < 768){
                $('#id-map-pvz-popup-7492716').css({height:'160px'});
            }else{
                $('#id-map-pvz-popup-7492716').css({height:''});
            }

            myMapOne.container.fitToViewport();
        });

    }

    $(document).on('click','.js-item-check', function () {
        var id = $(this).attr('data-id');
        myMapOne.myplacemarks[id].balloon.open();
    });

    $('body').on('initPVZMap',initPVZMap);

});
