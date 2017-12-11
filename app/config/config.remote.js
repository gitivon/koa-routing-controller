'use strict';
module.exports = {
    remote: {
        cache: {
            timeout: 3000, // 单位：ms
            storageType: 'redis',
            storage: {
                redis: {
                    host: 'localhost',
                    port: 6379,
                }
            },
            shortTermCache: {
                expired: 100 * 60 * 1000,// 单位：ms.  此例为100分钟。
                enabled: false
            },
            longTermCache: {
                expired: 24 * 60 * 60 * 1000, // 单位：ms, 0表示永久保存. 此例为1天。
                enabled: true
            },
            keyPrefix: 'API:REMOTE_SERVICES:CACHE:'
        },
        logger: {
            level: 'info',
        },
        timeout: 20 * 1000,
        services: {
        }
    }
};
