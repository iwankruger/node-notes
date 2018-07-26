/*
// --------------------------------------------------------------------------------
// Example with promise
// demonstrating issue, function called twice because error is caught by catch
// --------------------------------------------------------------------------------

function fetchFirstUser(callback) {
    new Promise((resolve) => {
        console.log("In promise");
        resolve('name');
    }).then((user) => {
        console.log('In then');
        callback(null, user);
    }).catch((e) => {
        console.log('In catch');
        callback(null);
    });
}

fetchFirstUser((err, user) => {
    console.log('Done');
    console.log(user);
    throw new Error('Errrrrrrrrrr');
});

// Console output
// In promise
// In then
// Done
// name
// In catch
// Done
// undefined
// (node:5224) UnhandledPromiseRejectionWarning: Error: Errrrrrrrrrr
// at fetchFirstUser (C:\werk\ndira-backend\public_html\scripts\test.js:23:11)
// at Promise.then.catch (C:\werk\ndira-backend\public_html\scripts\test.js:16:9)
// at <anonymous>
// at process._tickCallback (internal/process/next_tick.js:188:7)
// at Function.Module.runMain (module.js:695:11)
// at startup (bootstrap_node.js:188:16)
// at bootstrap_node.js:609:3
// (node:5224) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
// (// node:5224) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
//
//     Process finished with exit code 0
*/

// --------------------------------------------------------------------------------
// Example with callbackify
// fixing the the issue where the function is called twice
// --------------------------------------------------------------------------------
const util = require('util');

function fetchFirstUser2() {
    return new Promise((resolve) => {
        console.log("In promise");
        resolve('name');
    }).then((user) => {
        console.log('In then');
        return user;
    }).catch((e) => {
        console.log('In catch');
        return null;
    });
}

const fetchFirstUserWitCallback = util.callbackify(fetchFirstUser2);

fetchFirstUserWitCallback((err, user) => {
    console.log('Done');
    console.log(user);
    throw new Error('Errrrrrrrrrr');
});

// Console output
// In promise
// In then
// Done
// name
// C:\werk\ndira-backend\public_html\scripts\test.js:72
// throw new Error('Errrrrrrrrrr');
// ^
//
// Error: Errrrrrrrrrr
// at fetchFirstUserWitCallback (C:\werk\ndira-backend\public_html\scripts\test.js:72:11)
// at cb (util.js:1085:39)
// at _combinedTickCallback (internal/process/next_tick.js:138:11)
// at process._tickCallback (internal/process/next_tick.js:180:9)
// at Function.Module.runMain (module.js:695:11)
// at startup (bootstrap_node.js:188:16)
// at bootstrap_node.js:609:3
//
// Process finished with exit code 1









