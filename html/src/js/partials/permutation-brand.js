// ====================
// robinzon: permutation brand
// 13.02.2018: drtvader
// ---------------------
// пермутейшен бренда для карточки товара
// ====================

define(['jquery'], function ($) {
    if ($('.js-brand-block').length > 0) {
        var permutationBlockfirst = $('.js-brand-block'),
            permutationBlocksecond = $('.js-tablet-brand'),
            permutationHereBlock = $('.js-brand-default'),
            permutationDelivery = $('.js-delivery-list-top'),
            permutationDeliveryMob = $('.js-mobile-delivery'),
            permutationDeliveryDefault = $('.js-delivery-default'),
            permutationAviability = $('.js-product-aviability'),
            permutationAviabilityDef = $('.js-default-aviability');

        var adaptive = function () {
            if (window.innerWidth >= 1024) {
                permutationHereBlock.prepend(permutationBlockfirst);
                permutationDeliveryDefault.prepend(permutationDelivery);
                permutationAviabilityDef.prepend(permutationAviability);
            } else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
                permutationBlocksecond.prepend(permutationBlockfirst);
                permutationDeliveryDefault.prepend(permutationDelivery);
                permutationAviabilityDef.prepend(permutationAviability);
            } else if (window.innerWidth < 768) {
                permutationHereBlock.prepend(permutationBlockfirst);
                permutationDeliveryMob.prepend(permutationDelivery);
                permutationBlocksecond.prepend(permutationAviability);
            }
        };
        adaptive();

        $(window).resize(function () {
            if (permutationBlockfirst.length > 0) {
                adaptive();
            }
        });
    }
});
