;
define(function (require) {
    var plugin = require('./ngModule');
    var name = 'controller_' + plugin.name;
    var service = require('./service');
    plugin.module.controller(name, [
        '$scope',
        'backendService',
        service.name,
        function ($scope, backendService, service) {
            $scope.allBackends = [];
            backendService.getAll().then(function (backend) {
                $scope.allBackends = backend;
                if (!$scope.block.backend) {
                    $scope.block.backend = $scope.allBackends[0] || null;
                }
            });
        }
    ]);

    return {
        name: name
    };
});