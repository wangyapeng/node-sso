
import { Next, Context, HttpError } from "koa";
import AuthMideWare from "../service/auth";
import Errors from '../exception'
const verifyToken =  (option: any) => async (ctx: Context, next: Next) => {
    const { exclude } = option;
    if (exclude.some((it: any) => ctx.url.includes(it) 
    || ctx.request.header.origin === 'http://sso.dq.com'
    || ctx.url.match(/\.js|.ts|.png|.css|.vue$/i))) {
        await next();
    } else {
        const bear = ctx.request.header['authorization']?.replace('Bear','');
        const token = bear.trim() || ctx.request.query?.token;
        if (!token) {
            throw new Errors.AuthFailed('没有授权token', 401);
        }
        if (token === 'null') {
            throw new Errors.AuthFailed('未授权', 401);
        }
        var ret = await AuthMideWare.vertifyToken(token);
        if (ret) {
            await next();
        }
    }
};

export default verifyToken