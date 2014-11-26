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

                    $scope.executeQuery = function() {
                        $scope.resultHtml = markdown.toHTML($scope.block.in);
                    };

                    $scope.executeQuery();
                }
            }
        }
    ]);
});