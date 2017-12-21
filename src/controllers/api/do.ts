import { Context } from 'koa';
import * as Router from 'koa-router';
import { JsonController, Post, Ctx, Body, InternalServerError } from 'routing-controllers'
import { UserComponent } from '../../components'
import axios from 'axios';
import User from '../../models/user'

interface Request {
  url: string;
  method: string;
  params?: object
}

@JsonController("/api")
class Request {

  /**
   * node-getway
   * @param body 用户请求参数
   * @param user 自动获取 user 对象
   */
  @Post("/do")
  async doRequest (@Body() body: Request, @UserComponent({required: false}) user?: User): Promise<any> {
    let { url, method = 'get', params}: Request = body
    let data: any;
    try {
      let response = await axios({
        url, 
        method,
        data: params,
        timeout: 30 * 1000
      });
      data = response.data
    } catch ({message}) {
      throw new InternalServerError(message);
    }
    return data
  }
  

}

export default Request;