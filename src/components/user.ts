import { createParamDecorator, UnauthorizedError } from "routing-controllers";
import User from '../models/user';
import { Context } from 'koa';

const UserComponent = (options?: {required?: boolean}) => {
  return createParamDecorator({
    required: !!(options && options.required),
    async value ({ context }) {
      let token: string = context.request.get('SESSIONID') || context.cookies.get("TUNIUmuser") || context.cookies.get("muser");
      let user: User | null = null;
      if(token) {
        // 根据 TOKEN_PREFIX 顺序依次从 redis 中获取用户信息
        for(let { tokenPrefix, accountType } of User.ENUM_ACCOUNT_TYPE) {
          if(user = await User.findByCookie(`${tokenPrefix}_${token}`)) {
            user.accountType = accountType;
            break;
          }
        }
      }
      if (this.required && !user) {
        throw new UnauthorizedError('not login');
      } 
      return user
    }
  })
}

export { UserComponent }