// ====================
// RBZ: ajax-suitcase 
// 26-04-2018: Malich
// ---------------------
// Кастомный ajax для формы филтр "Какой чемодан нужен вам?"
// ====================

define(['jquery'], function ($) {
   
    var xhrSuitcase;
    var timeIdSuitcase;
    $(document).on('change', '.js-ajax-custom', function (e) {
        if ($(this).attr('type') != 'text') {
            ajaxCustom($(this), e);
        }

        // return false;
    });

    if ($('.js-ajax-custom').length){
        $('.js-ajax-custom:first').trigger('change');
    }

    // Событие для js-ajax-custom, чтобы можно было тригерить на опред элементах
    $('.js-ajax-custom').on('ajax.custom', function (e) {
        ajaxCustom($(this), e);
    });

    function ajaxCustom($this, e) {
        var $form = $this.parents('form');
        var $button = $form.find('.js-button-suitcase');
        var url = $form.data('url');
        var method = $form.data('method');
        var dataSend = $form.serialize();
        var timeout = 1000;
        // e.preventDefault();

        // Вид загрузки "Включили"
        $('.js-loader').css('display', 'inline-block');

        // Абортим ajax
        if (xhrSuitcase && xhrSuitcase.readyState != 4) {
            xhrSuitcase.abort();
            xhrSuitcase = null;
        }

        clearTimeout(timeIdSuitcase);
        timeIdSuitcase = setTimeout(function () {

            // Делаем запрос
            xhrSuitcase = $.ajax({
                url: url,
                method: method,
                data: dataSend,
                success: function (data) {

                    $button.text(
                        declOfNum(data.cnt,['Подобран', 'Подобрано', 'Подобрано'])+' '+
                        data.cnt+' '+
                        declOfNum(data.cnt,['чемодан', 'чемодана', 'чемоданов'])
                    );

                    $button.on('click', function () {
                        $(this).addClass('b-button--more-item active');
                    });
                    
                    $form.attr('action', data.url);
                    $button.attr('href', data.url);
                    // Вид загрузки "Выключили"
                    $('.js-loader').css('display', 'none');
                },
                error: function () {

                    // Вид загрузки "Выключили"
                    $('.js-loader').css('display', 'none');
                }
            });

        }, timeout);
    }

    /**
     * Склонение числительных
     * @param number
     * @param titles
     * @returns {*}
     */
    function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
});