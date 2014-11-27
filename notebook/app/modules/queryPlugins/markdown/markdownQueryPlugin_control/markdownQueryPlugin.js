;
define(function (require) {
    var d3 = require('d3');
    var markdown = require('markdown');
    require('../ngModule').module.directive('markdownQueryPlugin', [
        function () {
            return {
                restrict: 'EA',
                templateUrl: '/app/modules/queryPlugins/markdown/markdownQueryPlugin_control/markdownQueryPlugin.html',
                scope: {
                    block: '=markdownQueryPlugin'
                },

                controller: function ($scope) {
                    $scope.isExecuting = false;
                    $scope.codeMirrorOpts = {
                        extraKeys: {
                            'Shift-Enter': function () {
                                $scope.executeQuery();
                            }
                        },
                        mode: 'markdown',
                        autofocus: true
                    };
                    $scope.resultHtml = '';
                    $scope.isEditorFocused = false;

                    $scope.executeQuery = function () {
                        $scope.resultHtml = markdown.toHTML($scope.block.in);
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
                }
            }
        }
    ]);
});