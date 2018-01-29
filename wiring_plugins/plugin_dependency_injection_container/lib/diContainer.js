let argsList = require('args-list');

module.exports = function() {
    let dependencies = {};
    let factories = {};
    let diContainer = {};

    diContainer.factory = function(name, factory) {
        factories[name] = factory;
    };

    diContainer.register = function(name, dep) {
        dependencies[name] = dep;
    };

    diContainer.get = function(name) {
        if(!dependencies[name]) {
            let factory = factories[name];
            // enable to provide inject factory
            //dependencies[name] = factory && diContainer.inject(factory);
            dependencies[name] = factory && factory;
            if(!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        return dependencies[name];
    };

    diContainer.inject = function(factory) {
        let args = argsList(factory).map(function(dependency) {
            return diContainer.get(dependency);
        });
        return factory.apply(null, args);
    };

    return diContainer;
}