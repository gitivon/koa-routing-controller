import { Context } from 'koa';
import * as Router from 'koa-router';

interface ApiResponse {
  success: boolean;
  errorCode: number;
  message?: [string];
  data: any;
};

export { ApiResponse };
