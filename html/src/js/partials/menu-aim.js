// - ====================
// - 4P: menu-aim
// - 06-02-2018: VD
// - --------------------
// -  открытие десктопного меню
// - ====================

define(['jquery','partials/is-mobile', 'jQuery-menu-aim', 'partials/brand-slider'], function ($, isMobile) {

    if ($('.js-open-desktop-menu').length > 0) {

        var durationAnimateShowMenu = 200;
        var windowWidth = window.innerWidth;
        var brkpInitialAim = 1170;
        var clearTimeOutActiveMenu;
        var clearTimeOutHideMenu;
        var $this;
        var headerHeight = $('.js-page-header').outerHeight();
        var $menuDesktopAim = $('.js-menu-desktop-aim');

        $(window).resize(function () {
            windowWidth = window.innerWidth;
        });

        if (!isMobile()) {

            // показываем блок бэкграунда для страницы
            var backgroundOverCreate = function () {
                // добавляем бэкграунд поверх страницы
                $('.b-background-over').addClass('show-back');
            };

            // Скрываем блок бэкграунда для страницы
            var backgroundOverRemove = function () {
                // запускаем анимацию затухания бэкграунда страницы
                $('.b-background-over').removeClass('show-back');
            };

            $('.js-open-desktop-menu').hover(function () {
                clearTimeout($.data(this, 'timer'));
                if (windowWidth >= brkpInitialAim) {
                    var $this = $(this);
                    clearTimeOutActiveMenu = setTimeout(function () {
                        $('.js-open-desktop-menu').find('.js-menu-desktop-aim').removeClass('show-menu');
                        $('.js-open-desktop-menu').find('.b-main-nav__link').removeClass('open-menu');
                        // открыли меню
                        $this.find('.js-menu-desktop-aim').addClass('show-menu');
                        $this.find('.b-main-nav__link').addClass('open-menu');

                        // Меняем отступ сверху в зависимости от высоты хедера
                        headerHeight = $('.js-page-header').outerHeight();
                        $menuDesktopAim.css('top', headerHeight + 'px');

                        backgroundOverCreate();
                    }, durationAnimateShowMenu);
                }
            }, function () {
                clearTimeout(clearTimeOutActiveMenu);
                $.data(this,'timer', setTimeout($.proxy(function () {
                    $(this).find('.js-menu-desktop-aim').removeClass('show-menu');
                    $(this).find('.b-main-nav__link').removeClass('open-menu');
                    backgroundOverRemove();
                }, this), durationAnimateShowMenu));

            });

            $(document).on('click','.b-menu-desktop-list__close-wrap, .b-brand-wrapper__close-wrap',function () {
                $('.js-open-desktop-menu').find('.js-menu-desktop-aim').removeClass('show-menu');
                $('.js-open-desktop-menu').find('.b-main-nav__link').removeClass('open-menu');
                backgroundOverRemove();
            })
            // $('.js-open-desktop-menu').hover(
            //     //  когда навели на элемент
            //     function() {
            //         if (windowWidth >= brkpInitialAim) {
            //             var $this = $(this);
            //             clearTimeout(clearTimeOutHideMenu);
            //             clearTimeOutActiveMenu = setTimeout(function() {
            //                 $('.js-open-desktop-menu').find('.js-menu-desktop-aim').removeClass('show-menu');
            //                 $('.js-open-desktop-menu').find('.b-main-nav__link').removeClass('open-menu');
            //                 // открыли меню
            //                 $this.find('.js-menu-desktop-aim').addClass('show-menu');
            //                 $this.find('.b-main-nav__link').addClass('open-menu');

            //                 backgroundOverCreate();
            //             }, durationAnimateShowMenu);
            //         };
            //     },

            //     // когда уходим с элемента
            //     function() {
            //         if (windowWidth >= brkpInitialAim) {
            //             var $this = $(this);
            //             clearTimeout(clearTimeOutActiveMenu);
            //             clearTimeOutHideMenu = setTimeout(function() {
            //                 $this.find('.js-menu-desktop-aim').removeClass('show-menu');
            //                 $this.find('.b-main-nav__link').removeClass('open-menu');
            //                 backgroundOverRemove();
            //             }, durationAnimateShowMenu);
            //         };
            //     }
            // );
        }


        $('.js-open-desktop-menu[data-menu="mobile"]').each(function () {
            var $root = $(this);
            var title = $root.find('.b-main-nav__link').text();
            var $branches = $root.find('.b-menu-desktop-list .b-menu-desktop-list__item');
            var branches = {};
            var bTitle = '';
            var target = $root.data('target');

            var li = '        <li class="b-mobile-nav__item">\
                <a class="b-mobile-nav__link js-open-step-mobile" href="javascript:void(0);" title="">'+title+'<i class="b-icon b-icon--mobile-nav js-icon-mobile-nav icon-arrow_small_ico"></i></a>\
                <div class="b-menu-mobile b-menu-mobile--next-step js-step-mobile">\
                <div class="b-menu-mobile__item">\
                <a class="b-menu-mobile__back-link js-back-submenu" href="javascript:void(0);" title="Назад"><i class="b-icon b-icon--mobile-back-step icon-arrow-small"></i>Назад</a>\
                </div>\
                <nav class="b-mobile-nav">\
                <div class="b-mobile-nav__title">'+title+'</div>\
                <ul class="b-mobile-nav__list">';
            $branches.each(function () {
                var $branch = $(this);
                var $a = $branch.find('a') ;
                var name = $a.text();
                var link = $a.attr('href');
                if ($branch.hasClass('b-menu-desktop-list__item--title')){
                    bTitle = $branch.text();
                }else{
                    if (typeof branches[bTitle] == 'undefined'){
                        branches[bTitle] = [];
                    }
                    branches[bTitle].push(
                        {
                            name:name,
                            link:link
                        }
                    )
                }
            });

            Object.keys(branches).map(function (branch, index) {
                var branch2 = branches[branch];
                //console.log(branch,branch2);
                li+='<li class="b-mobile-nav__item">\
                    <a class="b-mobile-nav__link js-open-step-mobile" href="javascript:void(0);" title="">'+branch+'<i class="b-icon b-icon--mobile-nav js-icon-mobile-nav icon-arrow_small_ico"></i></a>\
                    <div class="b-menu-mobile b-menu-mobile--next-step js-step-mobile">\
                    <div class="b-menu-mobile__item"><a class="b-menu-mobile__back-link js-back-submenu" href="javascript:void(0);" title="Назад"><i class="b-icon b-icon--mobile-back-step icon-arrow-small"></i>Назад</a>\
                    </div>\
                    <nav class="b-mobile-nav">\
                    <div class="b-mobile-nav__title">'+branch+'\
                    </div>\
                    <ul class="b-mobile-nav__list">';

                $(branch2).each(function (){
                    var link = this.link;
                    var name = this.name;
                    li+='<li class="b-mobile-nav__item"><a class="b-mobile-nav__link" href="'+link+'" title="">'+name+'</a>\
                </li>';
                });

                li+='\
                </ul>\
                </nav>\
                </div>\
                </li>'
            });

            li+='                    </ul>\
                </nav>\
                </div>\
                </li>';
            $('.js-permutation-mobile-menu li[data-target="'+target+'"]').replaceWith(li)
        });

    }

});

function myFunction() {
    document.getElementById(".js-scroll").style.overflow = "scroll";
}