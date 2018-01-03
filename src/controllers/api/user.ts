import { JsonController, Get, Post, Ctx, Param } from 'routing-controllers'
import { ApiResponse, UserComponent } from '../../components'
import { createHash } from 'crypto'
import { tsp } from '../../components/http'

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

  @Get("/login")
  async login () {
    let userId = 12
    let { data } = await tsp('FAB.SPI.CustSearchController.queryByKey', {
      searchKey: userId,
      subSystem: 'fab',
      key: 101
    })
    return {
      success: true,
      errorCode: 0,
      data
    }
  }

}

export default User;