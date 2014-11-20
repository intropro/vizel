define(function(require, exports, module){
    require('angular-nvd3');
    require('uiCodemirror');
    require('ng-datamap');

    module.exports = require('angular').module('notebookModule', ['ngRoute', 'nvd3', 'ui.codemirror', 'datamaps']);
});