// object that delegates the operations to the active state
const asyncModule = require('./asyncModule');

//The wrapper
const asyncModuleWrapper = module.exports;
asyncModuleWrapper.initialized = false;

asyncModuleWrapper.initialize = function() {
    // the apply() method calls a function with a given this
    // activeState is the thisArg
    // argument is the [argsArray]
    // argument here is the callback function from app.js { '0': [() => {console.log('Async module initialized');}] }
    activeState.initialize.apply(activeState, arguments);
};

asyncModuleWrapper.tellMeSomething = function() {
    activeState.tellMeSomething.apply(activeState, arguments);
};


//The state to use when the module is not yet initialized
var pending = [];
const notInitializedState = {
    initialize: function(callback) {

        asyncModule.initialize(() => {
            asyncModuleWrapper.initalized = true;
            activeState = initializedState;

            pending.forEach(req => {
                asyncModule[req.method].apply(null, req.args);
            });

            pending = [];
            callback();
        });
    },
    tellMeSomething: function(callback){
        return pending.push({
            method: 'tellMeSomething',
            args: arguments
        });
    }
};

//The state to use when the module is initialized
var initializedState = asyncModule;

//Set the initial state to the notInitializedState
var activeState = notInitializedState;
