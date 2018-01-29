

let car = require('./lib/car');

let plugin = require('custom_plugin');
plugin(car);

car.start('123_key', (error, result) => {
   console.log('callback result:', result);
});

car.hoot();
