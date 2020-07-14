define(['jquery'], function ($) {
    const $c = $('.b-city-stores');

    if ($c.length === 0) {
        return;
    }

    $c.on('click', '.b-link--stores-tab', function (e) {
        const $this = $(this);

        if (!$this.hasClass('active')) {
            const index = $this.parent().find('.b-link--stores-tab').index(this);
            $this.parent().find('.b-link--stores-tab.active').removeClass('active');
            $this.addClass('active');
            $c.trigger('toggle-tab', [index]);

            var $main = $('.js-hover-main');
            var target = $('.b-stores--store-item.active').find('.js-link-hover').attr('data-hover-target');
            var $img = $('.js-image-hover[data-hover-id=\'' + target + '\']');
            var duration = 350;
            var src = $img.attr('src');

            $main.stop().animate({
                opacity: .3,
            }, duration, function () {
                $main.attr('src', src);
                $main.stop().animate({
                    opacity: 1,
                }, duration);
            });
        }
        return e.preventDefault();
    });

    $c.on('toggle-tab', function (e, index) {
        $c.find('.b-stores--store-item.active').removeClass('active');
        $c.find('.b-stores--store-item').get(index).classList.add('active');
    });
});
