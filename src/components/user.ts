import { createParamDecorator, UnauthorizedError } from "routing-controllers";
import User from '../models/user';
import { Context } from 'koa';

const UserComponent = (options?: {required?: boolean}) => {
  return createParamDecorator({
    required: options && options.required ? true : false,
    async value ({ context }) {
      const token: string = context.cookies.get("TUNIUmuser");
      let user: User | null = null;
      if(token) {
        const sessionId: string = `MOB_SESSIONID_M_${token}`;
        user = await User.findByCookie(sessionId);
      }
      if (this.required && !user) {
        throw new UnauthorizedError('not login');
      } 
      return user || new User(0)
    }
  })
}

export { UserComponent }