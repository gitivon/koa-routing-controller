import * as Redis from 'ioredis';
import { InternalServerError } from 'routing-controllers';
import { tsp } from '../components/http'
import { Model } from '../components/model'

let REDIS_CFG: object;

switch(process.env.NODE_ENV) {
  case 'dev':
  case 'sit':
  default:
    REDIS_CFG = {
      port: 6379, 
      host: 'redis1.tuniu-sit.org'
    };
    break;
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
  enableReadyCheck: false,
  retryStrategy (times) {
    return Math.min(20 * times, 2000);
  },
});

redis.on('error', e => {
  console.log(e)
  // throw new InternalServerError(e.message);
})

/**
 * 登录信息对象
 */
interface LoginInfo {
  accountType: string,     // 账户类型
  tokenPrefix: string      // session 前缀
}

/**
 * User 类
 */
class User {

  static subSystem = 'car'

  static ENUM_ACCOUNT_TYPE: LoginInfo[] = [
    {
      'accountType': 'APP',
      'tokenPrefix': 'MOB_SESSIONID',
    },
    {
      'accountType': 'M',
      'tokenPrefix': 'MOB_SESSIONID_M',
    },
    {
      'accountType': 'VIRTUAL',
      'tokenPrefix': 'MOB_SESSIONID_VIRTUAL',
    },
  ];

  id: number;
  tel: number;
  nickName?: string;
  accountType: any;
  realName?: string;
  userName?: string;
  custId: number;
  email?: string;
  phone?: number;

  constructor (@Model data: User) {
    // 调用接口获取用户信息
    this.id = data.id;
    this.accountType = data.accountType;
    this.realName = data.realName;
    this.userName = data.userName;
    this.nickName = data.nickName;
    this.custId = data.custId;
    this.email = data.email;
    this.phone = data.phone;
    this.tel = data.tel;
  }

  /**
   * 根据 userId 获取用户基本信息
   * @param userId 
   */
  static async findById (userId: number): Promise<User|null> {
    // 调 fab 接口
    let { data } = await tsp('FAB.SPI.CustSearchController.queryById', {
      custId: userId,
      subSystem: User.subSystem,
      key: 101
    });
    return new User(data)
  }

  /**
   * 根据 cookie 获取用户
   * @param cookie 
   */
  static async findByCookie(cookie: string): Promise<User|null> {
    let data = JSON.parse(await redis.get(cookie))
    return data ? User.findById(data.id) : null;
  }

  /**
   * 校验密码
   * @param pwd 
   */
  public async checkPwd (pwd: string): Promise<boolean> {
    const service = 'FAB.SPI.CustController.checkPasswdById'
    const param = {
      custId: this.id,
      checkPwd: pwd,
      subSystem: User.subSystem,
      key: 101
    }
    let { success } = await tsp(service, param)
    return success
  }


}

export default User;
export { redis };