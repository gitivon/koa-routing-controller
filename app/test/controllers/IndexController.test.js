/**
 * IndexController.js测试
 *
 * @author guojunlong@tuniu.com
 * @copyright Copyright &copy; 2006-2017 Tuniu.com
 */
'use strict';

const assert = require('assert');
const request = require('supertest');
const mock = require('@tuniu/light-mock');
describe('src/controller/IndexController.test.js', () => {
    let app = null;
    before(() => {
        mock.env('local');  //设置环境变量
        mock.consoleLevel(0); // 设置日志级别为0（不输出任何日志）
        app = mock.app(); // 创建当前应用的 app 实例
    });

    let action1 = '/index/ejs';
    describe('GET请求' + action1, () => {
        it('返回状态码为200', function *() {
            const result = yield request(app).get(action1);
            assert(result.status === 200);
        });
    });

    let action2 = '/index/index';
    describe('GET请求' + action2, () => {
        it('返回状态码为200', function *() {
            const result = yield request(app).get(action2);
            assert(result.status === 200);
        });
    });
});
