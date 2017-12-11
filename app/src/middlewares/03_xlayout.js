'use strict';

const XLayout = require('@tuniu/xlayout');
const co = require('co');

module.exports = function(config, lightMvc) {
    const xlayout = XLayout(config.cdn);
    xlayout.setDefaultLayout('mobile')
    xlayout.enableHttpReplace(true);
    xlayout.register('mobile-another', {
        ref: 'mobile',
        blocks: {
            header: {
                path: 'layout/another/header',
            }
        }
    }, false);
    xlayout.register('mobile-another-nav', {
        ref: 'mobile',
        blocks: {
            header: {
                data: {}
            }
        }
    }, false);
    xlayout.register('mobile-simple', {
        ref: 'mobile',
        blocks: {
            header: {
                data: {
                    onclick: null,
                }
            }
        }
    }, false);
    return xlayout.pipe;
}