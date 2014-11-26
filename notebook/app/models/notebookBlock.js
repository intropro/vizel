;
define(function (require) {
    var ng = require('angular');
    var queryVariable = require('./queryVariable');

    function NotebookBlock(json) {
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
                availableValues: []
            },
            updatePeriod: null,
            allQueryLanguages: ['SQL', 'md'],
            queryLanguage: 'SQL',
            allClusters: [{
                name: 'MySql DB',
                endPoint: '//localhost:9090/query'
            }],
            cluster: null,
            size: 12,
            availableSizes: [3,4,6,8,12],
            variables: []

        }, json);

        this.in = data.in;
        this.query = data.query;
        this.type = data.type;
        this.isExecuted = data.isExecuted;
        this.data = [];
        this.error = null;
        this.options = data.options;
        this.updatePeriod = data.updatePeriod;

        this.allQueryLanguages = data.allQueryLanguages || [];
        this.queryLanguage = data.queryLanguage || this.allQueryLanguages[0];

        this.allClusters = data.allClusters;
        this.cluster = data.cluster || this.allClusters[0];

        this.availableSizes = data.availableSizes || [3,4,6,8,12];
        this.size = data.size || this.availableSizes[0];
        this.variables = (data.variables || []).map(function(v){
            return queryVariable.factory(v);
        });
        this.plugin = null;
    }

    function factory(json){
        var instance = new NotebookBlock(json);
        return instance;
    }

    return {
        factory: factory,
        ctor: NotebookBlock
    };
});