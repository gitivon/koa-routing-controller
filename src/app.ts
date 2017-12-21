import "reflect-metadata";
import * as Koa from 'koa';
import { Container } from 'typedi';
import { useKoaServer, useContainer } from 'routing-controllers';

useContainer(Container);
const app = new Koa();
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.path}`)
  return await next()
})
useKoaServer(app, {
  classTransformer: true,
  controllers: [__dirname + '/controllers/**/*{.js,.ts}']
})

app.listen(5000)
console.log(`app running on port: 5000`)
export default app;