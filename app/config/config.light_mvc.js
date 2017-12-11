'use strict';
let appBaseDir = __dirname + '/../';
module.exports = {
    plugins : {
        lightMvc: {
            moduleName: '@tuniu/light-mvc',
            baseDir: appBaseDir + 'src/',
            router: {
                autoUrlPrefix: false,
                urlsMapping: {
                },
                urlsPrefix: [
                ]
            },
            bundles: {
                panel: {
                    secretKey: 'lifeissimple',
                }
            },
            exception: {
                debug: false,
                exceptionHandler: '/site/exception'
            }
        }
    }
};
