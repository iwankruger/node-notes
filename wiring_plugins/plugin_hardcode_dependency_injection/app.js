
let car = require('./lib/car');
// include custom plugin that adds extra functionality to the car library
// by means for hardcoded dependencies
require('custom_plugin');

car.start('123_key', (error, result) => {
   console.log('callback result:', result);
});

car.hoot();
