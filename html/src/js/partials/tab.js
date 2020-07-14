/**
* RTD: tab
* 04-08-2017: drtvader
* ---------------------
* табы
*/

define(['jquery'], function ($) {

    var isMobile = Boolean(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||// eslint-disable-line 	max-len
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));// eslint-disable-line 	max-len

    // var filtering = false;

    var setFilter = function ($this, _, isResize) {

        if (Boolean($this)===false || $this.is(':visible')===false) return;
        var width = $this.outerWidth();
        var left = (!isMobile) ? $this.offset().left : $this[0].getBoundingClientRect().left;
        var $block = $this.parents('.' + _.blockClass);
        var $scrollbar = $block.find('.' + _.navClass);
        var myLeft;
        var myCssLeft;
        var $tabOpen;
        var $tab;
        var speed = _.animate?300:0;
        var speedNav = $scrollbar.width()?400:0;
        isResize = isResize || false;

        $tabOpen = $('.' + _.tabClass + '[' + _.attrTabCont + '="' + $this.data('tab') + '"]');


        // if (_.$container != null && _.$container.length > 0) {
        //     scrollbar = $this.parents('.' + _.containerClass).find('.' + _.navClass);
        // } else {
        //     scrollbar = _.$nav;
        // }

        // console.log();

        // $scrollbar = $this.parents('.' + _.containerClass).find('.' + _.navClass);
        // console.log($scrollbar);

        // $scrollbar = _.$nav;

        if (!isMobile) {
            myLeft = $scrollbar.offset().left;
            myCssLeft = parseInt($scrollbar.css('left'));
        } else {
            myLeft = $scrollbar[0].getBoundingClientRect().left;
            myCssLeft = parseInt($scrollbar['0'].offsetLeft);
        }

        // myLeft = (!isMobile) ? scrollbar.offset().left : scrollbar[0].getBoundingClientRect().left;
        // myCssLeft = (!isMobile) ? parseInt(scrollbar.css('left')) : parseInt(scrollbar['0'].offsetLeft);

        // if ($tabOpen.length) {

        // Анимация скролл-бара
        $block.find('.' + _.linkClass).parent().removeClass('active-static');
        $scrollbar.animate({
            'left': myCssLeft - (myLeft - left) + 'px',
            'width': width + 'px'
        }, speedNav, 'swing', function () {
            filtering = false;
        });
        // }

        if (!isResize) {

            if (_.$container !== null && _.$container.length > 0) {
                $tab = $this.parents('.' + _.containerClass).find('.' + _.tabClass);
            } else {
                $tab = _.$tab;
            }

            // Получаем таб на открытие
            // $tabOpen = $('.' + _.tabClass + '[' + _.attrTabCont + '="' + $this.data('tab') + '"]');

            $block.find('.' + _.linkClass).parent().removeClass('active');

            $this.parent().addClass('active');

            if ($tabOpen.length) {

                // Удоляем у всех табов и линков класс active
                _.$tab.removeClass('active');
                // $block.find('.'+_.linkClass).parent().removeClass('active');

                // Ставим класс active открываюшемося табу
                // $this.parent().addClass('active');
                $tabOpen.addClass('active');

                // Анимация табов
                if (!isResize ) {
                    $block.find('.'+_.tabClass).stop().animate({ // Скрытие таба
                        opacity: 0,
                        display: 'none'
                    }, speed, function () { // Действие
                        
                        $(this).css('display', 'none');

                        $tabOpen.css({ // Установка стилей для открываюшегося таба
                            display: 'block',
                            opacity: 0
                        }).stop().animate({ // Показ нового таба
                            opacity: 1
                        }, speed, function () { // Конечное действие

                        });
                    });
                }
                
            }
        }
    };
    
    function getFindActive($selector) {
        var activeTab;
        $selector.each(function (index, value) {
            if ($(this).parent().hasClass('active')) {
                activeTab = $(this);
            }
        });

        if (Boolean(activeTab)===false){
            activeTab = $selector.first();
        }

        return activeTab;
    }

    function initTabs(options) {
        var _ = {
            $container: null,
            $tab: $('.' + options.tab),
            $nav: $('.' + options.nav),
            $link: $('.' + options.link),
            containerClass: options.container,
            tabClass: options.tab,
            navClass: options.nav,
            blockClass: options.block,
            linkClass: options.link,
            attrTabCont: options.attrTabCont,
            isResize: options.isResize,
            animate:false
        };
        var timeResizeClear;
        var ancor = location.hash.substring(1);

        _.$container = ('container' in options)?$('.' + options.container):null;

        if (_.$link.length > 0) {
            if (_.$container !== null) {
                _.$container.each(function () {
                    setFilter(getFindActive($(this).find('.' + _.linkClass)), _);
                });
            } else {
                setFilter(getFindActive(_.$link), _);
            }
        }

        _.$link.on('click', function () {
            if (!$(this).parent().hasClass('active')) {
                // ищем ссылки с точно таким же data-tab, как у нажатой ссылки
                // и каждому вызываем setFilter
                _.$link
                    .filter('[data-tab=\"' + $(this).data('tab') + '\"]')
                    .each(function () {
                        setFilter($(this), _);
                    });
            }
        });

        $('body').on('initTab',function (e) {
            var $tab = $('[data-tab="' + e.tab + '"]');
            if ($tab.length){
                setFilter($tab, _);
            }

        })

        if (_.isResize) {
            $(window).resize(function () {
                clearTimeout(timeResizeClear);
                timeResizeClear = setTimeout(function () {
                    $('.js-tab-block').each(function () {
                        var $e = $(this).find('li.active .js-tab-link');
                        setFilter($e, _, 1);
                    });
                }, 50);
            });
        }

        $('.js-horizontal-scroll,.b-tab__tab-nav-list').on('scroll',function(){
            clearTimeout(timeResizeClear);
            timeResizeClear = setTimeout(function () {
                $('.js-tab-block').each(function () {
                    var $e = $(this).find('li.active .js-tab-link');
                    setFilter($e, _, 1);
                });
            }, 50);
        });

        $('.js-tab-block').each(function () {
            var $e = $(this).find('.js-tab-link:first');
            setFilter($e, _);
        });

        if (ancor.length > 1 && $('[data-tab-content="'+ancor+'"].js-tab-content')){
            $('[data-anchor-link="'+ancor+'"]').click();
        }
        _.animate = true;
    }

    initTabs({
        block: 'js-tab-block',
        tab: 'js-tab-content',
        nav: 'js-line-nav',
        link: 'js-tab-link',
        attrTabCont: 'data-tab-content',
        isResize: true,
    });


    $('body').on('initTabs',function () {
        initTabs({
            block: 'js-tab-block',
            tab: 'js-tab-content',
            nav: 'js-line-nav',
            link: 'js-tab-link',
            attrTabCont: 'data-tab-content',
            isResize: true,
        });
    });

    //$('body').trigger('initTabs');

    // initTabs({
    //     container: 'js-open-calendar',
    //     tab: 'js-tab-content-calendar',
    //     nav: 'js-line-nav-calendar',
    //     link: 'js-tab-link-calendar',
    //     attrTabCont: 'data-tab-content',
    //     isResize: false,
    // });

});
