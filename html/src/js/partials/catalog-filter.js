// ====================
// 4P: catalog-fiter
// 31-10-2017: Malich
// ---------------------
// ====================

define(['jquery', 'webui-popover', './is-mobile'], function ($, popover, isMobile) {

    if ($('.js-filter-field').length) {

        var recountWidthId;

        // Пересчет шырины фильтров
        function recountWidth() {
            return false;
            var showShowBtn = false;
            var $ShowBtn = $('.js-filter-show-more').parent();


            var $base = function(){
                return $('.b-filter__item:not(.b-filter__item--more)');
            };
            var baseHeight = function(){
                return $base().first().outerHeight(true);
            };
            var fullHeight = function(){
                return $base().first().parent().outerHeight(true);
            };

            $base().removeClass('hide');

            if (window.innerWidth < 768) return;
            for(var i=$base().length;i >= 0;i--){
                if (baseHeight() < fullHeight()){
                    showShowBtn = true;
                    $($base()[i]).addClass('hide');
                }
            }
            
            if (showShowBtn) {
                $ShowBtn.removeClass('hide');
            }else{
                $ShowBtn.addClass('hide');
            }


            $('.js-popover').parent('li').css('width', '');

            clearTimeout(recountWidthId);
            recountWidthId = setTimeout(function () {

                // Проход по всем категориям фильтра
                $('.js-popover').each(function () {
                    if ($(this).attr('data-def-text') == undefined) {
                        $(this).attr('data-def-text', $(this).text());
                    }

                    if (window.innerWidth >= 768) {
                        var $hiden;

                        if ($(this).parent('.hide').length) {
                            $hiden = $(this).parent('.hide');
                            $hiden.removeClass('hide');
                        }
                        $(this).parent('li').width($(this).outerWidth() + 2);

                        if ($hiden != undefined) {
                            $hiden.addClass('hide');
                            $hiden = undefined;
                        }
                    }
                });
            }, 10);
        }
        recountWidth();

        // Выбор элемента фильтра
        $(document).on('change', '.js-filter-field input', function () {
            var $this = $(this);
            var $popoverLink = findLinkFilter($this);
            var text = $this.parent().find('span').text();
            var $sub = $this.parents('.js-menu-in-popup-submenu');
            var code = $sub.data('submenu-id');
            var count = $sub.find(':checked').length;

            $('[data-submenu="'+code+'"]').parents('.b-filter__item').addClass('preload');

            setViewFilter(
                $popoverLink,
                $this.parents('.webui-popover').attr('id'),
                text
            );

            if ($('.js-popover').parent('.checked').length) {
                $('.js-filter-clean').addClass('show');
            }
            WebuiPopovers.hideAll();
        });

        // Клик по крестику
        $(document).on('click', '.js-delete-filter', function () {
            $(this).siblings('.js-popover')
                .text($(this).siblings('.js-popover').attr('data-def-text'))
                .parent('li').removeClass('checked')
                .width($(this).siblings('.js-popover').outerWidth() + 2);

            $('.webui-popover[id="' + $(this).siblings('.js-popover').attr('data-target') + '"]')
                .find('input:checked')
                .prop('checked', false);

            if (!$('.js-popover').parent('.checked').length) {
                $('.js-filter-clean').removeClass('show');
            }
        });

        // Кнопка "Еще", показывает отстольные фильтры
        $('.js-filter-show-more').on('click', function () {
            if ($('.js-popover').parent('.hide').length) {
                var height = $('.js-popover').parent('.hide').first().outerHeight();

                $('.js-popover').parent('.hide').removeClass('hide').addClass('show');
                $('.js-filter-clean').addClass('show');

                $(this).parent().addClass('hide');
            }
        });

        // Очишаем
        $(document).on('click', '.js-filter-clean', function () {
            if ($('.js-popover').parent('.show').length) {

                $('.js-popover').parent('.show').removeClass('show').addClass('hide');
                $('.js-filter-clean').removeClass('show');
                $('.js-filter-show-more').parent().removeClass('hide');
            }

            $('.checked .js-delete-filter').trigger('click');
        });

        // Делаем цену
        $(document).on('click', '.js-filter-accept-price', function () {
            var max = $(this).siblings('.js-filter-input').find('.js-price-max').val();
            var min = $(this).siblings('.js-filter-input').find('.js-price-min').val();
            var $popoverLink = findLinkFilter($(this));
            var text = $popoverLink.attr('data-def-text');

            if (!Number.isNaN(max) && !Number.isNaN(min)) {
                setViewFilter(
                    $popoverLink,
                    $(this).parents('.webui-popover').attr('id'),
                    text + ': ' + min + ' - ' + max
                );

                if ($('.js-popover').parent('.checked').length) {
                    $('.js-filter-clean').addClass('show');
                }
                WebuiPopovers.hideAll();
            }
        });


        $(window).resize(function () {
            recountWidth();
        });

        function setViewFilter($link, id, text) {
            $link
                //.text(text)
                .parent('li')
                .removeClass('active')
                .addClass('checked')
                .width($('.js-popover[data-target="' + id + '"]').outerWidth() + 2);
        }

        function findLinkFilter($this) {
            if (!$this.parents('.webui-popover').length) {
                return $this.parents('.js-menu-in-popup-submenu').siblings('.js-menu-in-popup-link');
            } else {
                return $('.js-popover[data-target="' + $this.parents('.webui-popover').attr('id') + '"]');
            }
		}
	}

	let $check = $('.js-check');

	$check.on('change', function() {
		if (this.checked) {
			$(this).closest('.filter-extra').find('.filter-extra-block').slideDown()
		} else {
			$(this).closest('.filter-extra').find('.filter-extra-block').slideUp()
		}
	});

	let blockCompany = $('.js-company'),
		blockColor = $('.js-color'),
		blockBrands = $('.js-brands'),
		extraOpen = $('.filter-extra-open'),
		extraClose = $('.filter-extra-close');

	extraOpen.on('click', function(e) {
		e.preventDefault();
		$(this).closest('.filter-block').find(blockCompany).css('height', 'auto')
	});
	extraClose.on('click', function(e) {
		e.preventDefault();
		$(this).closest('.filter-block').find(blockCompany).css('height', '155px')
	});

	extraOpen.on('click', function(e) {
		e.preventDefault();
		$(this).closest('.filter-block').find(blockColor).css({
			'height': 'auto',
			'overflow': 'visible'
		})
	});

	extraOpen.on('click', function(e) {
		e.preventDefault();
		$(this).closest('.filter-block').find(blockBrands).css({
			'height': 'auto',
			'overflow': 'visible'
		})
	});

	let btnOpenMobileFilterBlock = $('.js-filter-btn'),
		mobileFilterBlock = $('.js-filter-block');

	btnOpenMobileFilterBlock.on('click', function() {
		$(this).closest('.filter-block').find(mobileFilterBlock).slideToggle();
	})

});

