
import { Next, Context, HttpError } from "koa";
import AuthMideWare from "../service/auth";
import Errors from '../exception'
module.exports = (option: any) => async (ctx: Context, next: Next) => {
    const { exclude } = option;
    if (exclude.some((it: any) => ctx.url.includes(it))) {
        await next();
    } else {
        if (!ctx.request.header['authorization']) {
            throw new Errors.AuthFailed('没有授权token', 401);
        }
        const token = ctx.request.header['authorization'].replace('Bear','').trim();
        if (token === 'null') {
            throw new Errors.AuthFailed('未授权', 401);
        }
        var ret = await AuthMideWare.vertifyToken(token);
        if (ret) {
            await next();
        }
    }
};

