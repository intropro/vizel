;
define(function (require) {
    var d3 = require('d3');
    var $ = require('jquery');
    require('../../../ngModule').directive('plotPieChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/pieChart/pieChart.html',
            scope: {
                model: '=plotData'
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;
                $scope.data = [];
                $scope.options = {
                    chart: {
                        type: 'pieChart',
                        x: function (d) {
                            return d.key;
                        },
                        y: function (d) {
                            return d.y;
                        },
                        showLabels: true,
                        transitionDuration: 500,
                        labelThreshold: 0.01,
                        legend: {
                            margin: {
                                top: 5,
                                right: 35,
                                bottom: 5,
                                left: 0
                            }
                        }
                    }
                };
                $scope.updateData = function (x, y) {
                    var keyGroups = [
                        []
                    ];

                    if (!x) {
                        keyGroups = $scope.model.data;
                    } else {
                        var keys = [];
                        $scope.model.data.forEach(function (d) {
                            var c = d[x];
                            if (keys.indexOf(c) == -1) {
                                keys.push(c);
                            }
                        });
                        keyGroups = keys.map(function (d) {
                            return [];
                        });

                        $scope.model.data.forEach(function (d) {
                            keyGroups[keys.indexOf(d[x])].push(d);
                        });
                    }

                    var values = keyGroups.map(function (d, i) {
                        var valueObject = {
                            key: x && d[0] ? d[0][x] : i + 1,
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

                    $scope.data.splice(0, $scope.data.length);
                    $scope.data.push.apply($scope.data, values);
                };

                $scope.$watchCollection('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('config.key', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('config.value', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });
            }
        };
    });
});