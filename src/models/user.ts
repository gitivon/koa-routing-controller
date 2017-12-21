import * as Redis from 'ioredis';

const redis = new Redis(6379, 'redis1.tuniu-sit.org')

class User {

  userId: number;
  nickname?: string;

  constructor (userId: number) {
    this.userId = userId
  }

  static async findByCookie(cookie: string): Promise<User|null> {
    let data = JSON.parse(await redis.get(cookie))
    return data ? new User(data.id) : null
  }

}

export default User;