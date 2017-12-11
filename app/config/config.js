'use strict';

let path = require('path');
module.exports = function(config) {
    let appBaseDir = __dirname + '/../';
    return {
        appName: 'api',
        debugMode: false,
        port: 80,
        appBaseDir: appBaseDir,
        srcBaseDir: config.srcBaseDir || path.join(appBaseDir, 'src/'),
        logBaseDir: config.logBaseDir || path.join(appBaseDir, '../var/logs/'),
        assetBaseDir: config.assetBaseDir || path.join(appBaseDir, '../public/'),
        toolbar: {
            enabled: true
        },
        localModuleBaseDir: appBaseDir + 'modules/',
        session: {
            store: {
                redis: {
                    ttl: 86400 * 7,
                    host: "localhost",
                    port: 6379
                }
            }
        },
        cookies: {
            secretKey: 'lifeiseasybutyoumadeitcomplicated'
        }
    };
}