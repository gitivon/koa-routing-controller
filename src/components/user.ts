import { createParamDecorator, UnauthorizedError } from "routing-controllers";
import User from '../models/user';
import { Context } from 'koa';

const TOKEN_PREFIX = {
  [User.ENUM_ACCOUNT_TYPE.APP] : 'MOB_SESSIONID',              // app
  [User.ENUM_ACCOUNT_TYPE.M]: 'MOB_SESSIONID_M',               // m
  [User.ENUM_ACCOUNT_TYPE.VIRTUAL]: 'MOB_SESSIONID_VIRTUAL',   // m 站虚拟会员
};

const UserComponent = (options?: {required?: boolean}) => {
  return createParamDecorator({
    required: options && options.required ? true : false,
    async value ({ context }) {
      let token: string = context.cookies.get("TUNIUmuser");
      let user: User | null = null;
      if(token) {
        // 根据 TOKEN_PREFIX 顺序依次从 redis 中获取用户信息
        for(let accountType in TOKEN_PREFIX) {
          let prefix = TOKEN_PREFIX[accountType];
          if(user = await User.findByCookie(`${prefix}_${token}`)) {
            user.accountType = accountType;
            break;
          }
        }
      }
      if (this.required && !user) {
        throw new UnauthorizedError('not login');
      } 
      return user || new User({
        userId: 0,
        accountType: ''
      })
    }
  })
}

export { UserComponent }