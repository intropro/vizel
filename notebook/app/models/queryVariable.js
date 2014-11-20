;
define(function (require) {
    var ng = require('angular');
    function QueryVariable(json) {
        var data = ng.extend({
            name: "",
            label: null,
            value: ""
        }, json);

        this.name = data.name;
        this.label = data.label || data.name;
        this.value = data.value;
    }

    function factory(json){
        var instance = new QueryVariable(json);
        return instance;
    }

    return {
        factory: factory,
        ctor: QueryVariable
    };
});