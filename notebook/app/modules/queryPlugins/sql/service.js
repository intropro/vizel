;
define(function (require) {
    var pluginModule = require('./ngModule');
    var name = 'service_' + pluginModule.name;
    pluginModule.module.service(name, function ($http, $q) {
        this.execute = function (endPoint, query) {
            var defer = $q.defer();
            $http.post(endPoint, {
                query: query
            }).success(function (data) {
                defer.resolve(data);
            }).error(function () {
                defer.reject(data);
            });

            return defer.promise;
        };
    });

    return {
        name: name
    };
});