import * as Redis from 'ioredis';
import { InternalServerError } from 'routing-controllers';

let REDIS_CFG: object;

switch(process.env.NODE_ENV) {
  case 'sit':
  default:
    REDIS_CFG = {
      port: 6379, 
      host: 'redis1.tuniu-sit.org'
    };
    break;
    case 'dev':
  case 'pre':
  case 'prod':
    REDIS_CFG = {
      port: 26707, 
      host: 'hx-mob-master.redis.tuniu.org'
    };
    break;
}

const redis = new Redis({
  ...REDIS_CFG,
  reconnectOnError (err): boolean {
    // throw new InternalServerError(err.message);
    console.log(err)
    return true;
  } 
});

redis.on('error', e => {
  console.log(e)
  // throw new InternalServerError(e.message);
})

class User {

  static ENUM_ACCOUNT_TYPE = {
    'APP': 'USER_ACCOUNT_TYPE_APP',
    'M': 'USER_ACCOUNT_TYPE_M',
    'VIRTUAL': 'USER_ACCOUNT_TYPE_VIRTUAL'
  };

  userId: number;
  nickname?: string;
  accountType?: any;

  constructor (data: object) {
    for(let i in data) {
      this[i] = data[i]
    }
  }

  static async findByCookie(cookie: string): Promise<User|null> {
    let data = JSON.parse(await redis.get(cookie))
    return data ? new User({
      userId: data.id
    }) : null
  }

}

export default User;