;
define(function (require) {
    require('./clusterService');
    var ng = require('angular');
    var notebookModel = require('../models/notebook');
    var canvasListLocalStorageItemName = 'savedNotebookList';

    require('../ngModule').service('notebookService', function ($q, queryPluginsManager, clusterService) {
        var pluginsArr = queryPluginsManager.getAll();
        var plugins = {};
        pluginsArr.forEach(function (p) {
            plugins[p.name] = p;
        });
        var that = this;

        this.notebookList = [];

        this.getAll = function () {
            var defer = $q.defer();

            _restoreAllFromLocalStorage().then(function () {

                defer.resolve(this.notebookList);

            }.bind(this), function () {
                defer.reject();
            });

            return defer.promise;
        };

        this.getById = function (id) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage().then(function () {

                var item = this.notebookList.filter(function (c) {
                    return c.id === id;
                })[0];
                if (item) {
                    if(item.blocks.length > 0){
                        clusterService.getAll().then(function(clusterList){
                            var clustersById = [];
                            clusterList.forEach(function(c){
                                clustersById[c.id] = c;
                            });
                            item.blocks.forEach(function(block){
                                block.cluster = clustersById[block.clusterId];
                            });
                        })['finally'](function(){
                            defer.resolve(item);
                        });
                    } else {
                        defer.resolve(item);
                    }
                } else {
                    defer.reject('Not found');
                }

            }.bind(this), function () {
                defer.reject();
            });

            return defer.promise;

        };

        this.saveOne = function (notebook) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage();

            if (notebook.id !== 0) {
                var existedItem = this.notebookList.filter(function (c) {
                    return c.id === notebook.id;
                })[0];
                if (existedItem) {
                    ng.extend(existedItem, notebook);
                }
            } else {
                var idArr = [];
                this.notebookList.forEach(function (c) {
                    idArr[c.id] = c;
                });
                notebook.id = idArr.length || 1;
                this.notebookList.unshift(notebook);
            }

            _saveAllToLocalStorage();

            defer.resolve();

            return defer.promise;
        };

        this.removeById = function (id) {
            var defer = $q.defer();
            _restoreAllFromLocalStorage().then(function () {

                var item = this.notebookList.filter(function (c) {
                    return c.id === id;
                })[0];
                if (item) {
                    this.notebookList.splice(this.notebookList.indexOf(item), 1);
                    _saveAllToLocalStorage();
                    defer.resolve();
                } else {
                    defer.reject('Not found');
                }

            }.bind(this), function () {
                defer.reject();
            });

            return defer.promise;
        };

        function _restoreAllFromLocalStorage() {
            var defer = $q.defer();

            var jsonArr = ng.fromJson(localStorage.getItem(canvasListLocalStorageItemName)) || [];
            that.notebookList.length = 0;
            var arr = jsonArr.map(function (c) {
                var model = notebookModel.factory(c);
                model.blocks.forEach(function (b) {
                    b.plugin = plugins[b.pluginName] || null;
                });
                return model;
            });
            that.notebookList.push.apply(that.notebookList, arr);
            defer.resolve(that.notebookList);

            return defer.promise;
        }

        function _saveAllToLocalStorage() {
            var arr = that.notebookList.map(function (c) {
                return notebookModel.toJson(c);
            });
            var jsonString2Save = ng.toJson(arr);
            localStorage.setItem(canvasListLocalStorageItemName, jsonString2Save);
        }
    });
});