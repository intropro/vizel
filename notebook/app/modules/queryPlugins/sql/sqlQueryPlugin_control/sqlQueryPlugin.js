;
define(function (require) {
    var d3 = require('d3');
    var service = require('../service');
    var queryVariable = require('../../../../models/queryVariable');
    require('../ngModule').module.directive('sqlQueryPlugin', [
        service.name,
        function (service) {
            return {
                restrict: 'EA',
                templateUrl: '/app/modules/queryPlugins/sql/sqlQueryPlugin_control/sqlQueryPlugin.html',
                scope: {
                    block: '=sqlQueryPlugin'
                },

                controller: function ($scope) {
                    var updateOnChangeTimeout = null;

                    $scope.isExecuting = false;
                    $scope.codeMirrorOpts = {
                        extraKeys: {
                            'Shift-Enter': function () {
                                $scope.executeQuery();
                            }
                        },
                        mode: 'text/x-sql',
                        autofocus: true
                    };
                    $scope.updateTimeout = null;
                    $scope.isEditorFocused = false;

                    $scope.$watch('block.variables', function() {
                        if (!$scope.block.isExecuted) {
                            return;
                        }
                        clearTimeout(updateOnChangeTimeout);
                        updateOnChangeTimeout = setTimeout(updateQuery, 600);
                    }, true);

                    $scope.$watch('block.in', function () {
                        clearTimeout($scope.updateTimeout);
                        $scope.updateTimeout = null;
                    });

                    $scope.$watch('block.updatePeriod', function () {
                        if($scope.block.updatePeriod > 0) {
                            $scope.request();
                        } else {
                            clearTimeout($scope.updateTimeout);
                            $scope.updateTimeout = null;
                        }
                    });

                    $scope.executeQuery = function() {
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
                        service.execute($scope.block.cluster.endPoint, $scope.block.query).then(function (data) {
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
                        }, function () {
                            $scope.isExecuting = false;
                        });
                    };

                    $scope.executeQuery();

                    setTimeout(function () {
                        $scope.$broadcast('CodeMirror', function (cm) {
                            cm.on('focus', function(){
                                $scope.isEditorFocused = true;
                                if(!$scope.$$phase){
                                    $scope.$apply();
                                }
                            });
                            cm.on('blur', function(){
                                $scope.isEditorFocused = false;
                                if(!$scope.$$phase){
                                    $scope.$apply();
                                }
                            });
                        });
                    }, 0);

                    function updateQuery(){
                        var str = $scope.block.in;
                        $scope.block.variables.forEach(function(v){
                            str = str.replace(new RegExp("\\$" + v.name, "g"), v.value);
                        });
                        $scope.block.query = str;
                        $scope.request();
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
                }
            }
        }
    ]);
});