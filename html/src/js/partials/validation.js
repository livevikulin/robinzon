// ====================
// robinzon: validation
// 05.04.2018: Malich
// ---------------------
// Валидация
// ====================
define(['jquery', 'jquery-validation'], function ($) {
    var geoLocationName;
    var validSettings = {
        invalidHandler: function (event, validator) {
            regDisable($(this));
        }
    };

    // Сообшения
    $.extend($.validator.messages, {
        required: 'Поле обязательно к заполнению',
        email: 'E-mail некорректен',
        tel: 'Телефон некорректен',
        'geo-city': 'Местоположение не верно',
        'myself-selected': 'Необходимо выбрать',
        minlength: $.validator.format('Введите не менее {0} символов')
    });

    // Text
    $.validator.addMethod('text', function (value, element) {
        regDisable($(this.currentForm));
        return this.optional(element) || value.length > 0;
    }, $.validator.messages.required);

    // E-mail
    $.validator.addMethod('email', function (value, element) {
        regDisable($(this.currentForm));
        var rexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.optional(element) || rexp.test(value);
    }, $.validator.messages.email);

    // Tel
    $.validator.addMethod('tel', function (value, element) {
        var rexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{14,17}$/;
        return this.optional(element) || rexp.test(value);
    }, $.validator.messages.tel);

    $.validator.addMethod('geo-city', function (value, element) {
        var bool = value.toLocaleLowerCase().indexOf(geoLocationName.toLocaleLowerCase()) >= 0;
        return this.optional(element) || bool;
    }, $.validator.messages['geo-city']);

    $.validator.addMethod('myself-selected', function (value, element) {
        var bool = value.length;
        if ($('.js-myself-selected:checked').length==0) return true;
        return bool;
    }, $.validator.messages['gmyself-selected']);

    $.validator.addMethod("requiredphone", function (value, element) {
            return value.length || $.trim($('[name="ONECLICK[EMAIL]"]').val());
        },
        $.validator.messages.required);

    $.validator.addMethod("requiredemail", function (value, element) {
            return value.length || $.trim($('[name="ONECLICK[PERSONAL_PHONE]"]').val());
        },
        $.validator.messages.required);

    $.validator.addMethod("onlyRU", function (value, element) {
            return  /^[А-ЯЁ][а-яё]*$/ig.test(value);
        },
        'Только русские буквы');



    // Роли для полей
    $.validator.addClassRules({
        'js-email': {
            email: true
        },
        'js-phone': {
            tel: true
        },
        'js-onlyRU': {
            onlyRU: true
        },
        'js-myself-selected-value': {
            'myself-selected': true
        },
        'js-geo-city': {
            'geo-city': true
        }
    });

    $(document).on('input', 'input.js-no-numb', function () {
        this.value = this.value.replace(/[\d]/g, '');
    });

    $(document).on('input', 'input.js-only-numb', function () {
        this.value = this.value.replace(/[^\d]/g, '');
    });

    $(document).on('input', 'input.js-no-ru', function () {
        this.value = this.value.replace(/[А-Яа-я]/g, '');
    });

    function regDisable($form) {
        if ($form.hasClass('js-registration')) {
            setTimeout(function () {
                if ($form.find('input.error').length) {
                    $form.find('.js-reg').addClass('disable');
                } else {
                    $form.find('.js-reg').removeClass('disable');
                    $form.find('.js-reg').attr('data-popup', attrRegLink);
                }
            }, 0);
        }
    }

    var attrRegLink = $('.js-reg').attr('data-popup');

    $('body').on('validate', function () {
        $('.js-validation-form').each(function () {
            this.validator = $(this).validate(validSettings);
        });
        $("#buy_one_click_form").validate({
            rules: {
                'ONECLICK[NAME]': {required: true},
                'ONECLICK[PERSONAL_PHONE]': {required: true},
                'ONECLICK[EMAIL]': {
                    //requiredemail: true,
                    email:true
                }
            }
        });

        $("#buy-in-shop-2").validate({
            rules: {
                'name-member': {required: true},
                'password-login': {required: true},
            }
        });
    });

    $('body').trigger('validate');
});
