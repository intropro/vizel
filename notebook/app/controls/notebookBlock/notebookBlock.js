define(function (require) {
    var angular = require('angular');
    var queryVariable = require('../../models/queryVariable');
    require('../../ngModule').directive('notebookBlock', ['$http', function ($http) {
        return {
            restrict: 'EA',
            scope: {
                block: '=notebookBlockModel',
                removeCallback: "="
            },
            templateUrl: '/app/controls/notebookBlock/notebookBlock.html',
            controller: ['$scope', '$modal', function ($scope, $modal) {
                $scope.updateTimeout = null;
                var applyUpdatePeriodTimeout = null;


                var updateOnChangeTimeout = null;
                $scope.$watch("block.variables", function(){
                    if(!$scope.block.isExecuted){
                        return;
                    }
//                    debugger;
                    clearTimeout(updateOnChangeTimeout);
                    updateOnChangeTimeout = setTimeout(updateQuery, 600);
                }, true);

                function updateQuery(){
                    var str = $scope.block.in;
                    $scope.block.variables.forEach(function(v){
                        str = str.replace(new RegExp("\\$" + v.name, "g"), v.value);
                    });
                    $scope.block.query = str;
                    $scope.request();
                }

                $scope.executeQuery = function(){
                    var input = $scope.block.in;
                    var variableRegex = /(\$\w+)/gmi;
                    var variables = [];
                    var r = variableRegex.exec(input);
                    var uniqueVar = {};
                    while (r) {
                        var varName = r[1].substr(1);
                        var oldVar = $scope.block.variables.filter(function(v){ return v.name === varName})[0];
                        if(oldVar){
                            uniqueVar[varName] = oldVar;
                            variables.push(uniqueVar[varName]);
                        }
                        if (!uniqueVar[varName]) {
                            uniqueVar[varName] = queryVariable.factory({name: varName});
                            variables.push(uniqueVar[varName]);
                        }
                        r = variableRegex.exec(input);
                    }
                    $scope.block.variables = variables;
                    updateQuery();
                };

                $scope.request = function () {
                    clearTimeout($scope.updateTimeout);
                    $scope.updateTimeout = null;
                    if (!$scope.block.query) {
                        return;
                    }
                    $scope.isExecuting = true;
                    $http.post($scope.block.cluster.endPoint, {
                        query: $scope.block.query
                    }).success(function (data) {
                        $scope.response = data;
                        $scope.block.data = data.data || [];
                        $scope.block.error = data.error || null;
                        $scope.block.isExecuted = true;
                        $scope.isExecuting = false;
                        updateBlockOptions();

                        if ($scope.block.updatePeriod) {
                            $scope.updateTimeout = setTimeout(function () {
                                $scope.request();
                            }, $scope.block.updatePeriod * 1000);
                        }
                    }).error(function () {
                        $scope.isExecuting = false;
                    });
                };

                $scope.$watch("block.in", function () {
                    clearTimeout($scope.updateTimeout);
                    $scope.updateTimeout = null;
                });

                $scope.$watch("block.updatePeriod", function (newValue, oldValue) {
                    clearTimeout($scope.updateTimeout);
                    clearTimeout(applyUpdatePeriodTimeout);
                    $scope.updateTimeout = null;
                    if($scope.block.isExecuted && newValue > 0){
                        applyUpdatePeriodTimeout = setTimeout(function(){
                            clearTimeout($scope.updateTimeout);
                            $scope.updateTimeout = null;
                            $scope.request();
                        }, 1000);
                    }

                });

                $scope.isExecuting = false;

                var queryLanguageCodes = {
                    'SQL': 'text/x-sql',
                    'md': 'markdown'
                };

                $scope.codeMirrorOpts = {
                    extraKeys: {
                        'Enter': function () {
                            $scope.executeQuery();
                        }
                    },
                    mode: queryLanguageCodes[$scope.block.queryLanguage] || 'text/x-sql',
                    autofocus: true
                };

                $scope.$watch('block.queryLanguage', function(){
                    $scope.codeMirrorOpts.mode = queryLanguageCodes[$scope.block.queryLanguage] || 'text/x-sql';
                });

                $scope.showBlockOptions = function () {
                    $modal.open({
                        templateUrl: '/app/views/blockOptions.html',
                        controller: function ($scope, $modalInstance, block) {
                            $scope.block = block;

                            $scope.close = function () {
                                $modalInstance.close();
                            }
                        },
                        size: 'lgd',
                        resolve: {
                            block: function () {
                                return $scope.block;
                            }
                        }
                    });
                };

                $scope.removeBlock = function () {
                    $scope.removeCallback($scope.block);
                };

                $scope.decreaseSize = function(){
                    var newSize = $scope.block.availableSizes[$scope.block.availableSizes.indexOf($scope.block.size) - 1];
                    if(newSize !== undefined){
                        $scope.block.size = newSize;
                    }
                };

                $scope.increaseSize = function(){
                    var newSize = $scope.block.availableSizes[$scope.block.availableSizes.indexOf($scope.block.size) + 1];
                    if(newSize !== undefined){
                        $scope.block.size = newSize;
                    }

                };

                if($scope.block && $scope.block.isExecuted){
                    $scope.block.isExecuted = false;
                    $scope.executeQuery();
                }

                function updateBlockOptions(){
                    var columns = [];
                    if($scope.block.data[0]){
                        columns = Object.keys($scope.block.data[0]).map(function (d) {
                            return {
                                key: d,
                                title: d
                            };
                        });
                    }

                    $scope.block.options.availableKeys = columns.map(function (d) {
                        return d.key;
                    });

                    $scope.block.options.availableValues = columns.map(function (d) {
                        return d.key;
                    });

                    if($scope.block.options.availableKeys.indexOf($scope.block.options.key) == -1){
                        $scope.block.options.key = $scope.block.options.availableKeys[0] || null;
                    }

                    if($scope.block.options.availableValues.indexOf($scope.block.options.va) == -1){
                        $scope.block.options.value = ($scope.block.options.availableValues[1] || $scope.block.options.availableValues[0]) || null;
                    }
                }
            }]
        }
    }]);
});