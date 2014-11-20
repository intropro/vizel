;
define(function (require) {
    var d3 = require('d3');
    require('../../../ngModule').directive('plotGrid', function () {
        return {
            restrict: 'EA',
            templateUrl: '/app/controls/plots/grid/grid.html',
            scope: {
                model: '=plotData'
            },

            controller: function ($scope) {
                $scope.columns = [];

                $scope.$watchCollection('model.data', function () {
                    $scope.columns = [];
                    if ($scope.model.data && $scope.model.data.length > 0) {
                        $scope.columns = Object.keys($scope.model.data[0]).map(function (d) {
                            return {
                                key: d,
                                title: d
                            };
                        });
                    }
                });

            }
        }
    });
});