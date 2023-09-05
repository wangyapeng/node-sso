import { Context, Next } from "koa";
import Errors from '../exception'

const catchError = () => async (ctx: Context, next: Next) => {
  try {
    await next();
    if (ctx.status === 404) {
      throw new Errors.NotFound("未找到该路由", 404);
    }
  } catch (err) {
    console.error('🕷 -------->', err);
    if (err.errorCode) {
      // 如果是自己主动抛出的 HttpException类 错误
      ctx.status = err.status || err.code || 500;
      ctx.body = {
        code: err.code,
        message: err.message,
        errorCode: err.errorCode,
        request: `${ctx.method} ${ctx.path}`,
      };
    } else {
      ctx.app.emit("error", err, ctx);
    }
  }
};

export default catchError