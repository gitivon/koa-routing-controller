'use strict';

const LightRender = require('@tuniu/light-render');
module.exports = function(config) {
    const lightRender = LightRender(config.light_render);
    return [
        lightRender.htmlRender,
        lightRender.autoRender,
        lightRender.apiRender,
        lightRender.xRender,
    ]
}