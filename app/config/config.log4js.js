'use strict';
module.exports = function(config) {
    return {
        log4js: {
            appenders: [{
                type: 'console',
                category: 'app',
                maxLogSize: 20480,
                backups: 3,
                layout: {
                    'type': 'pattern',
                    'pattern': '%d %p %c - %m'
                }
            }],
            levels: {
                app: 'WARN'
            }
        }
    };
}
