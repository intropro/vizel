;
define(function (require) {
    var ng = require('angular');
    var backendListLocalStorageItemName = 'savedClusterList';
    var backendModel = require('../models/backend');

    require('../ngModule').service('backendService', function ($q) {
        var that = this;

        this.backendList = [];

        this.getAll = function () {
            var defer = $q.defer();

            _restoreAllFromLocalStorage().then(function(){

                defer.resolve(this.backendList);

            }.bind(this), function(){
                defer.reject();
            });

            return defer.promise;
        };

        this.getById = function (id) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage().then(function () {

                var item = this.backendList.filter(function (c) {
                    return c.id === id;
                })[0];
                if (item) {
                    defer.resolve(item);
                } else {
                    defer.reject('Not found');
                }

            }.bind(this), function () {
                defer.reject();
            });

            return defer.promise;
        };

        this.saveOne = function (backend) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage().then(function () {

                if (backend.id !== 0) {
                    var existedItem = this.backendList.filter(function (c) {
                        return c.id === backend.id;
                    })[0];
                    if (existedItem) {
                        ng.extend(existedItem, backend);
                    }
                } else {
                    var idArr = [];
                    this.backendList.forEach(function (c) {
                        idArr[c.id] = c;
                    });
                    backend.id = idArr.length || 1;
                    this.backendList.unshift(backend);
                }
                _saveAllToLocalStorage();
                defer.resolve();

            }.bind(this), function () {
                defer.reject();
            });


            return defer.promise;
        };

        this.removeById = function (id) {
            var defer = $q.defer();

            _restoreAllFromLocalStorage().then(function () {

                var item = this.backendList.filter(function (c) {
                    return c.id === id;
                })[0];
                if (item) {
                    this.backendList.splice(this.backendList.indexOf(item), 1);
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

            var jsonArr = ng.fromJson(localStorage.getItem(backendListLocalStorageItemName)) || [];
            var instantiatedBackends = jsonArr.map(function(c){
                return backendModel.factory(c);
            });
            that.backendList.length = 0;
            that.backendList.push.apply(that.backendList, instantiatedBackends);
            defer.resolve(that.backendList);

            return defer.promise;
        }

        function _saveAllToLocalStorage() {
            var jsonString2Save = ng.toJson(that.backendList.map(function (c) {
                return backendModel.toJson(c);
            }));
            localStorage.setItem(backendListLocalStorageItemName, jsonString2Save);
        }
    });
});