;
define(function (require, exports, module) {
    require('../services/notebookBlockService');
    var notebookBlock = require('../models/notebookBlock');
    module.exports = require('../ngModule')
        .controller('IndexController', [
            '$scope',
            'notebookBlockService',
            '$interval',
            '$routeParams',
            function ($scope, notebookBlockService, $interval, $routeParams) {
                var autoSaveInterval = $interval(function () {
//                    notebookBlockService.saveOne($scope.notebook);
                    notebookBlockService.saveAll($scope.blocks);
                }, 2000);

                $scope.isEditMode = !(localStorage.getItem('isViewMode') === 'true');
                $scope.$watch('isEditMode', function () {
                    localStorage.setItem('isViewMode', !$scope.isEditMode);
                });
                $scope.notebook = null;
                $scope.blocks = [];
                notebookBlockService.getAll().then(function (blocks) {
                    $scope.blocks = blocks;
                });
/*
                notebookBlockService.getById().then(function (notebook) {
                    $scope.notebook = notebook;
                    $scope.blocks = notebook.blocks;
                });
*/

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
