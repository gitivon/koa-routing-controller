/**
 * 页面示例.
 *
 * @author guojunlong@tuniu.com
 * @since 2017/3/21
 * @copyright Copyright &copy; 2006-2017 Tuniu.com
 */
'use strict';

module.exports = class {
    * index() {
        this.res.autoRender({content: 'Hello Api'});
    }

    * ejs() {
        this.res.htmlRender({content: 'EJS Sample.'});
    }

    * xlayout() {
        let that = this;
        let page = this.res.getPage();

        // page.setConfig({httpReplace: false});

        // page.setLayout('mobile-simple');
        // page.setLayout('mobile-another-nav');
        // page.setLayout('default');
        page.addBlock('header', {
            slogan: 'ANOTHER HEADER',
        });
        page.addBlock('footer', {
            title: 'ANOTHER FOOTER',
        });
        page.setBody({
            intro: 'Everything is just beginning.',
        });
        page.render();
    }

    * logo() {
        var url = 'http://10.10.32.160/fb2/t1/group1/M00/05/2C/Cgogo1lSMHqIS8TuAAA3RJkWs3UAAABQQJcWDgAADdc202.png';
        var request = require('request');
        request.get(url).pipe(this.res);
    }

    * tsp() {
        let remoteSrv = this.ctx.getService('tuniu.services.RemoteService', '@tuniu/core');
        let resp = yield remoteSrv.requestP('TBS.city.CityContoller.queryBookingCity');
        const common = require('@tuniu/light-common');
        this.res.end(common.utils.dump(resp));
    }    
}
