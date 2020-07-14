define(['jquery'], function ($) {

    $(document).find('.js-hover').hover(function () {
        var src = $(this).data('hover');
        if (src) {
            $(this).attr('src', src);
        }
    }, function () {
        var src = $(this).data('src');
        if (src) {
            $(this).attr('src', src);
        }
    });

    var transformDuration = '.300';

    $('body').on('ajax.advice', function (event) {
        var json = event.json;

        $('[data-target=".js-advice-content"]').data('id', json.data.id);
    });

    // Форма "Обратный звонок" и "Контакты"
    $('body').on('ajax.recall', function (event) {
        var type = event.type + '.' + event.namespace;
        var name = $('#id-recall-name').val();
        var $popup = $('.js-ajax-form[data-events="' + type + '"]').parents('[data-popup]');
        var $link = $('.js-recall[data-popup="' + $popup.attr('data-popup') + '"]').first();
        $('#js-recall-name').text(name);

        // console.log($popup);
        // $($link).trigger('popup.onClose', function() {
        // console.log('call!!');
        $popup.find('.js-cont-recall').hide();
        $popup.find('.js-message-recall').show();
        // $link.trigger('popup.onOpen');
        // });
    });

    $('body').on('my_event', function (event) {
        var json = e.json;
        $(json.target).parents('.js-ajax-link').attr('data-id', json.id);
    });

    $('body').on('recommendedShowMore', function (event) {
        var data = event.json.data;
        var type = data.type;
        var text = data.link_text;
        var link = data.link;
        var $text = $('[data-type="'+type+'"] .js-replaced-text');

        if ($text.attr('data-count-query') == undefined) {
            $text.attr('data-count-query', 1);
            firstAnimate(data);
        } else if ($text.attr('data-count-query') == 1) {
            $text.attr('data-count-query', 2);
            secondAnimate(data);
            $text.text(text);
            $text.parents('.js-ajax-link').attr('href', link).removeClass('js-ajax-link');
        }
        $('body').trigger('lazy');
    });

    /* *
     * Получаем элементы из страници и пришедшие с сервера
     * @param maxCountElem {int} - максимальное кол-во элементов с сервера для отображение
     * @param data {html object} - html котороя содержит все элементы, которые пришли
     * @return {object} - возврашаем объект с двумя параметрами
     */
    function getElemsObject(maxCountElem, data) {
        var $jsonItems = [];
        var test = false;
        var i = 0;
        var type = data.type;

        var $recItemShow = $('.js-recommended-item'+'.js-'+type).filter(function () {
            return $(this).css('display') !== 'none';
        });

        while ($jsonItems.length < maxCountElem) {

            test = $($(data.html)[i]).attr('class');

            if (Boolean(test)) {
                $jsonItems.push($(data.html)[i]);
            }
            i++;
        }

        return {
            $jsonItems: $jsonItems,
            $recItemShow: $recItemShow,
        };
    }

    function firstAnimate(data) {
        var maxCountElem = $('[data-firstanimate]:visible').data('firstanimate');

        var $elems = getElemsObject(maxCountElem, data);
        var elems = [];

        $elems.$recItemShow.css('overflow', 'hidden');
        $elems.$recItemShow.each(function (index) {
            var $jsonItem = $($elems.$jsonItems[index]).children().addClass('js-query-item');
            $(this).children().addClass('js-remove-item');
            $jsonItem.css({
                position: 'relative',
                top: $(this).height() * -1,
                transform: 'none',
                transition: transformDuration + 's ease',
                transform: 'translateX(100%)',
            });
            $(this).append($jsonItem);
            elems.push($jsonItem);
        });

        showRecomment(elems, 0, maxCountElem-1);
    }

    // Возвращает случайное число между min (включительно) и max (включительно)
    function generateArrayRandomNumber(min, max) {
        var totalNumbers = max - min + 1,
            arrayTotalNumbers = [],
            arrayRandomNumbers = [],
            tempRandomNumber;

        while (totalNumbers--) {
            arrayTotalNumbers.push(totalNumbers + min);
        }

        while (arrayTotalNumbers.length) {
            tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
            arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
            arrayTotalNumbers.splice(tempRandomNumber, 1);

        }

        return arrayRandomNumbers;
    }

    function secondAnimate(data) {
        var elems = [];
        var maxCountElem = $('[data-secondanimate]:visible').data('secondanimate');
        var n = 3;
        var i = 0;
        var $elems = getElemsObject(maxCountElem, data);

        $elems.$recItemShow.css('overflow', 'hidden');
        $elems.$recItemShow.children().addClass('js-remove-item');

        for (i = 0; i < maxCountElem; i++) {
            var $first = $($elems.$recItemShow[0]);
            var $this = $($elems.$recItemShow[i - n]);
            var $jsonItem = $($elems.$jsonItems[i]);

            $jsonItem.children().addClass('js-query-item');
            elems.push($jsonItem.children());
            if (i < 4) {
                $jsonItem.css('overflow', 'hidden');
                $first.addClass('js-remove-item-out');
                var left = $first.offset().left;

                $first.css({
                    position: 'absolute',
                    left: left,
                    zIndex: 0,
                });

                $jsonItem.css({
                    position: 'relative',
                });

                $jsonItem.children().css({
                    transform: 'none',
                    transition: transformDuration + 's ease',
                    transform: 'translateX(100%)',
                    zIndex: 1
                });

                $first.after($jsonItem);
            } else {
                $jsonItem.children().css({
                    position: 'relative',
                    top: $this.height() * -1,
                    transform: 'none',
                    transition: transformDuration + 's ease',
                    transform: 'translateX(100%)',
                });
                $this.append($jsonItem.children());
            }
        }
        showRecomment(elems, 0, maxCountElem-1);
    }

    function showRecomment(elemArray, min, max, randomArray, i) {
        if (randomArray === undefined) {
            randomArray = generateArrayRandomNumber(min, max);
        }

        if (i === undefined) {
            i = 0;
        }

        timeoutPromise(30).then(function () {
            var promises = [];
            if (i < randomArray.length) {
                var n = 0,
                    step = 2; // по скольку за раз показывать
                while (n < step) {
                    var $elem = $(elemArray[randomArray[i]]);

                    $elem.css('transform', 'translateX(0%)');
                    promises.push(queryItemPromise($elem));
                    n++;
                    i++;
                }

                Promise.all(promises).then(function () {
                    showRecomment(elemArray, min, max, randomArray, i);
                });
            }
        });
    }

    function queryItemPromise($elem) {
        return new Promise(function (resolve) {
            $elem.on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function () {
                $(this).removeClass('js-query-item');
                $(this).siblings('.js-remove-item').remove();
                $(this).attr('style', '');
                $(this).parent().attr('style', '');

                if ($('.js-replaced-text').attr('data-count-query') === 2) {
                    setTimeout(function () {
                        $('.js-remove-item-out').remove();
                    }, 2000);
                }

                resolve();
            });
            // костыль на случай если эвент не сработал
            setTimeout(function () {
                resolve();
            },500);
        });
    }

    function timeoutPromise(duration) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, duration);
        });
    }

    $('body').on('subscribepopup',function () {
        $('.b-subscribe__form')
            .addClass('js-open-popup')
            .trigger('popup.onOpen');

        var date = new Date(new Date().getTime() + 60+60*24*355 * 1000);
        document.cookie = "subscribed=1; path=/; expires=" + date.toUTCString();

        mindbox("async", {
            operation: "UserSubscribe",
            data: {
                customer: {
                    email: $('#subscribe').val(),
                    subscriptions: [
                        {
                            pointOfContact: "email"
                        }
                    ]
                }
            }
        });

    });

    $('body').on('item-subscribe-success',function () {
        $('#item-subscribe-form')
            .addClass('js-open-popup')
            .trigger('popup.onOpen');
    });

    $('body').on('buy1click',function (event) {
        var data = event.json.data;
        console.log(
            data,
            event
        );
        if (data.URL) {
            $.ajax({
                url: data.URL,
                success: function (html) {
                    $('div[data-popup="for-one-click-success"]').html(html);
                    $('<a data-popup="for-one-click-success" class="js-open-popup">').appendTo('body').click().remove();

                },
                error: function (e,log) {
                    console.log('error', log);
                }
            });
        }
    });

    $('body').on('reservationDone', function (event) {
        var data = event.json.data;
        var price = data.price;
        var mobilePhone = data.mobilePhone;
        var transactionId = data.transactionId;
        var id = data.id;
        var name = data.name;

        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '235192850427181');
        fbq('track', 'PageView');
        fbq('track', 'Purchase', {
            value: price,
            currency: 'RUB',
        });

        window.dataLayer = window.dataLayer || [];
        /*window.dataLayer.push({
            'event': 'purchase_1_click',
            'transactionId': transactionId,
            'transactionAffiliation': 'new.robinzon.ru',
            'transactionTotal': price,
            'transactionTax': 0,
            'transactionShipping': 0,
            'transactionProducts': [{
                'sku': id,
                'name': name,
                'price': price,
                'quantity': 1
            }]
        });*/

        window.dataLayer_YM.push({
            "ecommerce": {
                "purchase": {
                    "actionField": {
                        "id" : transactionId
                    },
                    "products": [ {
                        "id": id,
                        "name": name,
                        "price": price,
                        "quantity": 1
                    }]
                }
            }
        });

        //Criteo Sales dataLayer

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'crto_transactionpage',
            crto: {
                'email': '<?=$USER->GetEmail();?>',
                'transactionid':transactionId,
                'products': [{
                    id: id,
                    price: price,
                    quantity: '1'
                }]
            }
        });

        
        if (Boolean(data.mindbox)) {
            mindbox("sync", {
                operation: "CheckCustomerPhone",
                data: {
                    customer: {
                        mobilePhone: mobilePhone
                    }
                },
                onSuccess: function(result) {
                    if (Boolean(result.customer) && Boolean(result.customer.ids) && Boolean(result.customer.ids.mindboxId)) {// пользователь найден
                        var _mindbox = data.mindbox;
                        _mindbox.operation = 'CreateOrderNoRegistration';
                        delete _mindbox.data.customer.fullName;
                        delete _mindbox.data.customer.email;
                        delete _mindbox.data.customer.subscriptions;
                        mindbox("async", _mindbox);
                    } else {//пользователь не найден
                        mindbox("async", data.mindbox);
                    }
                },
                onError: function(error) {

                }
            });
        }
    })
});
