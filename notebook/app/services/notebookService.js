;
define(function (require) {
    var ng = require('angular');
    var notebookBlock = require('../models/notebookBlock');

    require('../ngModule').service('notebookService', function ($q, queryPluginsManager) {
        var notebooksLocalStorageItemName = 'savedNotebooks';
        var pluginsArr = queryPluginsManager.getAll();
        var plugins = {};
        pluginsArr.forEach(function (p) {
            plugins[p.name] = p;
        });

        /**
         * @param {number} id
         */
        this.getById = function(id){
            var defer = $q.defer();
            this.getAll().then(function(list){
                var notebook = list.filter(function(n){
                    return n.id === id;
                })[0];
                defer.resolve(notebook);
            }, function(){
                defer.reject('Something went wrong');
            });

            return defer.promise;
        }.bind(this);

        /**
         * @returns {Array.<object>}
         */
        this.getAll = function () {
            var defer = $q.defer();

            var notebooksJson = ng.fromJson(localStorage.getItem(notebooksLocalStorageItemName) || []);

            var notebookList = notebooksJson.map(function (n) {
                var notebook = {
                    id: n.id,
                    name: n.name
                };

                notebook.blocks = n.blocks.map(function (b) {
                    var block = notebookBlock.factory(b);
                    block.plugin = plugins[b.pluginName] || null;
                });

                return notebook;
            });

            defer.resolve(notebookList);

            return defer.promise;
        };

        this.saveOne = function(notebook){

        };

        /**
         * @param {object} notebook
         * @param {number} notebook.id
         * @param {string} notebook.name
         * @param {Array.<object>} notebook.blocks
         */
        this.save = function (notebook) {
            var defer = $q.defer();
            try {
                var blocksJson = notebook.blocks.map(function (b) {
                    var json = {
                        in: b.in,
                        type: b.type,
                        pluginName: b.plugin ? b.plugin.name : null,
                        options: {
                            key: b.options.key,
                            value: b.options.value,
                            availableKeys: b.options.availableKeys,
                            availableValues: b.options.availableValues
                        },
                        isExecuted: b.isExecuted,
                        updatePeriod: b.updatePeriod,
                        queryLanguage: b.queryLanguage,
                        cluster: b.cluster ? { name: b.cluster.name, endPoint: b.cluster.endPoint} : null,
                        size: b.size,
                        variables: b.variables.map(function (v) {
                            return {
                                name: v.name,
                                label: v.label,
                                value: v.value
                            };
                        })
                    };
                    return json;
                });
                var notebookJson = {
                    id: notebook.id,
                    name: notebook.name,
                    blocks: blocksJson
                };

                var jsonStr = ng.toJson(notebookJson);
                localStorage.setItem(notebooksLocalStorageItemName, jsonStr);
            }
            catch (e) {
                defer.reject(e);
            }
            defer.resolve();
            return defer.promise;
        }
    });
});