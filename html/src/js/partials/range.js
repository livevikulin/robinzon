// ====================
// 4P: range
// 31-10-2017: Mell.Blimm
// ---------------------
// ====================

define(['jquery','nouislider'], function ($,noUiSlider) {

    if ($('.js-slider-range').length > 0) {

        function getRegxpStr(rexp, val) {
            var newStr = '';
            var i;
            if (rexp != undefined) {
                for (i = 0; i < val.length; i++) {
                    if (rexp.test(val[i])) {
                        newStr += val[i];
                    }
                }
                return newStr;
            } else {
                return val;
            }
        }

        function setPin(element, min, max) {
            element.noUiSlider.set([min, max]);
        }

        function toggleResetButton(curValMin, curValMax, min, max) {
            if (parseInt(curValMin) > min || parseInt(curValMax) < max || $('.js-checkbox-change:checked').length > 0) {
                if (!$('.js-reset-link-block').hasClass('active')) {
                    $('.js-reset-link-block').addClass('active').slideDown();
                }
            } else {
                $('.js-reset-link-block').removeClass('active').slideUp();
            }
        }

        function isNumber(val) {
            return !Number.isNaN(parseInt(val));
        }

        function noUiDottleSlide(options, optionsSlider) {
            var rexpStr = /[0-9\s]/;
            var rexpReplace = /\s/g;

            // На ходим все элементы созданные с классом options.toddleSlide
            var elements = document.querySelectorAll(options.toddleSlide);

            // Цикл по элементам
            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                // Объявляем переменные
                // и находим те которые нам нужны
                var $min = $(element).parent().find('.js-price-min');
                var $max = $(element).parent().find('.js-price-max');
                var lastMin = parseInt($min.attr('data-min'));
                var lastMax = parseInt($max.attr('data-max'));
                var clearMinId;
                var clearMaxId;
                var inputs = [];

                // Заполняем массив по очередности расположения точек в слайдере
                // слево на право
                inputs.push($min[0]);
                inputs.push($max[0]);


                optionsSlider.range = {
                    max: parseInt($max.attr('data-max')),
                    min: parseInt($min.attr('data-min')),
                };

                optionsSlider.start = [parseInt($min.val()), parseInt($max.val())];

                // Создали ползунок для элемента из массива и передали ему опции из optionsSlider
                noUiSlider.create(element, optionsSlider);

                // Обработка собития на палзунок, noUiSlider имеет свой .on(), также для каждого элемента свой
                element.noUiSlider.on('update', function (values, handle) {
                    // inputs[handle].value = Math.round(values[handle]).toLocaleString('ru-RU') + ' ₽';
                    inputs[handle].value = Math.round(values[handle]).toString().replace(/.(?=(?:.{3})+$)/g, '$& ');

                    var $input = $(inputs[handle]);
                    var val;

                    if (parseInt($input.val())>optionsSlider.range.min || parseInt($input.val())<optionsSlider.range.max) {
                        $input.trigger('rangestart');
                    }

                    // if (handle > 0) {
                    //     toggleResetButton(Math.round(values[handle - 1]), Math.round(values[handle]), optionsSlider.range.min, optionsSlider.range.max);
                    // } else {
                    //     toggleResetButton(Math.round(values[handle]), Math.round(values[handle + 1]), optionsSlider.range.min, optionsSlider.range.max);
                    // }

                    val = parseInt($input.val().replace(rexpReplace, ''));
                    if ($input.hasClass('js-price-min')) {
                        if (val != lastMin) {
                            $input.trigger('ajax.custom');
                            lastMin = val;
                        }
                    } else {
                        if (val != lastMax) {
                            $input.trigger('ajax.custom');
                            lastMax = val;
                        }
                    }
                });

                // Для инпутов max и min, задавая им событие input это как change только при вводе
                $min.on('keydown', function (event) {
                    $min.addClass('keydown');
                    var _this = this;
                    var val;

                    if (isNumber(event.key) ||
                        event.keyCode == 9 ||
                        event.keyCode == 8 ||
                        event.keyCode == 13) {
                        clearTimeout(clearMinId);
                        clearMinId = setTimeout(function () {

                            // if (event.keyCode != 9) {

                            val = parseInt(_this.value.replace(rexpReplace,''));

                            // Проверка на число на NaN
                            if (val.toString() != 'NaN') {
                                // _this.value = val; 
                                // Проверяем чтобы min былм меньше или ровно max и также больше или равна 0, тогда
                                if (val <= parseInt($max.val().replace(rexpReplace,'')) && val >= optionsSlider.range.min) {

                                    // мы ставим в писанное значение в наш ranged-slider
                                    setPin(element, val, null);

                                    // Если же min больше чем max,
                                } else if (val >= parseInt($max.val().replace(rexpReplace,''))) {

                                    setPin(element, val, val);
                                }
                            } else {
                                // setPin(element, optionsSlider.range.min, null);
                            }

                            // toggleResetButton(_this.value, parseInt($max.val()), optionsSlider.range.min, optionsSlider.range.max);
                            // }

                            if (isNumber(event.key)) {
                                $(_this).trigger('ajax.custom');
                            }
                            setTimeout(function () {
                                $min.removeClass('keydown');
                            },1000);

                        }, 1500);
                    } else {
                        return false;
                    }
                });

                $max.on('keydown', function (event) {
                    var _this = this;
                    var val;
                    $max.addClass('keydown');
                    if (isNumber(event.key) ||
                        event.keyCode == 9 ||
                        event.keyCode == 8 ||
                        event.keyCode == 13) {

                        clearTimeout(clearMaxId);
                        clearMaxId = setTimeout(function () {

                            // if (event.keyCode != 8) {
                            val = parseInt(_this.value.replace(rexpReplace,''));
                            // Проверка на число на NaN
                            if (val.toString() != 'NaN') {
                                _this.value = val;

                                // Если max больше или равен min и max меньше или равен максимально заданное число, то все ок
                                if (val >= parseInt($min.val().replace(rexpReplace,'')) && val < optionsSlider.range.max) {

                                    // Ставим наше значение
                                    setPin(element, null, val);

                                    // В ином случае если max больше или равен max
                                } else if (val >= optionsSlider.range.max) {

                                    // Ставим наше значение
                                    // val = optionsSlider.range.max[0] + ' р';
                                    setPin(element, null, optionsSlider.range.max);

                                    // В ином случае, если max меньше чем min,
                                } else if (val < parseInt($min.val().replace(rexpReplace,''))) {

                                    // Тогда к min присвоим max, проверяя не слишком ли бы ушли
                                    if (val >= 0) {
                                        setPin(element, val, val);
                                    }
                                }
                            } else {
                                // setPin(element, null, optionsSlider.range.max);
                            }

                            // toggleResetButton(parseInt($min.val()), _this.value, optionsSlider.range.min, optionsSlider.range.max);
                            // }

                            if (isNumber(event.key)) {
                                $(_this).trigger('ajax.custom');
                            }
                            setTimeout(function () {
                                $max.removeClass('keydown');
                            },1000);
                        }, 2000);
                    } else {
                        return false;
                    }
                });

                $max.on('blur', function (event) {

                    if (Number.isNaN(parseInt($(this).val().replace(rexpReplace,'')))) {
                        $(this).val(optionsSlider.range.max);
                        setPin(element, null, optionsSlider.range.max);
                    }
                });

                $min.on('blur', function (event) {

                    if (Number.isNaN(parseInt($(this).val().replace(rexpReplace,'')))) {
                        $(this).val(optionsSlider.range.min);
                    }
                });

            }
        }

        if ($('.js-slider-range').length > 0) {
            noUiDottleSlide({
                toddleSlide: '.js-slider-range'
            }, {
                connect: true,
                // format: wNumb({
                //     thousand: '.',
                //     postfix: ' ₽',
                // })
            });
            $('body').on('update',function () {
                noUiDottleSlide({
                    toddleSlide: '.js-slider-range'
                }, {
                    connect: true,
                });
            });
            $('.js-slider-range').parents('.b-range').on('click', function (e) {
                e.stopPropagation();
            });
        }
    }


});
