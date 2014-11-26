;
define(function (require) {
    require('../ngModule').provider('queryPluginsManager', function () {
        var instance = new QueryPluginsManager();
        this.registerPlugin = function(name, plugin){
            instance.registerPlugin(name, plugin);
        };
        this.$get = function(){
            return instance;
        };

    });

    function QueryPluginsManager(){
        var plugins = {};
        var pluginsArr = [];
        this.registerPlugin = function (name, plugin) {
            if(!plugins[name]){
                plugins[name] = plugin;
                pluginsArr.push(plugin);
            }
        };

        this.getAll = function(){
            return pluginsArr.slice();
        };
    }
});