/**
 * 一些公共的服务.
 *
 * @author guojunlong@tuniu.com (Allen Guo)
 * @copyright Copyright &copy; 2006-2017 Tuniu.com
 */
'user strict';
module.exports = class {
    __construct() {
        this.remoteSrv = this.ctx.getService('tuniu.services.RemoteService', '@tuniu/core');
    }

    getHeaderP(cityCode, from, clientIp) {
        // clientIp is unused.
        return this.remoteSrv.requestP('PHP.Bridge.Header', {
                cityCode,
                from
            })
            .then(result => {
                return result.data;
            }).catch(err => {
                return null;
            });
    }

    getFooterP(cityCode, from, clientIp) {
        // clientIp is unused.
        return this.remoteSrv.requestP('PHP.Bridge.Footer', {
                cityCode,
                from
            })
            .then(result => {
                return result.data;
            }).catch(err => {
                return null;
            });
    }
}