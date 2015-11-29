require.config({
    deps: ['main'],

    paths: {
        firebase: '../assets/js/firebase/firebase',
        backbonefire: '../assets/js/backbonefire/dist/backbonefire.min',
        jquery: '../assets/js/jquery/dist/jquery.min',
        underscore: '../assets/js/underscore-amd/underscore-min',
        backbone: '../assets/js/backbone-amd/backbone-min',
        tpl: '../assets/js/requirejs-tpl/tpl',
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min',
        "bootstrap-select": '../assets/js/bootstrap-select/dist/js/bootstrap-select.min',
        sortable: '../assets/js/Sortable/Sortable.min'
    },

    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        "bootstrap-select": {
            deps: ['jquery']
        },
        backbonefire: {
            deps: ['firebase']
        }
    }
});

