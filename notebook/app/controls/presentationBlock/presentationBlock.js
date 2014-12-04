;
define(function (require) {
    var d3 = require('d3');
    require('../../ngModule').directive('presentationBlock', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/presentationBlock/presentationBlock.html',
            scope: {
                block: '=presentationData'
            },
            controller: ['$scope', '$modal', function ($scope, $modal) {
                $scope.types = {
                    grid: 'grid',
                    multiBarChart: 'multiBarChart',
                    lineChart: 'lineChart',
                    pieChart: 'pieChart',
                    mapChart: 'mapChart',
                    percentsChart: 'percentsChart',
                    bigNumberChart: 'bigNumberChart'
                };

                $scope.selectType = function (type) {
                    if(type !== $scope.types.grid){
                        $scope.prevType = type;
                    }
                    $scope.block.type = type;
                };

                $scope.prevType = $scope.types.multiBarChart;

                var $parentScope = $scope;

                $scope.showPlotOptions = function(block, plotOptions) {
                    $modal.open({
                        templateUrl: '/app/views/plotOptions.html',
                        controller: function($scope, $modalInstance, block){
                            $scope.block = block;
                            $scope.types = $parentScope.types;


                            $scope.selectType = function (type) {
                                if(type !== $scope.types.grid){
                                    $scope.prevType = type;
                                    $parentScope.prevType = type;
                                }
                                $scope.block.type = type;
                            };

                            $scope.prevType = $parentScope.prevType;

                            $scope.close = function(){
                                $modalInstance.close();
                            }
                        },
                        size: 'lg',
                        resolve: {
                            block: function () {
                                return block;
                            }
                        }
                    });
                };
            }]
        };
    })
});