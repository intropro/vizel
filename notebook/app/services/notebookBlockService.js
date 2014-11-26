;
define(function (require) {
    var ng = require('angular');
    var notebookBlock = require('../models/notebookBlock');

    require('../ngModule').service('notebookBlockService', function ($q, queryPluginsManager) {
        var blocksLocalStorageItemName = 'savedBlocks';
        var pluginsArr = queryPluginsManager.getAll();
        var plugins = {};
        pluginsArr.forEach(function(p){
            plugins[p.name] = p;
        });

        this.getAll = function () {
            var defer = $q.defer();
            var blocksJson = ng.fromJson(localStorage.getItem(blocksLocalStorageItemName) || []) || [];
            var blocks = blocksJson.map(function (b) {
                var block = notebookBlock.factory(b);
                block.plugin = plugins[b.pluginName] || null;
                return block;
            });

            defer.resolve(blocks);

            return defer.promise;
        };

        this.saveAll = function(blocks){
            var defer = $q.defer();
            try {
                var blocksJson = blocks.map(function (b) {
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

                var jsonStr = ng.toJson(blocksJson);
                localStorage.setItem(blocksLocalStorageItemName, jsonStr);
            }
            catch(e){
                defer.reject(e);
            }
            defer.resolve();
            return defer.promise;
        };
    });
});