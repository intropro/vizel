;
define(function (require) {
    var ng = require('angular');
    var queryVariable = require('./queryVariable');
    var backendModel = require('./backend');

    function NotebookBlock(data) {
        this.in = data.in;
        this.query = data.query;
        this.type = data.type;
        this.isExecuted = data.isExecuted;
        this.data = [];
        this.error = null;
        this.options = data.options;
        this.updatePeriod = data.updatePeriod;

        this.pluginName = data.pluginName;

        this.backend = data.backend ? backendModel.factory(data.backend) : null;
        this.clusterId = data.clusterId;

        this.availableSizes = data.availableSizes;
        this.size = data.size || this.availableSizes[0];
        this.variables = (data.variables || []).map(function(v){
            return queryVariable.factory(v);
        });
        this.plugin = null;
    }

    function toJson(b){
        return {
            in: b.in,
            type: b.type,
            options: {
                key: b.options.key,
                value: b.options.value,
                availableKeys: b.options.availableKeys,
                availableValues: b.options.availableValues,
                keyType: b.options.keyType,
                valueType: b.options.valueType,
                types: b.options.types
            },
            isExecuted: b.isExecuted,
            updatePeriod: b.updatePeriod,
            pluginName: b.pluginName,
            queryLanguage: b.queryLanguage,
            clusterId: b.backend ? b.backend.id : null,
            size: b.size,
            variables: b.variables.map(function (v) {
                return queryVariable.toJson(v)
            })
        };
    }

    function fromJson(json){
        var data = ng.extend({
            in: 'select state, income from reports.sells where state like "$state%"',
            query: '',
            type: 'grid',
            isExecuted: false,
            data: [],
            error: null,
            options: {
                key: null,
                value: null,
                availableKeys: [],
                availableValues: [],
                keyType: null,
                valueType: null,
                types: ['number', 'string', 'datetime']
            },
            updatePeriod: null,
            backend: null,
            clusterId: null,
            size: 12,
            availableSizes: [2,3,4,6,8,12],
            variables: []

        }, json);
        return new NotebookBlock(data);
    }

    function factory(json){
        var instance = fromJson(json);
        return instance;
    }

    return {
        factory: factory,
        toJson: toJson,
        fromJson: fromJson
    };
});