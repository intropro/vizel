;
define(function (require) {
    require('./markdownQueryPlugin_control/markdownQueryPlugin');
    var moduleContainer = require('./ngModule');
    var plugin = {
        name: 'markdownQueryPlugin',
        queryLanguage: 'markdown',
        snippetUrl: '/app/modules/queryPlugins/markdown/snippet.html',
        needBackend: false
    };

    return {
        moduleName: moduleContainer.name,
        plugin: plugin
    }
});