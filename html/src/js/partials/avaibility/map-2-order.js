// ====================
// 4lapy: map-2
// 21-12-2017: Amed
// --------------------
// карта

define(['jquery', 'webui-popover'], function ($) {

    if ($('#map-2').length > 0) {
        // Дождёмся загрузки API и готовности DOM.
        ymaps.ready(initOrderMap2);

        var js_static = (window.js_static) ? window.js_static : '';

        function initOrderMap2() {
            // Создание экземпляра карты и его привязка к контейнеру с
            // заданным id ("map-2").
            var coords = $('#map-2').data('coords');
            myMap = new ymaps.Map('map-2', {
                // center: json['center'],
                center: coords, // Москва
                zoom: 10,
                controls: [],// Отключение ползунка зума по умолчанию
                behaviors: ['drag', 'scrollZoom']
            }),
            myPlacemark = new ymaps.Placemark(coords, {
                // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: js_static + 'images/inhtml/map/tag-opened.svg',
                // Размеры метки.
                iconImageSize: [26, 26],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-13, -13]
            }),

            myMap.geoObjects.add(myPlacemark);

        }
    }

});
