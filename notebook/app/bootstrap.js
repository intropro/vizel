define(function (require) {
    var $ = require('jquery');
    var ng = require('angular');

    require('../app/ngModule');
    require('../app/main');
    require('../app/directives/activeIf');

    //starting angular
    $(function(){
        ng.bootstrap(document, ['notebook']);
    });
});