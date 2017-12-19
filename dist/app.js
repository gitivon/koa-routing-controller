"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const user_1 = require("./controllers/api/user");
const user = new user_1.default();
const router = new Router();
const app = new Koa();
router.all('*', (ctx) => __awaiter(this, void 0, void 0, function* () {
    ctx.response.body = yield user.test(ctx);
}));
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(`${ctx.request.path}`);
    return yield next();
}));
app
    .use(router.routes())
    .use(router.allowedMethods());
exports.default = app;
//# sourceMappingURL=app.js.map