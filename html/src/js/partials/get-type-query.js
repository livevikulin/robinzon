// ====================
// Project: get-type-query
// 01-02-2017: Malich
// ---------------------
// Проверка на мобилку
// ====================
define(function () {
    return function (element) {
        var type;

        if (element.localName == 'a') {
            type = 'get';
        } else if (element.localName == 'form') {
            if ($(element).attr('method') != undefined) {
                if ($(element).attr('method').length) {
                    type = $(element).attr('method');
                } else {
                    type = 'post';
                }
            } else {
                type = 'post';
            }
        }
        return type;
    };
});
