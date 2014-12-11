;
define(function (require) {
    var ng = require('angular');
    var d3 = require('d3');
    var $ = require('jquery');
    require('../../../ngModule').directive('plotBarChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/barChart/barChart.html',
            scope: {
                model: '=plotData'
            },
            link: function ($scope, element, attrs) {
                var plot = barChart(element.find('.plot-bar-chart')[0], {
                    data: $scope.data,
                    key: 'datetime',
                    value: 'watchers_quantity'
                });

            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;
                $scope.data = [
                    {
                        "id": 1,
                        "datetime": "2014-12-10T12:00:00.000Z",
                        "watchers_quantity": 0
                    },
                    {
                        "id": 2,
                        "datetime": "2014-12-10T12:01:00.000Z",
                        "watchers_quantity": 1
                    },
                    {
                        "id": 3,
                        "datetime": "2014-12-10T12:02:00.000Z",
                        "watchers_quantity": 23
                    },
                    {
                        "id": 4,
                        "datetime": "2014-12-10T12:03:00.000Z",
                        "watchers_quantity": 34
                    },
                    {
                        "id": 5,
                        "datetime": "2014-12-10T12:04:00.000Z",
                        "watchers_quantity": 31
                    },
                    {
                        "id": 6,
                        "datetime": "2014-12-10T12:05:00.000Z",
                        "watchers_quantity": 45
                    },
                    {
                        "id": 7,
                        "datetime": "2014-12-10T12:06:00.000Z",
                        "watchers_quantity": 34
                    },
                    {
                        "id": 8,
                        "datetime": "2014-12-10T12:07:00.000Z",
                        "watchers_quantity": 20
                    },
                    {
                        "id": 9,
                        "datetime": "2014-12-10T12:08:00.000Z",
                        "watchers_quantity": 15
                    },
                    {
                        "id": 10,
                        "datetime": "2014-12-10T12:09:00.000Z",
                        "watchers_quantity": 30
                    },
                    {
                        "id": 11,
                        "datetime": "2014-12-10T12:10:00.000Z",
                        "watchers_quantity": 36
                    },
                    {
                        "id": 12,
                        "datetime": "2014-12-10T12:11:00.000Z",
                        "watchers_quantity": 19
                    },
                    {
                        "id": 13,
                        "datetime": "2014-12-10T12:12:00.000Z",
                        "watchers_quantity": 20
                    },
                    {
                        "id": 14,
                        "datetime": "2014-12-10T12:13:00.000Z",
                        "watchers_quantity": 24
                    },
                    {
                        "id": 15,
                        "datetime": "2014-12-10T12:14:00.000Z",
                        "watchers_quantity": 25
                    },
                    {
                        "id": 16,
                        "datetime": "2014-12-10T12:15:00.000Z",
                        "watchers_quantity": 39
                    },
                    {
                        "id": 17,
                        "datetime": "2014-12-10T12:16:00.000Z",
                        "watchers_quantity": 38
                    },
                    {
                        "id": 18,
                        "datetime": "2014-12-10T12:17:00.000Z",
                        "watchers_quantity": 26
                    }
                ];

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
                };

                $scope.$watchCollection('model.data', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });
            }
        }
    });

    function barChart(el, options) {
        options = ng.extend({
            data: [],
            width: 0,
            height: 0,
            key: 'key',
            value: 'value',
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 40
            }
        }, options);

        var x = d3.time.scale();
        var y = d3.scale.linear();
        var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(d3.time.seconds)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var $el = $(el);
        var canvasOuter = d3.select(el).append('svg');
        var canvas = canvasOuter.append("g");

        var gy = canvas.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        var gx = canvas.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        var barWidthScale = d3.scale.ordinal()
            .domain([])
            .rangeRoundBands(x.range(), 0.1);

        var barWidth = barWidthScale.rangeBand();


        var bars = canvas
            .append('g')
            .selectAll('.plot-bar-chart__bar');

        calculateSizes();

        updateData();

        function calculateSizes() {
            options.width = $el.width() - options.margin.left - options.margin.right;
            options.height = $el.height() - options.margin.top - options.margin.bottom;

            canvasOuter
                .attr('width', options.width + options.margin.left + options.margin.right)
                .attr('height', options.height + options.margin.top + options.margin.bottom);
            canvas
                .attr("transform", "translate(" + options.margin.left + "," + options.margin.top + ")");

            y.domain([d3.min(options.data, function (d) {
                return d[options.value];
            }) - 1, d3.max(options.data, function (d) {
                return d[options.value];
            })])
                .range([options.height, 0]);

            x.domain([d3.min(options.data, function (d) {
                return new Date(d[options.key]);
            }), d3.max(options.data, function (d) {
                return new Date(d[options.key]);
            })])
                .range([0, options.width]);

            xAxis.scale(x).ticks(d3.time.minutes);
            yAxis.scale(y);
//            xAxis.tickSize(6, 0).tickFormat('');

            gx.attr("transform", "translate(0," + options.height + ")").call(xAxis);
            gy.call(yAxis);

            barWidthScale.domain(options.data.map(function (d) {
                return new Date(d[options.key]);
            }))
                .rangeRoundBands(x.range(), 0.1, 0.1);

            barWidth = barWidthScale.rangeBand();
        }

        function updateData() {
            bars.data(options.data)
                .enter()
                .append('rect')
                .attr("class", "plot-bar-chart__bar")
                .attr('x', function (d) {
                    return barWidthScale(new Date(d[options.key]));
//                return x();
                })
                .attr('y', function (d) {
                    return y(d[options.value]);
                })
                .attr("height", function (d) {
                    return options.height - y(d[options.value]);
                })
                .attr("width", barWidth);
        }
    }
});