;
define(function (require) {
    require('../services/notebookService');
    var notebook = require('../models/notebook');
    require('../ngModule').controller('NotebookListController', [
        '$scope',
        'notebookService',
        '$modal',
        function ($scope, notebookService, $modal) {
            $scope.notebooks = [];

            notebookService.getAll().then(function (notebooks) {
                $scope.notebooks = notebooks;
            }, function (error) {

            });

            $scope.createNew = function(){
                var newCanvas = notebook.factory();
                $scope.editInDialog(newCanvas);
            };

            $scope.remove = function(notebook){
                var decision = confirm('Are you sure you want to remove the notebook ' + notebook.name + '?');
                if(decision){
                    notebookService.removeById(notebook.id);
                }
            };


            $scope.editInDialog = function (notebook) {
                $modal.open({
                    templateUrl: '/app/views/editNotebook.html',
                    controller: function ($scope, $modalInstance, notebook) {
                        $scope.notebook = notebook;

                        $scope.close = function () {
                            $modalInstance.close();
                        };

                        $scope.save = function () {
                            notebookService.saveOne(notebook).then(function(savedCanvas){
                                $modalInstance.close();
                            }, function(){
                                alert('Error!');
                            });

                        };
                    },
                    size: '',
                    resolve: {
                        notebook: function () {
                            return notebook;
                        }
                    }
                });
            };
        }
    ]);
});