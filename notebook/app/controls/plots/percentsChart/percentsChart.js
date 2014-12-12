;
define(function (require) {
    var d3 = require('d3');
    var $ = require('jquery');

    function plotted(element, percents) {
        var el = d3.select(element);
//        el.classed('plot', true);
        //el.html('');

        var t = 2 * Math.PI; // http://tauday.com/tau-manifesto

        var offsetWidth,
            offsetHeight,
            width,
            height,
            padding,
            donutWidth,
            outerRadius,
            innerRadius,
            fontSize,
            isIncreased = true;
        percents = percents || 0;

        var data = {
            val: percents
        };

        var plotLabel = el.append('div').attr('class', 'plot-label');
        plotLabel.classed('up', isIncreased);
        plotLabel.classed('down', !isIncreased);
        //arrows
        plotLabel.append('span').attr('class', 'arrow up').text('▲');
        plotLabel.append('span').attr('class', 'arrow down').text('▼');

        var arrow = plotLabel.selectAll('.arrow');
        var text = plotLabel.append('span').attr('class', 'value').datum(data);
        var points = plotLabel.append('span').attr('class', 'points').text('%');

        // An arc function with all values bound except the endAngle. So, to compute an
        // SVG path string for a given angle, we pass an object with an endAngle
        // property to the `arc` function, and it will return the corresponding string.
        var arc = d3.svg.arc()
            .startAngle(0);

        // Create the SVG container, and apply a transform such that the origin is the
        // center of the canvas. This way, we don't need to position arcs individually.
        var svgRoot = el.append("svg");
        var svg = svgRoot.append("g");

        // Add the background arc, from 0 to 100% (τ).
        var background = svg.append("path").datum({endAngle: t});
        // Add the foreground arc in orange, currently showing 12.7%.
        var foreground = svg.append("path");

        onResize();

        // Every so often, start a transition to a new random angle. Use transition.call
        // (identical to selection.call) so that we can encapsulate the logic for
        // tweening the arc in a separate function below.
        /*  setInterval(function() {
         updateData(Math.random() * 100);
         }, 1500);*/

        // Creates a tween on the specified transition's "d" attribute, transitioning
        // any selected arcs from their current angle to the specified new angle.
        function arcTween(transition, perc) {
            data.val = perc;
            text.text(function (d) {
                return Math.round(d.val);
            });

            var newAngle = perc / 100 * t;

            // The function passed to attrTween is invoked for each selected element when
            // the transition starts, and for each element returns the interpolator to use
            // over the course of transition. This function is thus responsible for
            // determining the starting angle of the transition (which is pulled from the
            // element's bound datum, d.endAngle), and the ending angle (simply the
            // newAngle argument to the enclosing function).
            transition.attrTween("d", function (d) {
                //console.log(newAngle, d);

                // To interpolate between the two angles, we use the default d3.interpolate.
                // (Internally, this maps to d3.interpolateNumber, since both of the
                // arguments to d3.interpolate are numbers.) The returned function takes a
                // single argument t and returns a number between the starting angle and the
                // ending angle. When t = 0, it returns d.endAngle; when t = 1, it returns
                // newAngle; and for 0 < t < 1 it returns an angle in-between.
                var interpolate = d3.interpolate(d.endAngle, newAngle);

                isIncreased = d.endAngle <= newAngle;

                plotLabel.classed('up', isIncreased);
                plotLabel.classed('down', !isIncreased);

                // The return value of the attrTween is also a function: the function that
                // we want to run for each tick of the transition. Because we used
                // attrTween("d"), the return value of this last function will be set to the
                // "d" attribute at every tick. (It's also possible to use transition.tween
                // to run arbitrary code for every tick, say if you want to set multiple
                // attributes from a single function.) The argument t ranges from 0, at the
                // start of the transition, to 1, at the end.
                return function (t) {

                    // Calculate the current arc angle based on the transition time, t. Since
                    // the t for the transition and the t for the interpolate both range from
                    // 0 to 1, we can pass t directly to the interpolator.
                    //
                    // Note that the interpolated angle is written into the element's bound
                    // data object! This is important: it means that if the transition were
                    // interrupted, the data bound to the element would still be consistent
                    // with its appearance. Whenever we start a new arc transition, the
                    // correct starting angle can be inferred from the data.
                    d.endAngle = interpolate(t);

                    // Lastly, compute the arc path given the updated data! In effect, this
                    // transition uses data-space interpolation: the data is interpolated
                    // (that is, the end angle) rather than the path string itself.
                    // Interpolating the angles in polar coordinates, rather than the raw path
                    // string, produces valid intermediate arcs during the transition.
                    return arc(d);
                };
            });
        }

        function onResize() {
            calculateVariables();
            updateSizes();
        }

        function calculateVariables() {
            offsetWidth = $(el.node()).width() || 400;
            offsetHeight = $(el.node()).height() || 400;
            console.log('offsetWidth, offsetHeight:', offsetWidth, offsetHeight);
            width = offsetWidth > offsetHeight ? offsetHeight : offsetWidth;
            height = width;
            padding = width / 20;
            donutWidth = width / 20;
            outerRadius = (width - padding * 2) / 2;
            innerRadius = outerRadius - donutWidth;
            fontSize = innerRadius * 2 / 3;
        }

        function updateSizes() {
            arc
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            svgRoot
                .attr("width", width)
                .attr("height", height);

            svg
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            text
                .attr("font-weight", "bold")
                .style("font-size", fontSize + "px")
                .style("line-height", fontSize + "px")
                .text(function (d) {
                    return Math.round(d.val);
                });

            plotLabel
                .style('width', innerRadius * 2 + 'px')
                .style('left', padding + donutWidth + 'px')
                .style('top', padding + outerRadius - fontSize / 2 + 'px');

            arrow
                .style('font-size', fontSize / 3 + 'px');

            points
                .style('font-size', fontSize / 3 + 'px');

            background
                .style("fill", "#ddd")
                .attr("d", arc);

            foreground
                .datum({endAngle: data.val / 100 * t})
                .style("fill", "rgb(2, 108, 163)")
                .attr("d", arc);
        }

        function updateData(percents) {
            foreground.transition()
                .duration(750)
                .call(arcTween, percents);
        }

        var resizeTimeout = null;

        var onResizeWindow = function(){
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(onResize, 50);
        };

        $(window).on('resize', onResizeWindow);


        return {
            updateData: updateData,
            updateSizes: onResize,
            destroy: function(){
                $(window).off('resize', onResizeWindow);
            }
        }
    }


    require('../../../ngModule').directive('plotPercentsChart', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/percentsChart/percentsChart.html',
            scope: {
                model: '=plotData'
            },
            link: function($scope, element, attrs){
                $scope.data = {
                    val: 0
                };
                $scope.plot = plotted(element.find('.percents-chart')[0], $scope.data.val);

                $scope.$watch('data.val', function(){
                    $scope.plot.updateData($scope.data.val);
                });
                $scope.destroyPlot = function(){
                    $scope.plot.destroy();
                }
            },
            controller: function ($scope) {
                $scope.config = $scope.model.options;

                $scope.updateData = function(key, value, groupBy){
                    var lastItem = $scope.model.data.length > 0 ? $scope.model.data[$scope.model.data.length - 1] : $scope.model.data[0];
                    $scope.data.val = lastItem ? parseInt(lastItem[key], 10) || 0 : 0;
                };

                $scope.$watch('config.key', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('config.value', function () {
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('model.data', function(){
                    $scope.updateData($scope.config.key, $scope.config.value, $scope.config.groupBy);
                });

                $scope.$watch('model.size', function(){
                    setTimeout(function() {
                        $scope.plot.updateSizes();
                    }, 0);
                });

                $scope.$on('$destroy', function(){
                    $scope.destroyPlot();
                })

            }
        };
    });
});