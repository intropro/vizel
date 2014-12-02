;
define(function (require, exports, module) {
    var notebookBlock = require('../models/notebookBlock');
    module.exports = require('../ngModule')
        .controller('IndexController', [
            '$scope',
            'notebookService',
            '$interval',
            '$routeParams',
            function ($scope, notebookService, $interval, $routeParams) {
                var autoSaveInterval = $interval(function () {
                    if($scope.notebook){
                        notebookService.saveOne($scope.notebook);
                    }
                }, 1000);

                $scope.$on("$destroy", function() {
                    if (autoSaveInterval) {
                        $interval.cancel(autoSaveInterval);
                    }
                });

                $scope.errorMessage = null;

                $scope.isEditMode = !(localStorage.getItem('isViewMode') === 'true');
                $scope.$watch('isEditMode', function () {
                    localStorage.setItem('isViewMode', !$scope.isEditMode);
                });
                $scope.notebook = null;
                $scope.blocks = [];

                notebookService.getById(+$routeParams.id).then(function (notebook) {
                    $scope.notebook = notebook;
                    $scope.blocks = notebook.blocks;
                }, function(message){
                    $scope.errorMessage = message || 'Notebook not found'
                });


                $scope.blurEditor = function () {
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                };

                $scope.addBlock = function () {
                    $scope.blocks.push(notebookBlock.factory());
                };

                $scope.removeNotebookBlock = function (block) {
                    var removeIt = confirm('Are you sure you want to remove this block?');
                    if (removeIt) {
                        var blockIndex = $scope.blocks.indexOf(block);
                        if (blockIndex > -1) {
                            $scope.blocks.splice(blockIndex, 1);
                        }
                    }
                };

                $scope.gridsterOpts = {
                    margins: [10, 10],
                    columns: 4,
                    draggable: {
                        enabled: true
                    },
                    resizable:{
                        enabled:true
                    },
                    floating: true,
                    pushing: true,
                    swapping:true,
                    rowHeight:80
                };
            }
        ]);
});
