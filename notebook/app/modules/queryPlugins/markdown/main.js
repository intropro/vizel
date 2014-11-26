;
define(function (require) {
    require('./markdownQueryPlugin_control/markdownQueryPlugin');
    var moduleContainer = require('./ngModule');
    var plugin = {
        name: 'markdownQueryPlugin',
        queryLanguage: 'markdown',
        snippetUrl: '/app/modules/queryPlugins/markdown/snippet.html'
    };

    return {
        moduleName: moduleContainer.name,
        plugin: plugin
    }
});