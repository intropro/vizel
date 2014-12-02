;
define(function (require) {
    require('./sqlQueryPlugin_control/sqlQueryPlugin');
    require('./controller');
    var moduleContainer = require('./ngModule');
    var plugin = {
        name: 'sqlQueryPlugin',
        queryLanguage: 'SQL',
        snippetUrl: '/app/modules/queryPlugins/sql/snippet.html',
        blockOptionsSnippetUrl: '/app/modules/queryPlugins/sql/blockOptions.html'
    };

    return {
        moduleName: moduleContainer.name,
        plugin: plugin
    }
});