import { JsonController, Get, Post, Ctx, Param } from 'routing-controllers'
import { ApiResponse, UserComponent } from '../../components'

@JsonController("/api/user")
class User {

  @Get("/getLoginUser")
  async getLoginUser (@UserComponent({required: false}) user): Promise<ApiResponse> {
    return {
      success: true,
      data: user
    }
  }

  @Get("/:id(\d+)")
  async getOne (@Ctx() ctx, @Param("id") id): Promise<ApiResponse> {
    return {
      success: true,
      data: id
    }
  }

  @Post("/login")
  async login () {

  }

}

export default User;