'use strict';

module.exports = class {
    * exception() {
        // if (this.res.statusCode == 404) {
        //     params.keyword = this.res.statusCode;
        //     params.keyword += '-[EXCEPTION]';
        //     this.res.htmlRender(params, false, "site/404");
        // } else {
        //     params.keyword = this.res.statusCode || 500;
        //     params.keyword += '-[EXCEPTION]';
        //     this.res.htmlRender(params, false, "site/500");
        // }
        this.res.htmlRender();
    }
}
