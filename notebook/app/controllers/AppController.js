;
define(function (require, exports, module) {
    module.exports = require('../ngModule')
        .controller('AppController', [
            '$scope',
            '$rootScope',
            '$location',
            function ($scope, $rootScope, $location) {
                if(localStorage.getItem('isEnableUpdateIntervals') === null){
                    localStorage.setItem('isEnableUpdateIntervals', true);
                }
                $rootScope.isViewMode = localStorage.getItem('isViewMode') == 'true';
                $rootScope.isEnableUpdateIntervals = localStorage.getItem('isEnableUpdateIntervals') == 'true';

                $rootScope.$watch('isViewMode', function(){
                    localStorage.setItem('isViewMode', $rootScope.isViewMode);
                });

                $rootScope.$watch('isEnableUpdateIntervals', function(){
                    localStorage.setItem('isEnableUpdateIntervals', $rootScope.isEnableUpdateIntervals);
                });

                $scope.changeViewMode = function(){
                    $rootScope.isViewMode = !$rootScope.isViewMode;
                };

                $scope.changeIntervals = function(){
                    $rootScope.isEnableUpdateIntervals = !$rootScope.isEnableUpdateIntervals;
                };

                $scope.showNotebookButtons = false;

                $scope.$on('$routeChangeSuccess', function(){
                    $scope.showNotebookButtons = $location.path().search(/^\/notebook\/\d/i) === 0;
                });
            }
        ]);
});
