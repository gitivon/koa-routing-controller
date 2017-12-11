'use strict';

module.exports = {
    debugMode: true, // 根据该参数，可以做一些开关设置.
    port: 5000,
    session: {
        store: {
            redis: {
                host: 'redis1.tuniu-dev.org',
                port: 6379,
            }
        }
    }
};
