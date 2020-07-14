// ====================
// 7-6-2018: Amed
// --------------------
// карта PVZ общая

define(['jquery', 'webui-popover'], function ($) {

    var myMapPvz;

    // Дождёмся загрузки API и готовности DOM.
    if ($('#id-map-pvz-general').length){
        //ymaps.ready(init);
    }

    function init() {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMapPvz = new ymaps.Map('id-map-pvz-general', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [55.76, 37.64], // Москва
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
    }

});
