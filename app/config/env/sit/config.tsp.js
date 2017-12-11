'use strict';

module.exports = {
    tsp: {
        registerServers: ['bj-tspregister-master.tuniu-sit.org:9989', 'bj-tspregister-slave.tuniu-sit.org:9989'],
        storage: {
            redis: {
                host: 'redis2.tuniu-sit.org',
                port: 6379
            }
        },
    }
};