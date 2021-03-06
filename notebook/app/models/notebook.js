;
define(function (require) {
    var ng = require('angular');
    var notebookBlock = require('./notebookBlock');

    function Notebook(data) {
        this.id = data.id;
        this.name = data.name;
        this.blocks = data.blocks.map(function(b){
            return notebookBlock.factory(b);
        });
    }

    function toJson(notebook){
        return {
            id: notebook.id,
            name: notebook.name,
            blocks: notebook.blocks.map(function(b){
                return notebookBlock.toJson(b);
            })
        };
    }

    function fromJson(json){
        var data = ng.extend({
            id: 0,
            name: "Unnamed notebook",
            blocks: []
        }, json);

        return new Notebook(data);
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