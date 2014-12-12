;
define(function (require) {
    var $ = require('jquery');
    var d3 = require('d3');

    function BarCharPluggin(el, options) {
        this.options = $.extend({
            data: [],
            width: 0,
            height: 0,
            key: 'x',
            value: 'y',
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 40
            },
            xAxis: {
                type: 'datetime'//'number', 'string'
            },
            yAxis: {
                type: 'number'//'number', 'string'

            }
        }, options);
        console.log(this.options);

        this.el = el;
        this.$el = $(el);
        this.$el.html('');

        //scales
        this.xScale = this.createXScale();
        this.yScale = this.createYScale();
        this.colorScale = d3.scale.linear().domain([0, 1]).range(["#B0D5E8", "#03537C"]);

        //axises
        this.xAxis = this.createXAxis();
        this.yAxis = this.createYAxis();

        this.svg = d3.select(el).append('svg');
        this.canvas = this.svg.append("g");
        this.tooltip = d3.select(el).append('div').attr('class', 'plot-bar-chart__tooltip');
        this.tooltipContent = this.tooltip.append('div').attr('class', 'plot-bar-chart__tooltip_content');

        this.gy = this.canvas.append("g")
            .attr("class", "y axis")
            .call(this.yAxis);
        this.gx = this.canvas.append("g")
            .attr("class", "x axis")
            .call(this.xAxis);

        this.barWidthScale = d3.scale.ordinal()
            .domain([])
            .rangeRoundBands(this.xScale.range(), 0.1);

        this.barWidth = this.barWidthScale.rangeBand();

        this.bars = this.canvas.append('g');

        this.init = function () {
            this.calculateSizes();
            this.updateData();
        };

        this.publicApi = {
            updateData: this.updateData.bind(this),
            updateSizes: this.calculateSizes.bind(this),
            updateAll: this.updateAll.bind(this),
            destroy: this.destroy.bind(this)
        };
    }

    BarCharPluggin.prototype = {
        updateData: function () {
            console.log('key, value:', this.options.key,this.options.value);
            this.colorScale.domain([d3.min(this.options.data, function (d) {
                return d[this.options.value];
            }.bind(this)), d3.max(this.options.data, function (d) {
                return d[this.options.value];
            }.bind(this))]);

            var self = this;

            var selection = this.bars.selectAll('.plot-bar-chart__bar').data(this.options.data);
            // Add
            selection
                .enter()
                .append('rect')
                .attr("class", "plot-bar-chart__bar")
                .attr('x', function (d) {
                    return this.barWidthScale(this.getXValue(d));
                }.bind(this))
                .attr('y', function (d) {
                    return this.yScale(this.getYValue(d));
                }.bind(this))
                .attr("width", this.barWidth)
                .attr("height", function (d) {
                    return this.options.height - this.yScale(d[this.options.value]);
                }.bind(this))
                .style('fill', function (d) {
                    return this.colorScale(this.getXValue(d));
                }.bind(this))
                .on("mouseover", function (d) {
                    self.createAndShowTooltip(this, d);
                })
                .on("mouseout", function () {
                    this.tooltip
                        .style('display', 'none')
                }.bind(this));

            // Remove
            selection
                .exit()
                .remove();

            // Update
            selection
                .attr('x', function (d) {
                    return this.barWidthScale(d[this.options.key]);
                }.bind(this))
                .attr('y', function (d) {
                    return this.yScale(d[this.options.value]);
                }.bind(this))
                .attr("width", this.barWidth)
                .attr("height", function (d) {
                    return this.options.height - this.yScale(d[this.options.value]);
                }.bind(this))
                .style('fill', function (d) {
                    return this.colorScale(d[this.options.value]);
                }.bind(this));

        },
        updateAll: function (data) {
            this.options.data = data;
            this.calculateSizes();
            this.updateData();
        },
        calculateSizes: function () {
            this.options.width = this.$el.width() - this.options.margin.left - this.options.margin.right;
            this.options.height = this.$el.height() - this.options.margin.top - this.options.margin.bottom;

            this.svg
                .attr('width', this.options.width + this.options.margin.left + this.options.margin.right)
                .attr('height', this.options.height + this.options.margin.top + this.options.margin.bottom);
            this.canvas
                .attr("transform", "translate(" + this.options.margin.left + "," + this.options.margin.top + ")");

            this.updateXScale();
            this.updateYScale();


            this.xAxis.scale(this.xScale).ticks(Math.ceil(this.options.width / 70));
            this.yAxis.scale(this.yScale);

            this.gx.attr("transform", "translate(0," + this.options.height + ")").call(this.xAxis);
            this.gy.call(this.yAxis);

            this.barWidthScale.domain(this.options.data.map(function (d) {
                return d[this.options.key];
            }.bind(this)))
                .rangeRoundBands(this.xScale.range(), 0.1);

            this.barWidth = this.barWidthScale.rangeBand();
        },
        updateXScale: function () {
            if (this.options.xAxis.type === 'string' && false) {
                this.xScale
                    .domain(this.options.data.map(function (d) {
                        return d[this.options.key]
                    }.bind(this)))
                    .rangeRoundBands([0, this.options.width]);
            } else {
                var firstItem = this.options.data[0];
                var lastItem = this.options.data[this.options.data.length > 0 ? this.options.data.length - 1 : 0];
                this.xScale
                    .domain([
                        firstItem ? firstItem[this.options.key] : 0,
                        lastItem ? lastItem[this.options.key] : 0
                    ])
                    .range([0, this.options.width]);
            }
        },
        updateYScale: function () {
            if (this.options.yAxis.type === 'string' && false) {
                this.yScale
                    .domain(this.options.data.map(function (d) {
                        return d[this.options.value]
                    }.bind(this)))
                    .rangeRoundBands([0, this.options.height]);
            } else {
                this.yScale.domain([d3.min(this.options.data, function (d) {
                    return d[this.options.value];
                }.bind(this)) - 1, d3.max(this.options.data, function (d) {
                    return d[this.options.value];
                }.bind(this))])
                    .range([this.options.height, 0]);

            }
        },
        destroy: function () {
        },
        createXScale: function () {
            switch (this.options.xAxis.type) {
                case 'datetime':
                    return d3.time.scale();
                case 'string':
                    return d3.scale.ordinal();
                case 'number':
                    return d3.scale.linear();
                default:
                    return d3.scale.ordinal();
            }
        },
        createYScale: function () {
            switch (this.options.yAxis.type) {
                case 'datetime':
                    return d3.time.scale();
                case 'string':
                    return d3.scale.ordinal();
                case 'number':
                    return d3.scale.linear();
                default:
                    return d3.scale.ordinal();
            }
        },
        createXAxis: function () {
            return d3.svg.axis()
                .scale(this.xScale)
                .ticks(Math.ceil(this.$el.width() / 70))
                .orient("bottom");
        },
        createYAxis: function () {
            return d3.svg.axis()
                .scale(this.yScale)
                .orient("left");
        },
        getXValue: function (data) {
            return data[this.options.key];
        },
        getYValue: function (data) {
            return data[this.options.value];
        },
        createAndShowTooltip: function (barElement, data) {
            this.tooltipContent
                .html(this.getTooltipContent(barElement, data));
            var $tooltip = $(this.tooltip.node());
            var tooltipWidth = $tooltip.width();
            var tooltipHeight = $tooltip.height();
            console.log('tooltipHeight:', tooltipHeight);

            var tooltipLeft = +d3.select(barElement).attr("x") + this.options.margin.left - tooltipWidth / 2;
            var tooltipTop = +d3.select(barElement).attr("y") - tooltipHeight + this.options.margin.top;
            if (tooltipLeft < 0) {
                tooltipLeft = 0;
            }
            this.tooltip
                .style('display', 'block')
                .style("left", tooltipLeft + "px")
                .style("top", tooltipTop + "px");
        },
        getTooltipContent: function (barElement, data) {
            if ($.isFunction(this.options.tooltip)) {
                return this.options.tooltip.call(null, data);
            }
            var keyData = this.getXValue(data);
            var valueData = this.getYValue(data);
            if (keyData instanceof Date) {
                keyData = d3.time.format("%x %X")(keyData)
            }
            if (valueData instanceof Date) {
                valueData = d3.time.format("%x %X")(valueData)
            }
            return '<h3>' + this.options.key + '</h3><p>' + valueData + ' at ' + keyData + '</p>';
        }
    };


    return function (element, options) {
        var instance = new BarCharPluggin(element, options);
        return instance.publicApi;
    };
});