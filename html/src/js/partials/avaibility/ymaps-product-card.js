
define(['jquery', 'webui-popover'], function ($) {

    var myMap;

    /**
     * Инициализация карты
     */
    function initProductCardMap() {
        var data = '';
        // json/mapobjects.json
        
        var url = $('#map').data('url');
        var json = $('#map').data('json');
        var center = $('#map').data('center');

        var BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<ul class="b-delivery-list"><li class="b-delivery-list__item">' +
            '<span class="b-delivery-list__link" >' +
            '<span class="b-delivery-list__col b-delivery-list__col--addr">' +
            '<span class="b-delivery-list__col b-delivery-list__col--color b-delivery-list__col{{properties.color}}"></span> {{properties.name}}</span><br/>' + // eslint-disable-line max-len
            '<span class="b-delivery-list__col b-delivery-list__col--all">' +
            '<span class="b-delivery-list__col b-delivery-list__col--phone">$[properties.addr]</span><br/>' +
            '<span class="b-delivery-list__col b-delivery-list__col--phone">$[properties.telephone]</span><br/>' +
            '<span class="b-delivery-list__col b-delivery-list__col--time">{{properties.time}}</span> ' +
            //'<span class="b-delivery-list__col b-delivery-list__col--amount">' +
            //'<span class="b-delivery-list__inmap-text">Товара:</span> {{properties.amount}}</span> ' +
            //'<span class="b-delivery-list__col b-delivery-list__col--self-picked">' +
            //'<span class="b-delivery-list__inmap-text">Самовывоз:</span> {{properties.pickup}}</span>' +
            '</span>' +
            '</span>' +
            '</li></ul>');

        var makeColorList = function (data) {// eslint-disable-line 	no-shadow
            var colors = data.colors;
            var id = data.id;
            var shopName = data.adress+' '+data.schedule;
            var html = '';

            if (colors.length===0) {
                return html;
            }

            $.each(colors,function (i,item) {
                /* eslint-disable max-len */
                var style ='';
                if (Boolean(item.color)) {
                    style = 'background: #'+item.color+';';
                } else {
                    style = 'background-image: url('+item.img+');';
                }
                html+=''+
'                    <li class="b-filter-color__item b-filter-color__item--map-card">'+
'                        <div class="b-radio b-radio--map-color">'+
'                        <input class="b-radio__input js-shop-color" data-shop="'+shopName+'" type="radio" name="map-color-'+id+'" data-id="'+item.ID+'"  data-article="'+item.ARTICLE+'" id="id-map-color-'+id+'-'+i+'">'+
'                            <label class="b-radio__label b-radio__label--map-color" for="id-map-color-'+id+'-'+i+'" title="'+item.name+'">'+
'                                <span class="b-radio__circle b-radio__circle--map-card" data-color="'+item.color+'" style="'+style+'"></span>'+
'                            </label>'+
'                        </div>'+
'                     </li>';
                /* eslint-enable max-len */
            });
            return html;
        };

        var makeHtml4shopProduct = function (baloons) {
            var html = '';
            var j;
            var shop = {};

            for (j = 0; j < baloons.length; j++) {
                shop = baloons[j];

                /* eslint-disable max-len */
                html += '<li class="b-delivery-list__item js-shop-link" data-shop-id="'+shop.id+'">'+
                '                <h5 class="b-delivery-list__heading">'+shop.name+'</h5>'+
                '                <div class="b-delivery-list__row b-delivery-list__row--adress">'+
                '                    <span class="b-delivery-list__text b-delivery-list__text--addres">'+shop.adress+' '+shop.schedule+'</span>'+
                '                    <a class="b-link b-link--availibility-show-map b-link--underline-dot js-shop-link-mobile" href="javascript:void(0);" title="На карте">На карте</a>'+
                '                </div>'+
                '                <div class="b-delivery-list__row b-delivery-list__row--with-button">'+
                '                    <div class="b-delivery-list__color-wrapper">'+
                '                        <span class="b-delivery-list__text b-delivery-list__text--color">Доступные цвета</span>'+
                '                        <ul class="b-filter-color b-filter-color--map-card">'+
                    makeColorList(shop)+
                    '</ul>'+
                '</div>'+
                '<a class="b-button b-button--availibility js-open-popup disable" href="javascript:void(0);" title="Забронировать" data-id="map-color-'+shop.id+'" data-popup="reservation">Забронировать</a>'+
                '                </div>'+
                '            </li>';
                /* eslint-enable max-len */
            }
            $('.js-delivery-list').prepend(html);

        };


        myMap = new ymaps.Map('map', {
            center: center,
            zoom: 9,
            controls: [],// Отключение ползунка зума по умолчанию
            behaviors: ['drag', 'scrollZoom']
        });

        myMap.myplacemarks = [];

        $('body').trigger({
            type: 'drow-map',
            sort: 'sort-asc',
            url: url,
            json: json,
            data: data,
            myMap: myMap,// объект карты
            BalloonContentLayout: BalloonContentLayout,// шаблон балуна
            balloonOffset: [0.0],
            afterInit: function () {
                $('.js-loading-shop-pc').removeClass('active');
            },
            makeHtml4shop: makeHtml4shopProduct // html для списка магазинов
        });

        $('.js-product-map').click();

    }

    if ($('.b-tab-delivery-map--card').length > 0) {

        /**
         * Клик на выбор цвета
         */

        $(document).on('change','.js-shop-color',function () {
            var $this = $(this);
            var name = $this.attr('name');
            var shop = $this.attr('data-shop');
            var id = $this.attr('data-id');
            var article = $this.attr('data-article');
            var img = $('[data-id="'+id+'"][data-index="0"]').attr('src');
            var  $b1colors = $('.js-color-list.b-filter-color--map-card li');

            $('.js-b1c-artc').text(article);
            $('#product-reservation-form .js-image-wrapper').attr('src',img);

            $b1colors.find('[data-article="'+id+'"]').prop('checked',true);

            if ($this.is(':checked')) {
                $('#product-reservation-form [name="shop_name"]').val(shop);
                $('[data-id="'+name+'"]').removeClass('disable');

                //убираем лишние цвета
                {
                    var $parents = $this.parents('.b-filter-color--map-card');
                    $b1colors.hide();

                    $parents.find('.js-shop-color').each(function () {
                        var id = $(this).attr('data-id');
                        $b1colors.find('[data-article="'+id+'"]').parents('.b-filter-color__item--map-card').show();
                    })
                }
            }
        });

        $(document).on('click','.js-shop-color',function () {
            var $this = $(this);
            var name = $this.attr('name');
            var shop = $this.attr('data-shop');
            var id = $this.attr('data-id');
            var article = $this.attr('data-article');
            var img = $('[data-id="'+article+'"][data-index="0"]').attr('src');
            var  $b1colors = $('.js-color-list.b-filter-color--map-card li');

            $('.js-b1c-artc').text(article);
            $('#product-reservation-form .js-image-wrapper').attr('src',img);

            $b1colors.find('[data-article="'+id+'"]').prop('checked',true);

            if ($this.is(':checked')) {
                $('#product-reservation-form [name="shop_name"]').val(shop);
                $('[data-id="'+name+'"]').removeClass('disable');

                //убираем лишние цвета
                {
                    var $parents = $this.parents('.b-filter-color--map-card');
                    $b1colors.hide();

                    $parents.find('.js-shop-color').each(function () {
                        var id = $(this).attr('data-id');
                        $b1colors.find('[data-article="'+id+'"]').parents('.b-filter-color__item--map-card').show();
                    })
                }
            }
        });

        /**
         * Нажатие на крестик в списке магазинов
         */
        $(document).on('click', '.js-shop-link-close', function () {

            $('.js-shop-link').removeClass('active');
            myMap.balloon.close();

        });

        /**
         * Клик на магазин в списке
         */
        $(document).on('click', '.js-shop-link', function (e) {
            var shopId = $(this).attr('data-shop-id');

            var coords = myMap.myplacemarks[shopId].geometry.getCoordinates();
            var width = window.innerWidth || document.body.clientWidth;

            // для мобильный таблеток отключаем переход на карту если нажата не кнопка "на карту"
            if (width <= 768 && !$(e.target).hasClass('js-shop-link-mobile')) {
                return;
            }

            if (!$(this).hasClass('active')) {
                $(this).toggleClass('active');
            } else {
                return;
            }

            $('.js-shop-link').removeClass('active');

            $('.js-product-map').click();


            myMap.setZoom(15);

            myMap.panTo([parseFloat(coords[0]), parseFloat(coords[1])]).then(function () {
                myMap.container.fitToViewport();
                myMap.myplacemarks[shopId].balloon.open();
            });

        });

        /**
         * Клик на ссылку показать еще
         */
        $(document).on('click', '.js-load-shops', function () {
            var url = $('#map').data('url');
            $.ajax({

                url: url,
                // url: '/ajax/shops.php?sortby=' + sort,
                method: 'GET',
                dataType: 'json',
                success: function (json) {

                    if (json['shops'].length > 0) {

                        $('body').trigger({
                            type: 'addBaloons',
                            json: json,
                        });
                    }
                }

            });
        });

        /**
         * Клик на "иконку/тест" переход на карту
         */
        $('.js-product-map').on('click', function (event, ui) {
            var width = window.innerWidth || document.body.clientWidth;
            myMap.container.fitToViewport();
            myMap.balloon.close();

            // скрываем список магазинов при переходе на карту в мобильном варианте отображения
            if (width >768) {
                $('.js-map-list-scroll').show();
            } else {
                $('.js-map-list-scroll').hide();
            }


        });

        $('.js-product-list').on('click', function (event, ui) {
            $('.js-map-list-scroll').show();
        });


        $('.js-loading-shop-pc').addClass('active');

        ymaps.ready(initProductCardMap);

        $('body').trigger('setMap');
    }

});
