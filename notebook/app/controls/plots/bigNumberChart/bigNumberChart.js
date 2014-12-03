;
define(function (require) {
    var d3 = require('d3');
    var $ = require('jquery');

    function plotted(element, number) {
        var el = d3.select(element);

        var format = d3.format('0,000');

        var lastNumber = number || 0;

        var data = {
            val: number
        };

        var offsetWidth,
            offsetHeight,
            width,
            height,
            padding,
            fontSize,
            isIncreased = true;

        var plotLabel = el.append('div').attr('class', 'plot-label');
        plotLabel.classed('up', isIncreased);
        plotLabel.classed('down', !isIncreased);
        //arrows
        plotLabel.append('span').attr('class', 'arrow up').text('▲');
        plotLabel.append('span').attr('class', 'arrow down').text('▼');

        var arrow = plotLabel.selectAll('.arrow');
        var text = plotLabel.append('span').attr('class', 'value').datum(data);
        var points = plotLabel.append('span').attr('class', 'points').text('%');

        onResize();

        function onResize() {
            calculateVariables();
            updateSizes();
        }

        function calculateVariables() {
            offsetWidth = $(el.node()).width();
            offsetHeight = $(el.node()).height();
            width = offsetWidth > offsetHeight ? offsetHeight : offsetWidth;
            height = width;
            padding = width / 20;
            fontSize = height * 2 / 3;
        }

        function updateSizes() {
            text
                .attr("font-weight", "bold")
                .style("font-size", fontSize + "px")
                .style("line-height", fontSize + "px")
                .text(function (d) {
                    return format(d.val);
                });

            plotLabel
                .style('width', width - padding * 2 + 'px')
                .style('left', padding + 'px')
                .style('top', padding + (height - fontSize) / 2 + 'px');

            arrow
                .style('font-size', fontSize / 3 + 'px');

            points
                .style('font-size', fontSize / 3 + 'px');
        }

        function updateData(number) {
            data.val = number;
            isIncreased = lastNumber <= number;
            plotLabel.classed('up', isIncreased);
            plotLabel.classed('down', !isIncreased);
            text.text(function (d) {
                return format(d.val);
            });
        }


        var onResizeWindow = function () {
            onResize();
        }

        $(window).on('resize', onResizeWindow);

        return {
            updateData: updateData,
            updateSizes: onResize,
            destroy: function () {
                $(window).off('resize', onResizeWindow);
            }
        };
    }

    require('../../../ngModule').directive('plotBigNumberChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/bigNumberChart/bigNumberChart.html',
            scope: {
                model: '=plotData'
            },
            link: function ($scope, element, attrs) {
                $scope.data = {
                    val: 0
                };

                var plot = plotted(element.find('.big-number-chart')[0]);

                $scope.$watch('data.val', function () {
                    plot.updateData($scope.data.val);
                });

                $scope.destroyPlot = function () {
                    plot.destroy();
                }
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;

                $scope.updateData = function (key, value, groupBy) {
                    var lastItem = $scope.model.data.length > 0 ? $scope.model.data[$scope.model.data.length - 1] : $scope.model.data[0];
                    $scope.data.val = lastItem ? parseInt(lastItem[key], 10) || 0 : 0;
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

                $scope.$watch('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$on('$destroy', function () {
                    $scope.destroyPlot();
                })

            }
        };
    });
});