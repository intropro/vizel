;
define(function (require) {
    require('../services/queryPluginsManager');
    require('../services/backendService');
    var backendModel = require('../models/backend');
    require('../ngModule').controller('BackendListController', function ($scope, backendService, queryPluginsManager, $modal) {
        $scope.list = [];

        $scope.createNew = function(){
            var newBackend = backendModel.factory({
                endPoint:'http://localhost:9090/query'
            });
            $scope.editInDialog(newBackend);
        };

        $scope.remove = function(backend){
            var decision = confirm('Are you sure you want to remove the backend ' + backend.name + '?');
            if(decision){
                backendService.removeById(backend.id);
            }
        };

        $scope.editInDialog = function (backend) {
            $modal.open({
                templateUrl: '/app/views/editBackend.html',
                controller: function ($scope, $modalInstance, backend, plugins) {
                    $scope.backend = backend;
                    $scope.plugins = plugins;

                    if(!backend.language && plugins.length > 0){
                        backend.language = plugins[0].queryLanguage;
                    }

                    $scope.close = function () {
                        $modalInstance.close();
                    };

                    $scope.save = function () {
                        backendService.saveOne($scope.backend);
                        $modalInstance.close();
                    };
                },
                size: '',
                resolve: {
                    plugins: function(){
                        var plugins = queryPluginsManager.getAll().filter(function(p){
                            return p.needBackend === true;
                        });
                        return plugins;
                    },
                    backend: function () {
                        return backend;
                    }
                }
            });
        };

        backendService.getAll().then(function (backend) {
            $scope.list = backend;
        });
    });
});