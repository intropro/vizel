;
define(function (require) {
    require('../services/notebookService');
    require('../ngModule').controller('NotebookListController', [
        '$scope',
        'notebookService',
        function ($scope, notebookService) {
            $scope.notebooks = [];

            notebookService.getAll().then(function (notebooks) {
                $scope.notebooks = notebooks;
            }, function (error) {

            });
        }
    ]);
});