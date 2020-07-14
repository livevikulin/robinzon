// ====================
// QSR: plus-minus
// 16-08-2017: Malich
// ---------------------
// Увеличение или уменьшение числа
// ====================

define(['jquery'], function ($,noUiSlider) {

    // Получаем число
    function getCountValue($this) {
        return parseInt($this.siblings(dot + countClass).val());
    }

    // Устонавливаем число
    function setCountValue($this, setValue) {
        var $input = $this.siblings(dot + countClass);
        $input.val(setValue);
        $input.trigger('change');

        fixValue($input);
        setCountClass($input, setValue);
    }

    /**
     * нормализуем значение в инпуте
     * @param $this
     */
    function fixValue($this) {
        var value = parseInt($this.val());
        if (value >= maxCount) {
            $this.val(maxCount);
        } else if (isNaN(value) || value == 0) {
            $this.val(1);
        }
    }

    /**
     * Стилизуем внешний блок счетчика
     * @param $countClick - блок
     * @param value - значение
     */
    function setCountClass($this, value) {
        // console.log(value);
        var $countClick = $this.parent(dot + contClass);
        $countClick.removeClass('start').removeClass('full');

        if (value >= maxCount) {
            $countClick.addClass('full');
        }

        if (value <= 1) {
            $countClick.addClass('start');
        }
    }

    // Проверяем, есть ли у нас вообше контейнер с "+" и "-"
    if ($('.js-plus-minus-cont').length > 0) {

        // Обявляем переменны, хронят класс
        var contClass = 'js-plus-minus-cont',
            plusClass = 'js-plus',
            minusClass = 'js-minus',
            countClass = 'js-plus-minus-count',
            dot = '.';

        // Максимальное число
        var maxCount = $('.' + countClass).attr('data-cont-max');

        // Обработка собтий
        // Обработка на +
        $(document).on('click', dot + plusClass, function () {
            // console.log(maxCount);
            var value = getCountValue($(this));
            value++;
            setCountValue($(this), value);
        });

        // Обработка на -
        $(document).on('click', dot + minusClass, function () {
            var value = getCountValue($(this));
            value--;
            setCountValue($(this), value);
        });

        // Обработка ввода в инпут, где мы можем ввести 10
        $(document).on('blur', dot + countClass, function () {
            var $this = $(this);
            var value = getCountValue($(this));
            fixValue($this);
            setCountClass($this, value);
        });

        /**
         * Стилизация при загрузке
         */
        $(dot + countClass).each(function (i, e) {
            var value = $(e).val();
            setCountClass($(e), value);
        });

        /**
         * Инициализация значения счетчкика при клике на ссылку
         */
        if ($('.js-add-set').length) {
            $(document).on('click', '.js-add-set', function () {
                var $el = $(this).siblings(dot + contClass).find(dot + plusClass);
                var value = $(this).data('count');
                setCountValue($el, value);
            });
        }
    }

});
