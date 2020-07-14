// ====================
// 4P: autocomplite ui
// 26-10-2017: Amedomary
// ---------------------
// Автокомплит
// ====================

define(['jquery', 'devbridge-autocomplete'], function ($) {

    // Initialize ajax autocomplete:
    var dataUrlAutocomplite = $('#header-search').parents('form').data('url');

    var MAX_SHOWED_ITEMS = 7;
    var IJECTED_ITEM = '<a class="autocomplete-suggestion autocomplete-suggestion--show-all">Показать все результаты</a>';
    var showResultsFlag = false;

    $('#header-search').autocomplete({
        // serviceUrl: $('.js-popover-search').data('url'),
        serviceUrl: dataUrlAutocomplite,
        dataType: 'json',
        minChars: 2,
        appendTo: $('#id-header-search-auto'),
        transformResult: function (response) {
            showResultsFlag = response.data.length > MAX_SHOWED_ITEMS;
            if (showResultsFlag) {
                response.data = response.data.slice(0, MAX_SHOWED_ITEMS);
            }
            return {
                suggestions: $.map(response.data, function (dataItem) {
                    return {value: dataItem.NAME, data: dataItem.DETAIL_PAGE_URL};
                })
            };
        },
        beforeRender: function (container) {
            if (showResultsFlag) {
                container.append(IJECTED_ITEM);
            }
        },
        onSelect: function (suggestion) {
            var url = suggestion.data;
            location.href = url;
        },
    });


});
