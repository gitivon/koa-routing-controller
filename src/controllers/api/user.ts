import { JsonController, Get, Post, Ctx, Param, BodyParam, Body, Res } from 'routing-controllers'
import { ApiResponse, UserComponent } from '../../components'
import { createHash } from 'crypto'
import { tsp } from '../../components/http'
import { default as UserModel } from '../../models/user'
import { Context } from 'koa'

@JsonController("/api/user")
class User {

  @Get("/my")
  async getLoginUser (@UserComponent({required: true}) user): Promise<ApiResponse> {
    
    return {
      success: true,
      errorCode: 0,
      data: user
    }
  }

  @Get("/:id(\d+)")
  async getOne (@Ctx() ctx, @Param("id") id): Promise<ApiResponse> {
    return {
      success: true,
      errorCode: 0,
      data: id
    }
  }

  @Post("/login")
  async login (@BodyParam('key', { required: true }) key: string, @BodyParam('password', { required: true }) password: string, @Ctx() ctx: Context) {
    // 先根据 account 获取 user
    let user = await UserModel.findByKey(key)
    // 检查密码是否正确
    await user.checkPwd(password)
    // 设置 cookie 信息
    ctx.cookies.set('TUNIUmuser', user.generateCookie(), {
      domain: 'tuniu.org'
    })
    return {
      success: true,
      errorCode: 0,
      data: user
    }
  }


}

export default User;