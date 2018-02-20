# Require asynchronous module 
This example illustrates what would happen when an asynchronous initialised module is called before the module is initialised.

* run app.js
* http://localhost:8000/say
* The following error message will be displayed: Error:I don't have anything to say right now
* See async_init_queues how to handle asynchronous initialised modules  
