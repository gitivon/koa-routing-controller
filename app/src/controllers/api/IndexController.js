/**
 * API示例.
 *
 * @author who@tuniu.com
 * @since 2017/3/21
 * @copyright Copyright &copy; 2006-2017 Tuniu.com
 */
'use strict';

const common = require('@tuniu/light-common');
const TuniuError = importModel('tuniu.common.TuniuError', '@tuniu/core');

module.exports = class {
    * index() {
        this.req.requestType = 'ajax';

        let apiResp = new common.ApiResponse();
        apiResp.data = {
            content: 'Hello API'
        }
        this.res.apiRender(apiResp);
    }

    * error() {
        this.req.requestType = 'ajax';

        let apiResp = new common.ApiResponse();
        apiResp.data = {
            content: 'Error Sample.'
        }
        apiResp.setCode(TuniuError.codes.GENERAL);
        this.res.apiRender(apiResp);
    }
}