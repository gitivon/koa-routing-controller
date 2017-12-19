import { Context } from 'koa';
import * as http from 'http';

class User {

  async test (ctx: Context): Promise<any> {
    ctx.response.type = 'json';
    return {
      a: 'HeiHeiHeii~~, u are sb'
    }
  }

}

export default User;