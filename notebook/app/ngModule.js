define(function (require) {
    require('ngRoute');
    require('ngSanitize');
    require('uiBootstrap');
    require('angular-nvd3');
    require('uiCodemirror');
    require('ng-datamap');
    require('templateCacheModule');
    var sqlPlugin = require('sqlQueryPluginModule');
    var markdownPlugin = require('markdownQueryPluginModule');

    var appModule = require('angular')
        .module('notebook', [
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap',
            'ui.bootstrap.tpls',
            'nvd3',
            'ui.codemirror',
            'datamaps',
            'templateCache',
            sqlPlugin.moduleName,
            markdownPlugin.moduleName
        ]);

    return appModule;
});