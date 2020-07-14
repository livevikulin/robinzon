// ====================
// Project: script
// 00-00-2017: Author
// ---------------------
// Аяксы бывают - формы и ссылки
// ====================

define(['jquery'], function ($) {

    var initEvents = function (events,json) {
        var ee = events.split(' ');

        $(ee).each(function () {
            var event = this;
            $('body').trigger({
                type: event,
                json: json
            });
        });
    };

    $(document).on('click','.js-ajax-link',function (e) {
        var $this = $(this);
        var url = $this.data('url');
        var dataSend = $this.data();

        if($(this).attr('data-get-product-id-from-attr') === 'Y') {
            dataSend.id = $this.attr('data-id');
        }

        var method = $this.data('method');
        var action = $this.data('action');

        if (action === 'add2basket') {
            $this.addClass('added');
        }

        var myAjax = function (json,$this) {
            var data = json.data;
            var target = $this.data('target');
            var events = $this.data('events');

            if ($(target).length && Boolean(data.html)) {
                $(target).html(data.html);
            }

            if (Boolean(events)) {
                initEvents(events, json);
            }

            if (action === 'ADD_TO_COMPARE_RESULT') {
                var count = $(data.html).find('.b-person__number').text();
                $('.js-compare-mobile-count').text(count).show();
            }
        }
        e.preventDefault();

        // проверяем - вдруг есть закэшированные данные
        // кэшируем только по id товаров, если потребуется кэшировать что-то еще - жаль.
        if  (Boolean(dataSend.id) && Boolean(dataSend.save)){
            var json = JSON.parse(sessionStorage.getItem('item_'+dataSend.id));
            if (Boolean(json)){
                json.dataSend = dataSend;
                myAjax(json,$this)
            }else{
                $.ajax({
                    url: url,
                    method: method,
                    data: dataSend,
                    success: function (json) {
                        sessionStorage.setItem('item_'+dataSend.id, JSON.stringify(json));
                        json.dataSend = dataSend;
                        myAjax(json,$this);
                    },
                    error: function (e,log) {
                        console.log('error', log);
                    }
                });
            }
        }else{
            $.ajax({
                url: url,
                method: method,
                data: dataSend,
                success: function (json) {
                    json.dataSend = dataSend;
                    myAjax(json,$this);
                },
                error: function (e,log) {
                    console.log('error', log);
                }
            });
        }

    });

    $(document).on('submit','.js-ajax-form',function (e) {
        var $this = $(this);
        var url = $this.data('url');
        var dataSend = $this.serialize();
        var method = $this.data('method');
        var target = $this.data('target');
        var target_2 = $this.data('target-2');
        var events = $this.data('events');
        var new_popup = $this.data('new_popup');
        var callback = $this.data('callback');

        e.preventDefault();
        if ($this.find('button').attr('disabled')) {
            return false;
        }
        $this.find('button').attr('disabled','disabled');
        $.ajax({
            url: url,
            method: method,
            data: dataSend,
            success: function (json) {
                var t, data = json.data;
                if ($(target).length && Boolean(data.html)) {
                    if(new_popup === 'Y') {
                        $(target + " .print-result-html").html(data.html);
                        $('.b-popup.open ' + target_2).fadeOut(300,function () {
                            $('.b-popup.open ' + target).fadeIn(300);
                        });
                    } else {
                        $(target).html(data.html);
                    }
                }
                if (Boolean(events)) {
                    initEvents(events, json);
                }
                if(callback) {
                    window[callback](url,method,dataSend,json); // Execute the function.
                }
                t = setTimeout(function () {
                    clearTimeout(t);
                    $this.find('button').attr('disabled', false);
                }, 500);
            },
            error: function (error) {
                $this.find('button').attr('disabled', false);
            }
        });
        return false;
    });
});
