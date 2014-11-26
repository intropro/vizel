requirejs.config({
    baseUrl: '/',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        jqueryUi: 'bower_components/jquery-ui/jquery-ui.min',
        angular: 'bower_components/angular/angular',
        ngRoute: 'bower_components/angular-route/angular-route',
        ngSanitize: 'bower_components/angular-sanitize/angular-sanitize',
        angularResource: 'bower_components/angular-resource/angular-resource',
        uiBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap',
        uiBootstrapTpls: 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
        jsPlumb: 'bower_components/jsPlumb/dist/js/jquery.jsPlumb-1.6.4',
        bootstrapJs: 'bower_components/bootstrap/dist/js/bootstrap.min',
        d3: 'bower_components/d3/d3',
        nvd3: 'bower_components/nvd3/nv.d3',
        'angular-nvd3': 'bower_components/angular-nvd3/dist/angular-nvd3',

        ngTable: 'bower_components/ng-table/ng-table',

        jsPlumbModule: 'app/components/jsPlumb',
        codemirrorLib: 'bower_components/codemirror/lib/codemirror',
        'uiCodemirror': 'bower_components/angular-ui-codemirror/ui-codemirror',
        'codemirror-sql': 'bower_components/codemirror/mode/sql/sql',
        'codemirror-js': 'bower_components/codemirror/mode/javascript/javascript',
        'ng-datamap': 'app/directives/angular-datamaps',
        'topojson': 'bower_components/topojson/topojson',
        'datamaps': 'bower_components/datamaps/dist/datamaps.all',
        '../../lib/codemirror': 'bower_components/codemirror/lib/codemirror',
        'codemirrorWrapper': 'vendor/codemirrorWrapper',

        'markdown': 'vendor/markdown-browser-0.6.0-beta1/markdown'
    },
    packages: [
        {
            name: 'templateCacheModule',
            location: 'app/modules/template-cache'
        },
        {
            name: 'sqlQueryPluginModule',
            location: 'app/modules/queryPlugins/sql'
        },
        {
            name: 'markdownQueryPluginModule',
            location: 'app/modules/queryPlugins/markdown'
        }
    ],
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        jsPlumb: {
            exports: 'jsPlumb',
            deps: ['jqueryUi']
        },
        ngRoute: {
            deps: ['angular']
        },
        ngSanitize: {
            deps: ['angular']
        },
        bootstrapJs: {
            deps: ['jquery']
        },
        d3: {
            exports: 'd3'
        },
        nvd3: {
            deps: ['angular', 'd3']
        },
        'angular-nvd3': {
            deps: ['angular', 'nvd3']
        },
        uiCodemirror:{
            deps: ['angular', 'codemirror-sql', 'codemirrorWrapper']
        },
        'uiBootstrap':{
            deps: ['angular', 'uiBootstrapTpls']
        },
        uiBootstrapTpls:{
            deps: ['angular']
        },
        'topojson': {
            deps: ['d3']
        },
        'datamapLib': {
            deps: ['d3', 'topojson']
        },
        'ng-datamap': {
            deps: ['datamaps']
        },
        'markdown': {
            exports: 'markdown'
        }
    },
    deps: ['bootstrapJs']
});

require(['app/bootstrap']);
