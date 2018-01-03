import axios from 'axios'
import { inspect } from 'util'
import base64 from './base64'
import { ApiResponse } from './apiResponse'
import { random } from 'lodash'

/**
 * 从数组中随机抽取一个成员返回
 */
const getRandomFromArray = <T>(ary: T[]): T => ary[random(0, ary.length - 1)]

interface ApiRequest {
  url: string,
  method?: string,
  headers: any,
  data: any
}

let 
  TspAddr: string,
  TspHost: string;

switch (process.env.NODE_ENV) {
  default: 
    TspHost = 'http://public-api.bj.pla.tuniu.org/tsg/register/service/query';
    TspAddr = 'http://public-api.bj.pla.tuniu.org/tsg/register/service/address/query';
    break;
  case 'sit':
  case 'dev':
    TspHost = 'http://public-api.pla.tuniu-sit.org/tsg/register/service/query';
    TspAddr = 'http://public-api.pla.tuniu-sit.org/tsg/register/service/address/query';
    break;
}

const http = async (url: string, data: any|null, method: string = 'get', log: boolean = true): Promise<ApiResponse> => {
  let request = {
    url, data, method
  }
  if(request.method.toLowerCase() == 'get') {
    request.url += '?' + base64.encode(JSON.stringify(request.data))
  } else {
    request.data = base64.encode(JSON.stringify(request.data))
  }
  const result = await axios(request)
  if(log) {
    console.log(request, JSON.parse(base64.decode(result.data)))
  }
  return JSON.parse(base64.decode(result.data))
}

const tsp = async (name: string, data: any|null): Promise<ApiResponse> => {
  // 查询 tsp 信息对应的 mapping 和 method
  let resultTspUrl = await http(TspHost, { name }, 'get', false)
  const { mapping, method } = getRandomFromArray(resultTspUrl.data.rows)
  // 查询服务器 host
  let resultTspAddr = await http(TspAddr, { name }, 'get', false)
  const { providerAddress } = getRandomFromArray(resultTspAddr.data.rows)
  return await http(`http://${providerAddress}${mapping}`, data, method)
}

export {
  http, 
  tsp,
  axios
}
