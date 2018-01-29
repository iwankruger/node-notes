
exports.start = function(key, callback) {
    console.log('car starting...');
    return callback(null, 'car started');
}

exports.stop = function(key, callback) {
    console.log('car stopping...');
    callback(null, 'car stop');
}