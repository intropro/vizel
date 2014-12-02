;
define(function (require) {
    require('../services/queryPluginsManager');
    require('../services/clusterService');
    var clusterModel = require('../models/cluster');
    require('../ngModule').controller('ClusterListController', function ($scope, clusterService, queryPluginsManager, $modal) {
        $scope.list = [];

        $scope.createNew = function(){
            var newCluster = clusterModel.factory({
                endPoint:'http://localhost:9090/query'
            });
            $scope.editInDialog(newCluster);
        };

        $scope.remove = function(cluster){
            var decision = confirm('Are you sure you want to remove the cluster ' + cluster.name + '?');
            if(decision){
                clusterService.removeById(cluster.id);
            }
        };

        $scope.editInDialog = function (cluster) {
            $modal.open({
                templateUrl: '/app/views/editCluster.html',
                controller: function ($scope, $modalInstance, cluster, plugins) {
                    $scope.cluster = cluster;
                    $scope.plugins = plugins;

                    $scope.close = function () {
                        $modalInstance.close();
                    };

                    $scope.save = function () {
                        clusterService.saveOne($scope.cluster);
                        $modalInstance.close();
                    };
                },
                size: '',
                resolve: {
                    plugins: function(){
                        var plugins = queryPluginsManager.getAll();
                        return plugins;
                    },
                    cluster: function () {
                        return cluster;
                    }
                }
            });
        };

        $scope.plugins = queryPluginsManager.getAll();

        clusterService.getAll().then(function (clusters) {
            $scope.list = clusters;
        });
    });
});