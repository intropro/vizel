;
define(function (require) {
    var d3 = require('d3');
    require('../../../ngModule').directive('plotMultiBarChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/multiBarChart/multiBarChart.html',
            scope: {
                model: '=plotData'
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;
                $scope.data = [];

                var lastDate = null;
                $scope.options = {
                    chart: {
                        type: 'multiBarChart',
                        transitionDuration: 1,
                        margin: {
                            top: 20,
                            right: 20,
                            bottom: 60,
                            left: 75
                        },
                        clipEdge: true,
                        staggerLabels: true,
                        stacked: false,
                        xAxis: {
                            axisLabel: 'X',
                            tickFormat: function (d, i) {
                                if (d instanceof Date) {
                                    var full = d3.time.format('%x %X');
                                    var short = d3.time.format('%X');
                                    var f = full;
                                    if(i == 0){
                                        f = full;
                                    } else {
                                        if(lastDate && lastDate.getDate() == d.getDate()){
                                            f = short;
                                        }
                                    }
                                    lastDate = d;
                                    return f(d);
                                } else {
                                    return d;
                                }
                            }
                        },
                        yAxis: {
                            axisLabel: 'Y'
                        },
                        tooltip: function(label, key, value){
                            return '<h3>' + label + '</h3>' + '<p>' + value + ' on ' + key + '</p>';
                        }
                    }
                };

                $scope.$watch('config.key', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('config.value', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('config.groupBy', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.updateData = function updateData(x, y, groupBy) {
                    $scope.options.chart.xAxis.axisLabel = x || 'X';
                    $scope.options.chart.yAxis.axisLabel = y || 'Y';

                    if (groupBy) {
                        $scope.data = d3.nest()
                            .key(function (d) {
                                return d[groupBy];
                            })
                            .rollup(function (list) {
                                return calculateValues(list, x, y);
                            })
                            .entries($scope.model.data);
                    } else {
                        var arr = calculateValues($scope.model.data, x, y);
                        if (arr.length > 0) {
                            $scope.data = [
                                {
                                    key: $scope.options.chart.xAxis.axisLabel,
                                    values: arr
                                }
                            ];
                        } else {
                            $scope.data = [];
                        }
                    }
                };

                function isDate(dateStr) {
                    return ( (new Date(dateStr) !== "Invalid Date" && !isNaN(new Date(dateStr)) ));
                }

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
                        if (valueObject.x && isDate(valueObject.x)) {
                            valueObject.x = new Date(valueObject.x);
                        }
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

                $scope.$watchCollection('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });
            }
        }
    });
});