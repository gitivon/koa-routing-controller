import * as Redis from 'ioredis';
import { InternalServerError } from 'routing-controllers';

const redis = new Redis({
  port: 6379, 
  host: 'redis1.tuniu-sit.org',
  reconnectOnError (err): boolean {
    // throw new InternalServerError(err.message);
    return true;
  }
});

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