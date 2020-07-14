// ====================
// robinzon: mask
// 05.04.2018: Malich
// ---------------------
// Маска
// ====================
define(['jquery', 'jquery-mask'], function ($) {

    /* *
     * Маска для формы "Обратный звонок" и "Контакты"
     * Вид: +7 ___ - ___ __ __
     */

    $('body').on('initMask',function () {
        $('input.js-phone').unmask().removeClass('masked').mask('+7 000-000 00 00').addClass('masked');
        $('input.js-phone').each(function () {
            var $this = $(this);
            var val = $this.val();
            if (val=='') return;
            if ($this.hasClass('masked')) $this[0].setSelectionRange(99,99);
        })
    })

    $(document).on('keyup','input.js-phone',function (e) {
        var $this = $(this);
        var val = $this.val();

        if (val=='') {
            $this.removeClass('masked').unmask();
        } else {
            //$('body').trigger('initMask');
        }

    });

    $(document).on('input', 'input.js-phone',function (e) {
        var $this = $(this);
        var val = $this.val();

        setTimeout(function () {
            var val = $this.val();
            $this.removeClass('masked').unmask();
            if (val[0]==8) val = val.substr(1);
            $this.val(val);
            $('body').trigger('initMask');
        })

    });

    $(document).on('paste', 'input.js-phone',function (event) {
        var paste = (event.clipboardData || window.clipboardData || event.originalEvent.clipboardData).getData('text');

        if (paste[0]==8) paste = paste.substr(1);
        $('input.js-phone').val(paste);
        $('body').trigger('initMask');
        event.preventDefault();
    });

    //$('body').trigger('initMask');
});
