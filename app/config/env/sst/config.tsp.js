'use strict';

module.exports = {
    tsp: {
        registerServers:['bj-tspregister-master.tuniu-cie.org:9989','bj-tspregister-slave.tuniu-cie.org:9989'],
        storage: {
            redis: {
                host: 'redis1.tuniu-cie.org',
                port: 6379
            }
        },
    }
};
