import * as Redis from 'ioredis';
import { InternalServerError, NotFoundError, ForbiddenError } from 'routing-controllers';
import { tsp } from '../components/http'
import { Model } from '../components/model'
import { createHash } from 'crypto'

// --- start:获取用户登录状态用的 redis 查询 ---
let REDIS_CFG: object;
switch(process.env.NODE_ENV) {
  case 'dev':
  case 'sit':
  default:
    REDIS_CFG = {
      port: 00, 
      host: '**'
    };
    break;
  case 'pre':
  case 'prod':
    REDIS_CFG = {
      port: 00, 
      host: '**'
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
// --- end:获取用户登录状态用的 redis 查询 ---

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

  static subSystem = 'fab'

  static ENUM_ACCOUNT_TYPE: LoginInfo[] = [
    {   // app
      'accountType': 'APP',
      'tokenPrefix': 'MOB_SESSIONID',
    },
    {   // m站正式会员
      'accountType': 'M',
      'tokenPrefix': 'MOB_SESSIONID_M',
    },
    {   // m站虚拟会员
      'accountType': 'VIRTUAL',
      'tokenPrefix': 'MOB_SESSIONID_VIRTUAL',
    }
  ];

  public id: number;
  public tel: number;
  public nickName?: string;
  public accountType: any;
  public realName?: string;
  public userName?: string;
  public custId: number;
  public email?: string;
  public phone?: number;

  static create (data: User|null): User {
    let user = new User()
    if(!data) {
      throw new NotFoundError('User Not Found')
    }else{
      // 调用接口获取用户信息
      user.id = data.id || data.custId;
      user.accountType = data.accountType;
      user.realName = data.realName;
      user.userName = data.userName;
      user.nickName = data.nickName;
      user.custId = data.custId;
      user.email = data.email;
      user.phone = data.phone;
      user.tel = data.tel;
    }
    return user
  }

  /**
   * 根据 userId 获取用户基本信息
   * @param userId 
   */
  static async findById (userId: number): Promise<User> {
    // 调 fab 接口
    let { data } = await tsp('FAB.SPI.CustSearchController.queryById', {
      custId: userId,
      subSystem: User.subSystem,
      key: 101
    });
    return User.create(data)
  }

  /**
   * 根据 cookie 获取用户，然后调用 byId 接口获取信息
   * @param cookie 
   */
  static async findByCookie(cookie: string): Promise<User> {
    // 根据 TOKEN_PREFIX 顺序依次从 redis 中获取用户信息
    let cookieVal: string|null = null;
    for(let { tokenPrefix, accountType } of User.ENUM_ACCOUNT_TYPE) {
      cookieVal = await redis.get(`${tokenPrefix}_${cookie}`)
      if(cookieVal) break
    }
    if(!cookieVal) {
      throw new NotFoundError('User Not Found')
    } else {
      let data = JSON.parse(cookieVal)
      return await User.findById(data.id)
    }
  }

  /**
   * 根据 手机号/会员名/昵称/邮箱 返回用户
   * @param key
   * @return User 
   */
  static async findByKey(searchKey: string|number): Promise<User> {
    let { data } = await tsp('FAB.SPI.CustSearchController.queryByKey', {
      searchKey,
      subSystem: User.subSystem,
      key: 101
    })
    return User.create(data)
  }

  /**
   * 校验密码
   * @param pwd 
   */
  public async checkPwd (pwd: string): Promise<boolean> {
    const service = 'FAB.SPI.CustController.checkPasswdById'
    const hash = createHash('md5')   // md5
    hash.update(pwd)
    const param = {
      custId: this.id,
      checkPwd: hash.digest('hex'),
      subSystem: User.subSystem,
      key: 101
    }
    let { success, msg } = await tsp(service, param)
    if(!success && msg) {
      throw new ForbiddenError(msg)
    }
    return success
  }

  // 生成 cookie 随机 token
  public generateCookie (): string {
    const hash = createHash('md5')   // md5
    hash.update(Date.now().toString() + Math.random())
    let token = hash.digest('hex')
    console.log(token)
    return token
  }

}


export default User;
export { redis };
