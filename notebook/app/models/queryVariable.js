;
define(function (require) {
    var ng = require('angular');
    function QueryVariable(data) {
        this.name = data.name;
        this.label = data.label || data.name;
        this.value = data.value;
    }

    function toJson(v){
        return {
            name: v.name,
            label: v.label,
            value: v.value
        };
    }

    function fromJson(json){
        var data = ng.extend({
            name: "",
            label: null,
            value: ""
        }, json);

        return new QueryVariable(data);
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