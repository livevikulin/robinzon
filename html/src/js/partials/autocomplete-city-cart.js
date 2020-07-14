// ====================
// 4P: autocomplite ui
// 26-10-2017: Amedomary
// ---------------------
// Автокомплит
// ====================

define(['jquery', 'partials/get-type-query', 'devbridge-autocomplete'], function ($) {


    function initCityAuto() {
        var $inputAutocomplite = $('#id-city-order');
        var dataUrlAutocomplite = $('#id-city-order').data('url');
        var $resultWrapperAutocomplite = $('#id-city-order-result');
        var $target = $(
            $inputAutocomplite.data('for')
        );
        $inputAutocomplite.autocomplete({
            serviceUrl: dataUrlAutocomplite,
            dataType: 'json',
            minChars: 2,
            appendTo: $resultWrapperAutocomplite,
            //noCache:true,
            autoSelectFirst: true,
            // maxHeight: 10000,

            transformResult: function (response, originalQuery) {
                return {
                    suggestions: $.map(response.data, function (dataItem) {
                        var name = dataItem.NAME;
                        //console.log(dataItem);
                        if (Array.isArray(dataItem.PATH)) {
                            name += ' (';
                            var countСomma = dataItem.PATH.length - 1;
                            for (var i = dataItem.PATH.length - 1; i >= 0; i--) {
                                name += dataItem.PATH[i].NAME;
                                if (countСomma != 0) {
                                    name += ', ';
                                    countСomma--;
                                }
                            }
                            name += ')';
                        }
                        if (dataItem.REGION_NAME){
                            name+= ' ('+dataItem.REGION_NAME+')';
                        }

                        var nameLower = name.toLowerCase();
                        var inputName = originalQuery.toLowerCase();
                        if (nameLower.indexOf(inputName) >= 0) {
                            return {value: name, data: dataItem.CODE};
                        }
                    })
                };
            },
            onSearchComplete:function () {

            },
            onSelect:function (suggestion) {

                $target
                    .val(suggestion.data);
                $('body').trigger('city-cart');

            }
        });
    }


    if ($('#id-city-order').length > 0) {
        initCityAuto();
    }

    $('body').on('initCityAuto',function () {
        initCityAuto();
    });
});
