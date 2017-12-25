import { Context } from 'koa';
import * as Router from 'koa-router';

interface ApiResponse {
  success: boolean;
  message?: [string];
  data: any;
};

export { ApiResponse };
