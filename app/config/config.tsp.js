'use strict';

module.exports = {
    tsp: {
        subSystem: 'SUB', // 当前使用者隶属子系统
        module: 'SUB_API', // 当前子系统模式
        storage: {
            redis: {
                host: 'localhost',
                port: 6379
            },
            timeout: 3000, // 单位：ms
        },
        //初始化启动时需要向TSP注册集群中心读取的服务列表
        services: []
    }
};