import "reflect-metadata";
import * as Koa from 'koa';
import { Container } from 'typedi';
import { useKoaServer, useContainer } from 'routing-controllers';

let port: number;
switch(process.env.NODE_ENV) {
  default: 
    port = 80;
    break;
  case 'dev':
    port = 5000;
    break;
} 

useContainer(Container);
const app = new Koa();
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.path}`);
  return await next()
});
useKoaServer(app, {
  classTransformer: true,
  controllers: [__dirname + '/controllers/**/*{.js,.ts}']
});

app.listen(port);
console.log(`app running on port: ${port}`)
export default app;