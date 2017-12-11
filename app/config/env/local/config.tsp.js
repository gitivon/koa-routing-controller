'use strict';

module.exports = {
    tsp: {
        registerServers: ['bj-tspregister-slave.tuniu-dev.org:9989','bj-tspregister-master.tuniu-dev.org:9989'],
        monitor: {
            servers: [ // TSP监控中心UDP服务器主备IP端口信息配置
                {ip: '10.10.30.42', port: 11311},
                {ip: '10.10.30.42', port: 11311},
                {ip: '10.10.30.42', port: 11311}
            ],
        },
        logger: {
            level: 'warn',
        },
        storage: {
            redis: {
                host: 'redis1.tuniu-dev.org',
                port: 6379
            }
        }
    }
};