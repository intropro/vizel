;
define(function (require) {
    var d3 = require('d3');
    var $ = require('jquery');
    require('../../../ngModule').directive('plotLineChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/lineChart/lineChart.html',
            scope: {
                model: '=plotData'
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;
                $scope.data = [];
                $scope.options = {
                    chart: {
                        type: 'lineChart',
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 75
                        },
                        clipEdge: true,
                        staggerLabels: true,
                        transitionDuration: 500,
                        stacked: false,
                        xAxis: {
                            axisLabel: 'X'
                        },
                        yAxis: {
                            axisLabel: 'Y'
                        }
                    }
                };

                $scope.$watch('config.key', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('config.value', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watchCollection('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.updateData = function updateData(x, y, groupBy) {
                    $scope.options.chart.xAxis.axisLabel = x || 'X';
                    $scope.options.chart.yAxis.axisLabel = y || 'Y';

                    if (groupBy) {
                        $scope.data.length = 0;
                        $scope.data.push.apply($scope.data,
                            d3.nest()
                                .key(function (d) {
                                    return d[groupBy];
                                })
                                .rollup(function (list) {
                                    return calculateValues(list, x, y);
                                })
                                .entries($scope.model.data));
                    } else {
                        $scope.data.splice(0, $scope.data.length, {
                            key: $scope.options.chart.xAxis.axisLabel,
                            values: calculateValues($scope.model.data, x, y)
                        });
                    }
                };

                function calculateValues(data, x, y) {
                    var keyGroups = [
                        []
                    ];

                    if (!x) {
                        keyGroups = data;
                    } else {
                        var keys = [];
                        data.forEach(function (d) {
                            var c = d[x];
                            if (keys.indexOf(c) == -1) {
                                keys.push(c);
                            }
                        });
                        keyGroups = keys.map(function (d) {
                            return [];
                        });

                        data.forEach(function (d) {
                            keyGroups[keys.indexOf(d[x])].push(d);
                        });
                    }

                    var values = keyGroups.map(function (d, i) {
                        var valueObject = {
                            x: x && d[0] ? d[0][x] : i + 1,
                            y: 0
                        };
                        if ($.isArray(d)) {
                            valueObject.y = d3.sum(d, function (data, index) {
                                if (y) {
                                    var val = data[y];
                                    return typeof val === 'number' && !isNaN(val) ? val : 1;
                                } else {
                                    return 1;
                                }
                            });
                        } else {
                            if (y) {
                                var val = d[y];
                                valueObject.y = typeof val === 'number' && !isNaN(val) ? val : 1;
                            } else {
                                valueObject.y = 1;
                            }
                        }
                        return valueObject;
                    });

                    return values;
                }
            }
        }
    });
})
;