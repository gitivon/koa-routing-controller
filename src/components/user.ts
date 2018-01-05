import { createParamDecorator, UnauthorizedError } from "routing-controllers";
import User from '../models/user';
import { Context } from 'koa';

/**
 * 根据请求 body,cookie 获取当前登录用户
 * @param options 
 */
const UserComponent = (options?: {required?: boolean}) => {
  return createParamDecorator({
    required: !!(options && options.required),
    async value ({ context }): Promise<User> {
      // 先判断是否登录
      let token: string = context.request.get('SESSIONID') || context.cookies.get("TUNIUmuser") || context.cookies.get("muser");
      return await User.findByCookie(token)
    }
  })
}

export { UserComponent }