'use strict';

const favicon = require('serve-favicon');
const path = require('path');
module.exports = function(config) {
    return favicon(path.join(config.assetBaseDir, 'images/favicon.ico'));
}