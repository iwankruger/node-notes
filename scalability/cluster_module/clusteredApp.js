var cluster = require('cluster');
var os = require('os');


// set to round robin for windows
cluster.schedulingPolicy = cluster.SCHED_RR;

if(cluster.isMaster) {
    var cpus = os.cpus().length;
    for (var i = 0; i < cpus; i++) {
        cluster.fork();
    }
} else {
    require('./app');
}

//Started 21072
//Started 15556
//Started 19828
//Started 9232