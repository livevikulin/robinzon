// ====================
// robinzon: popup-events
// 05.04.2018: Malich
// ---------------------
// Попап "Обратный звонок" или "Контакты"
// ====================

// // TODO: Спросить у максимке.js зачем этот код и почему ошибка в $form[0].reset();

// define(['jquery'], function ($) {
//     'use strict';

//     $('.js-open-popup').on('popup.open', function () {
//         var $popup = $('.b-popup[data-popup=\'' + ($(this).attr('data-popup')) + '\']');
//         var $form = $popup.find('.js-validation-form');
//         $form[0].reset();
//         $form[0].validator.resetForm();
//     });

//     $('.js-recall').on('popup.open', function (event) {
//         var $popup = $('.b-popup[data-popup=\'' + ($(this).attr('data-popup')) + '\']');
//         var $popupCont = $popup.find('.js-cont-recall');
//         var $popupMsg = $popup.find('.js-message-recall');
//         $popupMsg.hide();
//         $popupCont.show();
//     });

//     $('.js-registration-link').on('popup.open', function (event) {
//         var $popup = $('.b-popup[data-popup=\'' + ($(this).attr('data-popup')) + '\']');
//         var $form = $popup.find('.js-registration');
//         var $button = $popup.find('.js-reg');
//         $button.attr('data-popup', '');
//         $button.removeClass('disable');
//     });
// });
