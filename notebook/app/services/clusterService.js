;
define(function (require) {
    var ng = require('angular');
    var clusterListLocalStorageItemName = 'savedClusterList';
    var clusterModel = require('../models/cluster');

    require('../ngModule').service('clusterService', function ($q) {
        var that = this;

        this.clusterList = [];

        this.getAll = function () {
            var defer = $q.defer();

            _restoreAllFromLocalStorage();
            defer.resolve(this.clusterList);

            return defer.promise;
        };

        this.getById = function (id) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage();

            var item = this.clusterList.filter(function (c) {
                return c.id === id;
            })[0];
            if (item) {
                defer.resolve(item);
            } else {
                defer.reject('Not found');
            }

            return defer.promise;
        };

        this.saveOne = function (cluster) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage();

            if (cluster.id !== 0) {
                var existedItem = this.clusterList.filter(function (c) {
                    return c.id === cluster.id;
                })[0];
                if (existedItem) {
                    ng.extend(existedItem, cluster);
                }
            } else {
                var idArr = [];
                this.clusterList.forEach(function (c) {
                    idArr[c.id] = c;
                });
                cluster.id = idArr.length || 1;
                this.clusterList.unshift(cluster);
            }

            _saveAllToLocalStorage();

            defer.resolve();

            return defer.promise;
        };

        this.removeById = function (id) {
            var defer = $q.defer();
            _restoreAllFromLocalStorage();

            var item = this.clusterList.filter(function (c) {
                return c.id === id;
            })[0];
            if (item) {
                this.clusterList.splice(this.clusterList.indexOf(item), 1);
                _saveAllToLocalStorage();
                defer.resolve();
            } else {
                defer.reject('Not found');
            }


            return defer.promise;
        };

        function _restoreAllFromLocalStorage() {
            var jsonArr = ng.fromJson(localStorage.getItem(clusterListLocalStorageItemName)) || [];
            that.clusterList.length = 0;
            that.clusterList.push.apply(that.clusterList, jsonArr);
        }

        function _saveAllToLocalStorage() {
            var jsonString2Save = ng.toJson(that.clusterList.map(function (c) {
                return clusterModel.toJson(c);
            }));
            localStorage.setItem(clusterListLocalStorageItemName, jsonString2Save);
        }
    });
});