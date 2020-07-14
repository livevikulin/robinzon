// ====================
// 4P: autocomplite ui
// 26-10-2017: Amedomary
// ---------------------
// Автокомплит
// ====================

define(['jquery',
    'partials/get-type-query',
    'devbridge-autocomplete'
], function ($, getTypeQuery) {

    // Initialize ajax autocomplete:
    var dataUrlAutocomplite = $('#id-pick-city-search').parents('form').data('url');
    var $city = $('.js-name-city-mobile.js-open-step-mobile');
    var attrTwo = $('.js-open-two').attr('data-popup');

    // Событие открытия любого попАпа
    $('.js-open-popup').on('popup.open', function (event) {
        var $this = $(this);
        var $popUpDate;
        windowResize({
            mobile: function () {

                if (getCookie('user_city_id') == undefined) {

                    // Попап с вопросом, кнопка "Другой город"
                    if ($this.hasClass('js-open-two')) {
                        $this.attr('data-popup', '');
                        $city.addClass('js-open-step-mobile')
                            .trigger('click')
                            .removeClass('js-open-step-mobile');

                        $('.js-open-popup').trigger('popup.onClose');
                    }
                } else {
                    $city.addClass('js-open-step-mobile');
                    $('.js-open-two, .js-one-open').removeClass('js-open-popup');
                }

            },
            desctop: function () {

                if ($this.hasClass('js-open-two')) {
                    $this.attr('data-popup', attrTwo);
                }

                $popUpDate = $('.b-popup[data-popup=\'' + ($this.attr('data-popup')) + '\']');

                if ($this.hasClass('js-one-open') && getCookie('user_city_id') != undefined) {
                    $this.attr('data-popup', attrTwo);
                }
            }
        });
    });

    // Ресайз
    $(window).resize(function () {
        resizeAuto();
    });

    // Оболочка так как повторяеться код
    function resizeAuto() {

        windowResize({
            mobile: function () {
                if (getCookie('user_city_id') != undefined) {
                    $city.addClass('js-open-step-mobile');
                    $('.js-open-two, .js-one-open').removeClass('js-open-popup');
                } else {
                    $city.removeClass('js-open-step-mobile');
                }
            },
            desctop: function () {
                $city.addClass('js-open-step-mobile');
                $('.js-open-two, .js-one-open').addClass('js-open-popup');
            }
        });
    }

    // Запускаем при загрузке странице
    resizeAuto();

    // Смысловое упрошения условий
    function windowResize(resize) {
        if (window.innerWidth >= 320 && window.innerWidth < 768) {
            if ('mobile' in resize) {
                resize.mobile();
            }
        } else if (window.innerWidth >= 768) {
            if ('desctop' in resize) {
                resize.desctop();
            }
        }
    }



    $('#id-pick-city-search-delivery').autocomplete({
        serviceUrl: dataUrlAutocomplite,
        dataType: 'json',
        minChars: 2,
        maxHeight: 10000,
        autoSelectFirst: true,

        transformResult: function (response, originalQuery) {
            return {
                suggestions: $.map(response.data, function (dataItem) {
                    var name = dataItem.NAME;
                    var sname = dataItem.SNAME;
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
                    var nameLower = sname.toLowerCase();
                    var inputName = originalQuery.toLowerCase();
                    if (nameLower.indexOf(inputName) >= 0) {
                        return {value: name, data: dataItem.CODE};
                    }
                })
            };
        },

        onSearchComplete: function (query, suggestions) {
            $('.b-input-label.b-input-label--error').toggleClass('active', suggestions.length === 0);
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.b-city-selection__item').toggle(suggestions.length !== 0);
            } else {
                $('.b-city-selection__item').show();
            }
        },
        appendTo: $('#id-city-search-delivery'),
        onSelect: function (suggestion) {
            var code = suggestion.data;

            var url = $('#id-pick-city-search-delivery').parents('form').attr('action');
            $('#id-pick-city-search-val-delivery').val(suggestion.data);
            $('#id-pick-city-search-delivery').parents('form').submit();
        },
    });

    $('#id-pick-city-search').autocomplete({
        serviceUrl: dataUrlAutocomplite,
        dataType: 'json',
        minChars: 2,
        maxHeight: 10000,
        autoSelectFirst: true,

        transformResult: function (response, originalQuery) {
            return {
                suggestions: $.map(response.data, function (dataItem) {
                    var name = dataItem.NAME;
                    var sname = dataItem.SNAME;
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
                    var nameLower = sname.toLowerCase();
                    var inputName = originalQuery.toLowerCase();
                    if (nameLower.indexOf(inputName) >= 0) {
                        return {value: name, data: dataItem.CODE};
                    }
                })
            };
        },

        onSearchComplete: function (query, suggestions) {
            $('.b-input-label.b-input-label--error').toggleClass('active', suggestions.length === 0);
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.b-city-selection__item').toggle(suggestions.length !== 0);
            } else {
                $('.b-city-selection__item').show();
            }
        },
        appendTo: $('#id-city-search'),
        onSelect: function (suggestion) {
            var code = suggestion.data;

            var url = $('#id-pick-city-search').parents('form').attr('action');
            $('#id-pick-city-search-val').val(suggestion.data);
            $('#id-pick-city-search').parents('form').submit();
        },
    });

    $('#id-pick-city-search-pvz').autocomplete({
        serviceUrl: dataUrlAutocomplite,
        dataType: 'json',
        minChars: 2,
        maxHeight: 10000,
        autoSelectFirst: true,

        transformResult: function (response, originalQuery) {
            return {
                suggestions: $.map(response.data, function (dataItem) {
                    var name = dataItem.NAME;
                    var sname = dataItem.SNAME;
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
                    var nameLower = sname.toLowerCase();
                    var inputName = originalQuery.toLowerCase();
                    if (nameLower.indexOf(inputName) >= 0) {
                        return {value: name, data: dataItem.CODE};
                    }
                })
            };
        },

        onSearchComplete: function (query, suggestions) {
            $('.b-input-label.b-input-label--error').toggleClass('active', suggestions.length === 0);
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.b-city-selection__item').toggle(suggestions.length !== 0);
            } else {
                $('.b-city-selection__item').show();
            }
        },
        appendTo: $('#id-city-search-pvz'),
        onSelect: function (suggestion) {
            var code = suggestion.data;

            var url = $('#id-pick-city-search-pvz').parents('form').attr('action');
            $('#id-pick-city-search-pvz-val').val(code);

            $.get('/ajax/pvz.php?code='+code,function (data) {
                var redirect = data.redirect
                if (redirect) location.href = redirect;
            })

            //$('#id-pick-city-search-pvz').parents('form').submit();
        },
    });
    /**
     * Получаем данные координат пользователя
     * */
    if (0) ymaps.ready(function () {
        if (getCookie('user_city_id')===undefined) {
            ymaps.geolocation.get({

            // Зададим способ определения геолокации
                provider: 'auto',

                // Включим автоматическое геокодирование результата.
                autoReverseGeocode: true
            }).then(function (result) {

            // Выведем результат геокодирования.
                var data = (result.geoObjects.get(0).properties.get('metaDataProperty'));
                window.mylocation = data;
                var Asrdata = data.GeocoderMetaData.AddressDetails.Country.AdministrativeArea;
                var name = Asrdata.SubAdministrativeArea.Locality.LocalityName;

                var code = data.GeocoderMetaData.id;

                // console.log(name, code);
                $('.js-set-my-city').data('code', code);

                /**
             * Записали занчение
             */
                $('.js-open-popup.js-one-open .js-text').text(name);
                $('.js-open-popup.js-one-open').attr('title', name);
                $('.js-title-popup').text('ВАШ ГОРОД ' + name + '?');
            // $('.js-your-city span').text(name);


            // $('.js-your-city').addClass('active').css({
            //     'display': 'block',
            //     'z-index': '10',
            //     'opacity': 1
            // });
            });
        }
    });

    /**
     * Клик на ссылку города
     */
    $(document).on('click','.js-set-my-city,.js-my-city',function () {
        // console.log(this);

        var url = $(this).data('url');
        var code = $(this).data('code');
        var title = $(this).attr('title');

        // клик на ссылку фильтрации
        // if ($(this).hasClass('js-stores-city')) {
        //     $('.js-stores').data('code',code);
        //     $('.js-stores').html(title);
        //     $('.js-stores').attr('title',title);
        //     $('.js-popup-section.opened .js-close-popup').click();
        //     return;
        // }

        // if ($(this).hasClass('js-cart-city')) {

        //     var $cart = $('.js-cart');
        //     $cart.data('code',code);
        //     $cart.html(title);
        //     $cart.attr('title',title);
        //     $('.js-popup-section.opened .js-close-popup').click();

        //     var url = $cart.data('url');
        //     var data = $cart.data();
        //     var method = $cart.attr('method'); if (!method) {
        //         method = 'GET';
        //     }
        //     $.ajax({
        //         url: url,
        //         method: method,
        //         data: data,
        //         dataType: 'json',
        //         success: function (json) {
        //             window.popupAddAndEdit(json);
        //             if (json.reload) {
        //                 location.reload(true);
        //             }
        //             if (json.redirect) {
        //                 location.href(json.redirect);
        //             }
        //         },
        //         error: function (e) {
        //             console.info(e);
        //         }
        //     });
        //     return;
        // }

        if (window.mylocation && $(this).hasClass('js-get-loction')) {

            var Asrdata = window.mylocation.GeocoderMetaData.AddressDetails.Country.AdministrativeArea;

            var AdministrativeAreaName = Asrdata.AdministrativeAreaName;
            var SubAdministrativeAreaName = Asrdata.SubAdministrativeArea.SubAdministrativeAreaName;
            var LocalityName = Asrdata.SubAdministrativeArea.Locality.LocalityName;


            data = {
                name: LocalityName,
                'region-name': AdministrativeAreaName+' '+SubAdministrativeAreaName
            };
        } else {
            data = {code: code};
        }

        sendCode(url, data, getTypeQuery($('#id-pick-city-search').parents('form')[0]));
    });

    /**
     * сохранине информации о куках
     * @param json
     */
    var setUserCityId = function (code) {
        var date = new Date(0);
        document.cookie='user_city_id=; path=/; ' +'expires='+date.toUTCString();

        setTimeout(function () {
            var d = new Date();
            d.setDate(d.getDate() + 30);
            document.cookie='user_city_id='+code+'; path=/; ' +'expires='+d;
        },1);
    };

    // возвращает cookie с именем name, если есть, если нет, то undefined
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    var sendCode = function (url, data, type) {
        // console.log(url, data, type);
        $.ajax({
            type: type,
            'url': url,
            'dataType': 'json',
            data: data,
            success: function (json) {
                var code = json.data.CODE;
                setUserCityId(code);

                if (json.reload) {
                    location.reload(true);
                }
                if (Boolean(json.redirect)) {
                    location.href = json.redirect;
                }
            }
        });
    };

});
