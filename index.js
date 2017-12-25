const Koa = require('koa');
const Router = require('koa-router');
const chalk = require('chalk');
const Redis = require('ioredis');

const app = new Koa();
const router = new Router()

const redis = new Redis({
  port: 6379,
  host: 'redis1.tuniu-sit.org',
  db: 0
});

app.use(async (ctx, next) => {
  try {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    await next()
  }catch(e) {
    console.error(e)
  }
})

// router.get('/redis/:redisKey', async (ctx, next) => {
//   ctx.response.type = 'json';
//   let data = await redis.get(ctx.params.redisKey);
//   ctx.response.body = data;
// })


router.get('/getSession', async (ctx, next) => {
  let data = await redis.get(`MOB_SESSIONID_M_${ctx.cookies.get('TUNIUmuser')}`);
  ctx.response.type = 'json';
  console.log(data);
  ctx.response.body = data;
})

router.get('/set', async ctx => {
  let result = await redis.set('TEMP_', '11112')
  console.log(result)
  ctx.response.body = 'success'
})

// console.log(router.routes())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(5000)