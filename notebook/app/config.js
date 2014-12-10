define(function (require) {
    require('./services/queryPluginsManager');
    require('./controllers/IndexController');
    require('./controllers/NotebookListController');
    require('./controllers/BackendListController');

    require('./ngModule').config(['$routeProvider', '$locationProvider', 'queryPluginsManagerProvider', function ($routeProvider, $locationProvider, queryPluginsManagerProvider) {
        $routeProvider.when('/notebook', {
            templateUrl: '/app/views/notebooks.html',
            controller: 'NotebookListController'
        });
        $routeProvider.when('/notebook/:id', {
            templateUrl: '/app/views/index.html',
            controller: 'IndexController'
        });
        $routeProvider.when('/backends', {
            templateUrl: '/app/views/backendList.html',
            controller: 'BackendListController'
        });
        $routeProvider.otherwise({
            redirectTo: '/notebook'
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