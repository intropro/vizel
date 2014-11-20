define(function (require) {
    require('../ngModule').directive('activeIf', function ($location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var path = attrs['activeIf'];

                scope.$on('$routeChangeSuccess', doIt);

                function doIt() {
                    if ($location.path().substr(0, path.length) == path) {
                        element.addClass("active");
                    } else {
                        element.removeClass("active");
                    }
                }
            }
        };
    });
});