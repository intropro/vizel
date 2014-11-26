;
define(function (require) {
    require('./sqlQueryPlugin_control/sqlQueryPlugin');
    var moduleContainer = require('./ngModule');
    var plugin = {
        name: 'sqlQueryPlugin',
        queryLanguage: 'SQL',
        snippetUrl: '/app/modules/queryPlugins/sql/snippet.html'
    };

    return {
        moduleName: moduleContainer.name,
        plugin: plugin
    }
});