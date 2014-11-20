define(function(require){
    require('ngRoute');
    require('ngSanitize');
    require('uiBootstrap');
    require('angular-nvd3');
    require('uiCodemirror');
    require('ng-datamap');
    require('templateCacheModule');

    return require('angular').module('notebook', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.tpls', 'nvd3', 'ui.codemirror', 'datamaps', 'templateCache']);
});