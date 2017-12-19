import * as Koa from 'koa';
import * as Router from 'koa-router';
import User from './controllers/api/user';

const user = new User();
const router = new Router();
const app = new Koa();

router.all('*', async (ctx: Koa.Context) => {
  ctx.response.body = await user.test(ctx)
})

app.use(async (ctx: Koa.Context, next): Promise<any> => {
  console.log(`${ctx.request.path}`)
  return await next();
});
app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;