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

                controller: function ($scope, $rootScope) {
                    var updateOnChangeTimeout = null;

                    $scope.isExecuting = false;
                    $scope.errorMessage = null;
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

                    $scope.$watch('block.variables', function () {
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
                        if ($scope.block.updatePeriod > 0 && $rootScope.isEnableUpdateIntervals) {
                            $scope.request();
                        } else {
                            clearTimeout($scope.updateTimeout);
                            $scope.updateTimeout = null;
                        }
                    });

                    $rootScope.$watch('isEnableUpdateIntervals', function () {
                        if ($scope.block.updatePeriod > 0 && $rootScope.isEnableUpdateIntervals) {
                            $scope.request();
                        } else {
                            clearTimeout($scope.updateTimeout);
                            $scope.updateTimeout = null;
                        }
                    });

                    $scope.executeQuery = function () {
                        var input = $scope.block.in;
                        var variableRegex = /(\$\w+)/gmi;
                        var variables = [];
                        var r = variableRegex.exec(input);
                        var uniqueVar = {};
                        while (r) {
                            var varName = r[1].substr(1);
                            var oldVar = $scope.block.variables.filter(function (v) {
                                return v.name === varName
                            })[0];
                            if (oldVar) {
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
                        $scope.errorMessage = null;
                        $scope.updateTimeout = null;
                        if (!$scope.block.query || !$scope.block.backend) {
                            return;
                        }
                        $scope.isExecuting = true;
                        service.execute($scope.block).then(function (data) {
                            $scope.response = data;
                            $scope.block.data = data.data || [];
                            $scope.block.error = data.error || null;
                            $scope.block.isExecuted = true;
                            updateBlockOptions();
                        }, function (error) {
                            //handle error
                            $scope.errorMessage = error.error || "Oops... Something went wrong.";
                        })['finally'](function () {
                            $scope.isExecuting = false;
                            if ($scope.block.updatePeriod && $rootScope.isEnableUpdateIntervals) {
                                $scope.updateTimeout = setTimeout(function () {
                                    $scope.request();
                                }, $scope.block.updatePeriod * 1000);
                            }
                        });
                    };

                    $scope.executeQuery();

                    $scope.$on("$destroy", function () {
                        clearTimeout($scope.updateTimeout);
                    });

                    setTimeout(function () {
                        $scope.$broadcast('CodeMirror', function (cm) {
                            cm.on('focus', function () {
                                $scope.isEditorFocused = true;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            });
                            cm.on('blur', function () {
                                $scope.isEditorFocused = false;
                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            });
                        });
                    }, 0);

                    $scope.$watch('block.options.key', function (newVal) {
                        var firstItemKey = $scope.block.data[0] ? $scope.block.data[0][newVal] : null;
                        if (firstItemKey !== null) {
                            //check if firstItemKey is number
                            if (!isNaN(+firstItemKey)) {
                                //set keyType to number
                                $scope.block.options.keyType = 'number';
                            } else if (isDate(firstItemKey)) {//check if firstItemKey is Date
                                //set firstItemKey to datetime
                                $scope.block.options.keyType = 'datetime';
                            } else {
                                //set firstItemKey to string
                                $scope.block.options.keyType = 'string';
                            }
                        }
                    });

                    $scope.$watch('block.options.value', function (newVal) {
                        var firstItemValue = $scope.block.data[0] ? $scope.block.data[0][newVal] : null;
                        if (firstItemValue !== null) {
                            //check if firstItemValue is number
                            if (!isNaN(+firstItemValue)) {
                                //set keyType to number
                                $scope.block.options.valueType = 'number';
                            } else if (isDate(firstItemValue)) {//check if firstItemValue is Date
                                //set firstItemValue to datetime
                                $scope.block.options.valueType = 'datetime';
                            } else {
                                //set firstItemValue to string
                                $scope.block.options.valueType = 'string';
                            }
                        }
                    });

                    function isDate(dateStr) {
                        return ( (new Date(dateStr) !== "Invalid Date" && !isNaN(new Date(dateStr)) ));
                    }

                    function updateQuery() {
                        var str = $scope.block.in;
                        $scope.block.variables.forEach(function (v) {
                            str = str.replace(new RegExp("\\$" + v.name, "g"), v.value);
                        });
                        $scope.block.query = str;
                        $scope.request();
                    }

                    function updateBlockOptions() {
                        var columns = [];
                        if ($scope.block.data[0]) {
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

                        if ($scope.block.options.availableKeys.indexOf($scope.block.options.key) == -1) {
                            $scope.block.options.key = $scope.block.options.availableKeys[0] || null;
                        }

                        if ($scope.block.options.availableValues.indexOf($scope.block.options.va) == -1) {
                            $scope.block.options.value = ($scope.block.options.availableValues[1] || $scope.block.options.availableValues[0]) || null;
                        }
                    }
                }
            }
        }
    ]);
});