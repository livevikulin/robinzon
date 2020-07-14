require.config({
    waitSeconds: 0,
    baseUrl: '/html/build/js',
    urlArgs: 'bust=2020052011858',
    paths: {
        jquery: 'jquery/jquery.min',
        html5shiv: 'bower_components/html5shiv/dist/html5shiv.min',
        modernizr: 'external/modernizr-custom',
        'jquery.lazy': 'external/jquery.lazy',
        ofi: 'external/ofi.min',
        'jquery-validation': 'bower_components/jquery-validation/dist/jquery.validate.min',
        'jquery-mask': 'bower_components/jquery-mask-plugin/dist/jquery.mask',
        nouislider: 'bower_components/nouislider/distribute/nouislider.min',
        slick: 'bower_components/slick-carousel/slick/slick.min',
        'webui-popover': 'bower_components/webui-popover/dist/jquery.webui-popover',
        rubber: 'external/rubberband',
        'jQuery-menu-aim': 'bower_components/jQuery-menu-aim/jquery.menu-aim',
        'utatti-perfect-scrollbar': 'bower_components/utatti-perfect-scrollbar/dist/perfect-scrollbar.common',
        'devbridge-autocomplete': 'bower_components/devbridge-autocomplete/dist/jquery.autocomplete.min',
        'perfect-scrollbar': 'bower_components/perfect-scrollbar/js/perfect-scrollbar',
        inobounce: 'bower_components/inobounce/inobounce',
        'jquery-mask-plugin': 'bower_components/jquery-mask-plugin/dist/jquery.mask.min',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        'slick-carousel': 'bower_components/slick-carousel/slick/slick',
        elevatezoom: 'bower_components/elevatezoom/jquery.elevatezoom',
        zoom: 'external/jquery.zoom.min',
        bodyScrollLock: 'external/bodyScrollLock',
        detect: 'external/detect'
    },
    packages: [

    ],
    shim: {
        'jQuery-menu-aim': [
            'jquery'
        ],
        'jquery.lazy': [
            'jquery'
        ],
        elevatezoom: [
            'jquery'
        ],
        slick: [
            'jquery.lazy'
        ],
        zoom: [
            'jquery'
        ],
        'webui-popover': [
            'jquery'
        ]
    }
});

// - Модули, подключаемые на всех страницах
require([
    'modernizr',
    'ofi',
    // 'rubber', //switched off due causing scroll events issues
    'detect',
    'devbridge-autocomplete',
    'partials/popup',
    'partials/search-header',
    'partials/open-menu-mobile',
    'partials/menu-aim',
    'partials/object-fit',
    'partials/autocomplete-city',
    'partials/autocomplete-header',
    'partials/popover-account',
    'partials/popover-basket',
    'partials/permutation-city-selection',
    'partials/popup-events',
    'partials/validation',
    'partials/mask',
    'partials/ajax',
    'partials/events',
    'partials/scroll-horizontal',
    'partials/anchor-link',
    'partials/jquery.lazy',
    'partials/scroll-horizontal',
    'partials/page-smooth-scrolling',
]);
