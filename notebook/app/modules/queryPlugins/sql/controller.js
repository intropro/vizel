;
define(function (require) {
    var plugin = require('./ngModule');
    var name = 'controller_' + plugin.name;
    var service = require('./service');
    plugin.module.controller(name, [
        '$scope',
        service.name,
        function ($scope, service) {



        }
    ]);

    return {
        name: name
    };
});