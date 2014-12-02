;
define(function (require) {
    var plugin = require('./ngModule');
    var name = 'controller_' + plugin.name;
    var service = require('./service');
    plugin.module.controller(name, [
        '$scope',
        'clusterService',
        service.name,
        function ($scope, clusterService, service) {
            $scope.allClusters = [];
            clusterService.getAll().then(function (clusters) {
                $scope.allClusters = clusters;
                if (!$scope.block.cluster) {
                    $scope.block.cluster = $scope.allClusters[0] || null;
                }
            });
        }
    ]);

    return {
        name: name
    };
});