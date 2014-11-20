define(function (require) {
    require('./ngModule').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: '/app/views/index.html',
            controller: 'IndexController'
        });

        $locationProvider
            .html5Mode(false)
            .hashPrefix('');
    }]);
});