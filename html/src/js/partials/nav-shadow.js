define(['jquery'], function ($) {

    if ($('.js-shadow').length) {

        $('.js-shadow').on('scroll',function () {
            var $this = $(this);
            var scroll = $this.scrollLeft();

            $this.removeClass('js-shadow-left js-shadow-right');
            if (scroll > 0) {
                $this.addClass('js-shadow-left');
            }
            if (scroll + $(this).innerWidth() < $(this)[0].scrollWidth) {
                $this.addClass('js-shadow-right');
            }
        });
    }
});
