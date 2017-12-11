'use strict';

module.exports = function(config) {
    let baseUrl = config.params.remote.baseUrls['INTERNAL_API'];
    
    return {
        remote: {
            services: {
                'PHP.Bridge.Header': {
                    inputEncoding: 'rest',
                    outputEncoding: 'base64',
                    serverInfo: {
                        baseUrl: baseUrl,
                        path: '/api/comHeader/getNewTop/',
                    },
                    cache: {
                        shortTermCache: {
                            expired: 30 * 60,// 30分钟
                            enabled: true
                        }
                    }
                },
                'PHP.Bridge.Footer': {
                    inputEncoding: 'rest',
                    outputEncoding: 'base64',
                    serverInfo: {
                        baseUrl: baseUrl,
                        path: '/api/comFooter/getBottom/',
                    },
                    cache: {
                        shortTermCache: {
                            expired: 30 * 60,// 30分钟
                            enabled: true
                        }
                    }
                },
                'TBS.city.CityContoller.queryBookingCity': {
                    channel: 'TSP', // 默认为非TSP
                    // tspName: 'TBS.city.CityContoller.queryBookingCity', // 默认为键名
                    // name: 'TBS.city.CityContoller.queryBookingCity',// 默认为健名
                    // inputEncoding: 'rest', // 默认 querystring
                    // outputEncoding: 'base64', // 默认base64
                    // method: 'GET' // 默认为GET
                    // timeout: 89000 // 默认取系统配置.
                    serverInfo: { // 当channel=TSP，该节点无效.
                        baseUrl: 'http://10.10.30.109:8080', // 当该节点存在时，忽略protocol、host、port.
                        path: '/tbs/city/booking-city/query'
                        // protocol: 'http:', 
                        // host: '10.10.30.109:',
                        // port: 80 
                    },
                    cache: {
                        shortTermCache: {
                            expired: 10 * 60 * 1000,// 单位：ms, 此例为10分钟.
                            enabled: false
                        },
                        longTermCache: {
                            expired:  0, // 单位：ms, 0表示永久保存.
                            enabled: true
                        }
                    }
                }
            }
        }
    }
};
