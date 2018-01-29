
module.exports = function() {
    let dependencies = {};
    let factories = {};
    let serviceLocator = {};

    serviceLocator.factory = function(name, factory) {
        factories[name] = factory;
    };

    serviceLocator.test = () => {
        return factories;
    }

    serviceLocator.register = function(name, instance) {
        dependencies[name] = instance;
    };

    serviceLocator.get = function(name) {

        if(!dependencies[name]) {
            let factory = factories[name];
            dependencies[name] = factory && factory;
            // enable to provide serviceLocator to factory
            // dependencies[name] = factory && factory(serviceLocator);
            if(!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        return dependencies[name];
    };

    return serviceLocator;
};