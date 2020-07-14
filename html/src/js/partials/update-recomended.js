/**
 * Created by biyk on 26.03.18.
 */


define(['jquery'], function ($) {

    $('body').on('setRecomended', function (event) {
        var width = window.innerWidth || document.body.clientWidth;
        var count = 3;
        var show = true;
        var forAnimate = function (count) {

            $('[data-type] .js-replaced-text').each(function () {
                var $this  = $(this);
                var showPics1 = count+2;
                var showPics2 = count+2+3;

                $this.parents('[data-firstanimate]').data('firstanimate',showPics1);
                $this.parents('[data-secondanimate]').data('secondanimate',showPics2);


            });
        };

        $('.b-recommended__content-slave').each(function () {
            var $c = $(this);
            var $moreLink = $c.find('.b-recommended-item.js-ajax-link');
            if (width < 320) {
            } else if (width >= 320 && width <768) {
                // 320-767 - пока выводится просто 4 товара в целом.
                count = 4;
                if ($moreLink.length===0) {
                    count--;
                }
                show = true;
            } else if (width >= 768 && width <1170) {
                // 768-1169 - 5 и "показать еще"
                count = 5;
                show = true;
            } else if (width >= 1170) {
                // 1170+ - 3 товара и "показать еще"
                count = 3;
                show = true;
            }
            forAnimate(count);
            if ($moreLink.length===0) {
                count++;
            }

            $c.find('.b-recommended-item').hide().each(function (i,e) {
                if (i >= count) {
                    return false;
                }
                $(e).show();
            });

            if (show) {
                $moreLink.show();
            } else {
                $moreLink.hide();
            }
            
        });

    });


    $('body').on('updateRecomended', function (event) {
        var json = event.json;
        var width = window.innerWidth || document.body.clientWidth;
        var count = 3;
        var show = true;
        var target = json.target;
        var $moreLink = $('.b-recommended__content-slave .b-recommended-item.js-ajax-link');

        $('.b-recommended__content-slave').each(function () {
            var $c = $(this);
            var $moreLink = $c.find('.b-recommended-item.js-ajax-link');

            if ($c.hasClass(target)===false) {
                return;
            }

            if (width < 320) {
            } else if (width >= 320 && width <768) {
                // 320-767 - пока выводится просто 4 товара в целом.
                count = 4;
                if ($moreLink.length===0) {
                    count--;
                }
                show = true;
            } else if (width >= 768 && width <1170) {
                // 768-1169 - 5 и "показать еще"
                count = 5;
                show = true;
            } else if (width >= 1170) {
                // 1170+ - 3 товара и "показать еще"
                count = 3;
                show = true;
            }

            if ($moreLink.length===0) {
                count++;
            }

            $c.find('.b-recommended-item').hide().each(function (i,e) {
                if (i >= count) {
                    // return false;
                }
                $(e).show();
            });

            if (show) {
                // $moreLink.show();
            } else {
                $moreLink.hide();
            }
        });


    });

    $(window).resize(function () {
       $('body').trigger('setRecomended');
    });

    $('body').trigger('setRecomended');

});

