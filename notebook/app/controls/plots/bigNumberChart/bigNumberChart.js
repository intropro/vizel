;
define(function (require) {
    var d3 = require('d3');
    var $ = require('jquery');

    function plotted(element, number) {
        var el = d3.select(element);

        //var format = d3.format('0,000');
        var format = d3.format('0');


        var lastNumber = number || 0;

        var data = {
            val: lastNumber
        };

        var offsetWidth,
            offsetHeight,
            width,
            height,
            padding,
            fontSize,
            isIncreased = true,
            numberWidth;

        var plotLabel = el.append('div').attr('class', 'plot-label');
        plotLabel.classed('up', isIncreased);
        plotLabel.classed('down', !isIncreased);
        //arrows
        plotLabel.append('span').attr('class', 'arrow up').text('▲');
        plotLabel.append('span').attr('class', 'arrow down').text('▼');

        var arrow = plotLabel.selectAll('.arrow');
        var text = plotLabel.append('span').attr('class', 'value').datum(data);
        var textUtilSpan = plotLabel.append('span')
            .attr('class', 'value')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .datum(data);

        onResize();

        function onResize() {
            calculateVariables();
            updateSizes();
        }

        function calculateVariables() {
            offsetWidth = $(el.node()).width() || 400;
            offsetHeight = $(el.node()).height() || 400;
            width = offsetWidth > offsetHeight ? offsetHeight : offsetWidth;
            height = width;
            padding = width / 20;
            fontSize = height / 4;
        }

        function updateSizes() {
            plotLabel
                .style('width', width - padding * 2 + 'px')
                .style('left', padding + 'px')
                .style('top', (height - fontSize) / 2 + 'px');

            arrow
                .style('font-size', fontSize / 4 + 'px');

            var arrowWidth = $(arrow.node()).width();
            var plotLabelWidth = $(plotLabel.node()).width();
            numberWidth = plotLabelWidth - arrowWidth;

            calculateFontSizeByNumberLength();
        }

        function calculateFontSizeByNumberLength(number) {
            textUtilSpan
                .style("font-size", fontSize + "px")
                .style("line-height", fontSize + "px")
                .text(function (d) {
                    return format(d.val);
                });
            var textFontSize = fontSize;
//            setTimeout(function () {
                var node = $(textUtilSpan.node());
                var w = node.width();
                var h = node.height();
                var width2Height = w/h;
                var fontCoef = width2Height/(numberWidth/fontSize);
                if (w > numberWidth) {
                    textFontSize = fontSize / fontCoef;
                }
                text
                    .style("font-size", textFontSize + "px")
                    .style("line-height", textFontSize + "px")
                    .text(function (d) {
                        return format(d.val);
                    });
//            }, 0);
        }

        function updateData(number) {
            data.val = number;
            isIncreased = lastNumber <= number;
            lastNumber = number;
            plotLabel.classed('up', isIncreased);
            plotLabel.classed('down', !isIncreased);

            calculateFontSizeByNumberLength(data.val);
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