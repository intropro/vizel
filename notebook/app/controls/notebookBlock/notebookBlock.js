define(function (require) {
    var angular = require('angular');
    require('../../ngModule').directive('notebookBlock', ['$http', 'queryPluginsManager', function ($http, queryPluginsManager) {
        return {
            restrict: 'EA',
            scope: {
                block: '=notebookBlockModel',
                removeCallback: "="
            },
            templateUrl: '/app/controls/notebookBlock/notebookBlock.html',
            controller: ['$scope', '$modal', function ($scope, $modal) {

                $scope.showBlockOptions = function () {
                    $modal.open({
                        templateUrl: '/app/views/blockOptions.html',
                        controller: function ($scope, $modalInstance, block, plugins) {
                            $scope.block = block;
                            $scope.plugins = plugins;
                            $scope.selectPlugin = function(plugin){
                                block.plugin = plugin;
                            };

                            $scope.close = function () {
                                $modalInstance.close();
                            }
                        },
                        size: '',
                        resolve: {
                            plugins: function(){
                                var plugins = queryPluginsManager.getAll();
                                return plugins;
                            },
                            block: function () {
                                return $scope.block;
                            }
                        }
                    });
                };

                $scope.removeBlock = function () {
                    $scope.removeCallback($scope.block);
                };

                $scope.decreaseSize = function(){
                    var newSize = $scope.block.availableSizes[$scope.block.availableSizes.indexOf($scope.block.size) - 1];
                    if(newSize !== undefined){
                        $scope.block.size = newSize;
                    }
                };

                $scope.increaseSize = function(){
                    var newSize = $scope.block.availableSizes[$scope.block.availableSizes.indexOf($scope.block.size) + 1];
                    if(newSize !== undefined){
                        $scope.block.size = newSize;
                    }

                };

                if($scope.block.plugin == null){
                    $scope.showBlockOptions();
                }
            }]
        }
    }]);
});