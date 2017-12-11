'use strict';

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
module.exports = function(config) {
    let env = config.env;
    let filename;
    if (env === 'local') {
        filename = path.resolve(config.appBaseDir, '../var/logs/access.log');
    } else {
        let filePrefix = config.params.appId + '-';
        if (env !== 'prd') {
            filePrefix += env + '-';
        }
        filename = path.resolve(config.params.prodLogBaseDir, filePrefix + "access.log");
    }
    let folder = path.parse(filename).dir;
    if (!fs.existsSync(folder)) {
        mkdirp.sync(folder);
    }
    return {
        morgan: {
            format: ':x-forwarded-for - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":http_host" :response-time "-" "-" ":x-request-id" ":remote-addr"',
            rotator: {
                filename: filename,
                verbose: false
            }
        }
    }
}
