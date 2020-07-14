// - ====================
// - 4P: open-menu-mobile
// - 07-02-2018: VD
// - --------------------
// -  открытие и закрытие мобильного меню
// - ====================
define(['jquery'], function ($) {
    if ($('.js-menu-mobile').length > 0) {

        var hamburger = $('.js-hamburger-menu-mobile'); // копка бургера (палочки)
        var mobileMenu = '.js-menu-mobile';
        var step = '.js-step-mobile';
        var noScroll = $('.js-this-scroll');
        var openStepLink = $('.js-open-step-mobile');
        var backStep = $('.js-back-submenu');
        var brkp = 1023; // брекпоинт, точка разрешения
        var wScr = window.innerWidth;
        var duration = 400;
        var $closeMobileMenuLink = $('.js-close-mobile-menu');

        // скрываем все менюшки, чтобы нормально отработал рендеринг html в мобилке (если не скрыть то тормозит все)
        $(step).not(mobileMenu).hide();

        // показываем блок бэкграунда для страницы
        var backgroundOverCreate = function () {
            // добавляем бэкграунд поверх страницы
            $('.b-background-over').addClass('show-back');
        };

        // Скрываем блок бэкграунда для страницы
        var backgroundOverRemove = function () {
            // запускаем анимацию затухания бэкграунда страницы
            if ($('.b-background-over').hasClass('show-back') == true) {
                $('.b-background-over').removeClass('show-back');
            }
        };

        // Открытие мобильного меню
        function openMobileMenu() {
            var targetElement = document.getElementsByClassName('.js-hamburger-menu-mobile');
            // bodyScrollLock.disableBodyScroll(targetElement);
            backgroundOverCreate();

            // запрещаем скролл страницы
            noScroll.css('overflow', 'hidden');

            // Добавляем класс и стили для появления меню
            $(mobileMenu).addClass('active');
        }

        // закрытие мобильного меню
        function closeMobileMenu() {
            var targetElement = document.getElementsByClassName('.js-hamburger-menu-mobile');
            // bodyScrollLock.enableBodyScroll(targetElement);
            backgroundOverRemove();

            $(step).removeClass('active'); // закрываем шаги, это если мы находимся не на первом шаге, но закрываем меню.

            // display: none для всех шагов и меню после того, как закрыли меню, чтобы анимация при открытии не тормозила
            setTimeout(function () {
                $(step).not(mobileMenu).hide();
            }, duration);

            // разрешаем скролл страницы
            noScroll.css('overflow', '');
        }

        // кликаем по шамбургеру, чтобы открыть или закрыть мобильное меню
        hamburger.on('click', function () {

            // если открыто - закрываем
            if ($(mobileMenu).hasClass('active')) {

                closeMobileMenu();

            } else { // если закрыто - открываем

                openMobileMenu();

            }

        });

        // Клик закрывающий мобильное меню по классу
        $closeMobileMenuLink.on('click', function () {
            closeMobileMenu();
        });

        $('.b-background-over').on('click', function () {
            if (wScr <= brkp) {
                closeMobileMenu();
            }
        });


        // Открытие шагов меню
        $(document).on('click', '.js-open-step-mobile', function () {
            // alert('.js-open-step-mobile');

            var $this = $(this);

            // Скроллим вверх предыдущий шаг и запрещаем ему скролл
            // По завершению открываем следующий шаг
            $this.parents('.js-step-mobile')
                .animate({
                    scrollTop: 0
                }, {
                    duration: 150,
                    complete: function () {
                        $this.next('.js-step-mobile').show().addClass('active').css('overflow', 'auto');
                    }
                })
                .css('overflow', 'hidden');

        });

        // закрытие шагов меню по кнопке "назад"
        $(document).on('click','.js-back-submenu', function () {

            var $this = $(this);
            var parent = $this.parents('.js-step-mobile');

            parent.eq(0).removeClass('active');
            parent.eq(1).css('overflow', 'auto');

            // display: none для закрытого шага меню, чтобы анимация не тормозила при закрытии всего меню
            setTimeout(function () {
                parent.eq(0).hide();
            }, duration);
        });
        var mypageY;
        var touchTimer;
        document.ontouchmove = function (event) {
            var $target = $(event.target);
            var pageY = event.touches[0].pageY || event.pageY;
            if ($target.parents('.js-step-mobile.active').length) {
                var diff = mypageY - pageY;
                var $menu = $('.js-menu-mobile.js-step-mobile');
                if (mypageY && Math.abs(diff) < 5) {
                    $menu.scrollTop($menu.scrollTop() + diff);
                }
                mypageY = pageY;
                // 29 - это внутренние отступы
                if ($menu.scrollTop() + $menu.height()+29 >=$menu[0].scrollHeight) {
                    event.preventDefault();
                    return false;
                }
            }

            clearInterval(touchTimer);
            touchTimer = setTimeout(function () {
                mypageY = false;
            },100);

            $('body').css({
                '-ms-touch-action': 'none'
            });
        };

        $(document).on('click', function (event) {
            if (!$(event.target).hasClass('js-menu-mobile') &&
                !$(event.target).parents('.js-menu-mobile').length &&
                !$(event.target).hasClass('js-hamburger-menu-mobile') &&
                !$(event.target).parents('.js-hamburger-menu-mobile').length &&
                !$(event.target).hasClass('b-popup') &&
                !$(event.target).parents('.b-popup').length &&
                !$(event.target).hasClass('js-product-list') &&
                !$(event.target).parents('.js-product-list').length) {
                if (wScr <= brkp) {
                    closeMobileMenu();
                }
            }
        });

        // переносим выбор города в мобильное меню
        function permutationCityMobile() {
            // e.prepend(s) — добавит s первым в e
            $('.js-name-city-mobile').prepend($('.js-permutation-city'));
        }

        // переносим выбор города на десктопе
        function permutationCityDesktop() {
            // e.prepend(s) — добавит s первым в e
            $('.js-permutation-city-desktop').prepend($('.js-permutation-city'));
        }

        if (window.innerWidth > 767) {
            permutationCityDesktop();
        } else {
            permutationCityMobile();
        }


        $(window).resize(function () {
            // если меню открыто и мы ресайзим до десктопа - то меню закрываем
            if (window.innerWidth > brkp &&
                $(mobileMenu).hasClass('active')) {
                closeMobileMenu();
            }

            if (window.innerWidth > 767) {
                permutationCityDesktop();
            } else {
                permutationCityMobile();
            }
        });
    }

    var classMain = '.js-mobile-nav';
    var classLink = classMain + '-link';
    var classItem = classMain + '-item';
    var classDropdown = classMain + '-dropdown';

    var nav = $(classMain);
    var topNav = nav ? nav.offset().top : 263;

    $(document).on('click', classLink, function () {
        var link = $(this);
        var parent = link.parent(classItem);

        if (link.hasClass('active')) {
            parent.find(classDropdown).slideUp();
            link.removeClass('active');
        } else {
            var parentSib = parent.siblings();
            parentSib.find(classDropdown).slideUp();
            parentSib.find(classLink).removeClass('active');
            parent.find(classDropdown).slideDown();
            link.addClass('active');
            $('.js-menu-mobile').animate(
                {scrollTop: topNav},
                500
            );
        }
    });
});
