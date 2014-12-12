;
define(function (require) {
    var ng = require('angular');
    var d3 = require('d3');
    var $ = require('jquery');
    var barChart = require('./barCharPluggin');

    require('../../../ngModule').directive('plotBarChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/barChart/barChart.html',
            scope: {
                model: '=plotData'
            },
            link: function ($scope, element, attrs) {
                $scope.plot = barChart(element.find('.plot-bar-chart')[0], {
                    data: $scope.data,
                    xAxis: {
                        type: $scope.model.options.keyType//'number', 'string'
                    },
                    yAxis: {
                        type: $scope.model.options.valueType//'number', 'string'
                    },
                    key: $scope.config.key,
                    value: $scope.config.value
                });

                $scope.recreatePlot = function(){
                    $scope.plot = barChart(element.find('.plot-bar-chart')[0], {
                        data: $scope.data,
                        xAxis: {
                            type: $scope.model.options.keyType//'number', 'string'
                        },
                        yAxis: {
                            type: $scope.model.options.valueType//'number', 'string'
                        },
                        key: $scope.config.key,
                        value: $scope.config.value
                    });
                };

                //update data
                $scope.$watch('data', function () {
                    if ($scope.plot) {
                        console.log($scope.data);
                        $scope.plot.updateAll($scope.data);
                    }
                });

                //resize window
                var onResizeWindowTimeout = null;
                var onResizeWindow = function () {
                    clearTimeout(onResizeWindowTimeout);
                    onResizeWindowTimeout = setTimeout(function () {
                        if ($scope.plot) {
                            $scope.plot.updateAll($scope.data);
                        }
                    }, 100);
                };
                $(window).on('resize', onResizeWindow);
                $scope.$on('$destroy', function () {
                    $(window).off('resize', onResizeWindow);
                    if ($scope.plot) {
                        $scope.plot.destroy();
                    }
                });
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;
                $scope.data = $scope.model.data;

                $scope.$watch('[config.key, config.value, config.groupBy]', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('[model.size]', function(){
                    setTimeout(function(){
                        $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                    }, 0);
                });

                $scope.$watch('[config.keyType, config.valueType]', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                    $scope.recreatePlot();
                });

                $scope.updateData = function updateData(x, y, groupBy) {
                    var keyType = $scope.model.options.keyType;
                    var valueType = $scope.model.options.valueType;

                    $scope.data = $scope.model.data.map(function (d, i) {
                        var key = x ? d[x] : i + 1;
                        var value = y ? d[y] : i + 1;
                        //key
                        if (keyType === 'datetime') {
                            key = new Date(key);
                        }
                        if (keyType === 'number') {
                            key = +key;
                        }
                        //value
                        if (valueType === 'datetime') {
                            value = new Date(value);
                        }
                        if (valueType === 'number') {
                            value = +value;
                        }
                        var result = {};
                        result[x] = key;
                        result[y] = value;
                        return result;
                    });

                };

                $scope.$watchCollection('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });
            }
        }
    });
});