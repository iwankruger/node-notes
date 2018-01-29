

let serviceLocator = require('./lib/serviceLocator')();
serviceLocator.factory('car', require('./lib/car'));

let plugin = require('custom_plugin');
plugin(serviceLocator);

let car = serviceLocator.get('car');

car.start('123_key', (error, result) => {
   console.log('callback result:', result);
});

car.hoot();
