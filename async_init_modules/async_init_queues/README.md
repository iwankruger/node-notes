# Wrapping the asynchronous module with preinitialisation queues
Queue any operations invoked on an asynchronous module during the time it's not yet initialised and then flush the queue when ready to process them.

Great application for the State pattern!  Two states, one that queues all the operations while the module is not yet initialised, and another that simply delegates each method to the original asyncModule module, when the initialisation is complete.

Often, we don't have the chance to modify the code of the asynchronous module; so, to add our queuing layer, we will need to create a proxy around the original asyncModule module. See asyncModuleWrapper.js

If we try to send a request to the server again, we will see that during the time the asyncModule module is not yet initialised, the requests will not fail; instead, they will hang until the initialisation is completed and will only then be actually executed. We can surely affirm that this is a much more robust behavior.

* run app.js
* http://localhost:8000/say
* wait for initialisation
* I say: Current time is: Tue Feb 20 2018 11:59:04 GMT+0200 (South Africa Standard Time)