

let diContainer = require('./lib/diContainer')();
diContainer.factory('car', require('./lib/car'));

//initialize the plugin
diContainer.inject(require('custom_plugin'));

let car = diContainer.get('car');

car.start('123_key', (error, result) => {
    console.log('callback result:', result);
});

car.hoot();
