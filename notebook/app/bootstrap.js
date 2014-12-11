define(function (require) {
    var $ = require('jquery');
    var ng = require('angular');

    require('../app/ngModule');
    require('../app/main');
    require('../app/directives/activeIf');
    require('../app/controllers/AppController');

    //starting angular
    $(function(){
        ng.bootstrap(document, ['notebook']);
    });
});