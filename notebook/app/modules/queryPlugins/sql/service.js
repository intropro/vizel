;
define(function (require) {
    var pluginModule = require('./ngModule');
    var name = 'service_' + pluginModule.name;
    pluginModule.module.service(name, function ($http, $q) {
        this.execute = function (block) {
            var defer = $q.defer();
            $http.post(block.backend.endPoint, {
                query: block.query
            }).success(function (response) {
                var result = extractData(block, response);
                defer.resolve(result);
            }).error(function (response) {
                var result = extractData(block, response);
                defer.reject(result);
            });

            return defer.promise;
        };

        function extractData(block, response){
            var result = {
                data: [],
                error: null
            };
            var pathToData = block.backend.pathToData;
            var pathToError = block.backend.pathToError;
            if(!pathToData){
                result.data = response;
            } else {
                var regDataResult = pathToData.split('.');

                var lastLevelData = response;
                regDataResult.forEach(function(path){
                    if(lastLevelData){
                        lastLevelData = lastLevelData[path];
                    } else {
                        console.error("Server response does not correspond to backend's description. Cannot retrieve data. Response:", response, " Block:", block);
                    }
                });
                result.data = lastLevelData;
            }
            if(!pathToError){
                result.error = response;
            } else {

                var regErrorResult = pathToError.split('.');
                var lastLevelError = response;
                regErrorResult.forEach(function(path){
                    if(lastLevelError){
                        lastLevelError = lastLevelError[path];
                    } else {
                        console.error("Server response does not correspond to backend's description. Cannot retrieve error. Response:", response, " Block:", block);
                    }
                });
                result.error = lastLevelError;
            }

            return result;
        }
    });

    return {
        name: name
    };
});