define(function (require) {
    require('./services/queryPluginsManager');
    require('./ngModule').config(['$routeProvider', '$locationProvider', 'queryPluginsManagerProvider', function ($routeProvider, $locationProvider, queryPluginsManagerProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/views/index.html',
            controller: 'IndexController'
        });
        var sqlPlugin = require('sqlQueryPluginModule');
        var markdownPlugin = require('markdownQueryPluginModule');

        queryPluginsManagerProvider.registerPlugin(sqlPlugin.plugin.name, sqlPlugin.plugin);
        queryPluginsManagerProvider.registerPlugin(markdownPlugin.plugin.name, markdownPlugin.plugin);

        $locationProvider
            .html5Mode(false)
            .hashPrefix('');
    }]);
});