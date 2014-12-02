;
define(function (require) {
    var ng = require('angular');
    function Cluster(data) {
        this.id = data.id;
        this.name = data.name;
        this.endPoint = data.endPoint;
        this.language = data.language;
        this.pathToData = data.pathToData;
        this.pathToError = data.pathToError;
    }

    function toJson(c){
        return {
            id: c.id,
            name: c.name,
            endPoint: c.endPoint,
            language: c.language,
            pathToData: c.pathToData,
            pathToError: c.pathToError
        };
    }

    function fromJson(json){
        var data = ng.extend({
            id: 0,
            name: 'Unnamed',
            endPoint: '',
            language: '',
            pathToData: 'path.to.data',
            pathToError: 'path.to.error'
        }, json);

        return new Cluster(data);
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