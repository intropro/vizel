;
define(function (require) {
    var d3 = require('d3');
    var $ = require('jquery');
    require('../../../ngModule').directive('plotMapChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/mapChart/mapChart.html',
            scope: {
                model: '=plotData'
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;

                $scope.map = {
                    type: 'usa',
                    data: [{values: []}],
                    colors: ['#345745', '#198567', '#ff0957'],
                    options: {
                        width: null,
                        height: null,
                        legendHeight: 50, // optionally set the padding for the legend
                        legend: {
                            labels: {
                            },
                            'defaultFillName': 'No Data'
                        },
                        labels: true,
                        fills: {
                            "defaultFill": '#b9b9b9',
                            "min": '#E0E0FF',
                            "max": '#0000ff'
                        },
                        geographyConfig: {
                            popupTemplate: function (geography, data) {
                                return '<div class="hoverinfo">' +
                                    '<strong>' + geography.properties.name + '</strong>' +
                                    '<br/>' +
                                    ($scope.model.options.value || "Value") + ': ' +
                                    (data ? data["value"] : '') +
                                    '</div>';
                            }
                        }
                    }
                };

                $scope.updateData = function(x, y, groupBy){
                    var max = d3.max($scope.model.data, function (d) {
                        return d[y];
                    });
                    var min = d3.min($scope.model.data, function (d) {
                        return d[y];
                    });
                    var colorRange = ["#B0D5E8", "#03537C"];
                    var color = d3.scale.linear().domain([min, max]).range(colorRange);
                    $scope.map.data[0].values = $scope.model.data.map(function(d){
                        return {
                            location: d[x],
                            value: {
                                value: d[y],
                                color:color(d[y])
                            }
                        };
                    });
                    var fills = {
                        "defaultFill": '#b9b9b9'
                    };
                    fills[min] = colorRange[0];
                    fills[max] = colorRange[1];
                    $scope.map.options.fills = fills;
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

                $scope.$watchCollection('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });
            }
        };
    });
});