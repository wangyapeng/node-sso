
import { Next, Context } from "koa";
import AuthMideWare from "../service/auth";

module.exports = (option: any) => async (ctx: Context, next: Next) => {
    const { exclude } = option;
    try {
        if (exclude.some((it: any) => ctx.url.includes(it))) {
            await next();
        } else {
            //@ts-ignore
            const token = ctx.request.header['authorization'].replace('Bear','').trim();
            var ret = await AuthMideWare.vertifyToken(token);
            if (ret) {
                console.log(ret)
                await next();
            } else {
                ctx.status = 500;
                ctx.body = "error";
            }
        }
    } catch (e) {
        ctx.status = 500;
        ctx.body = "error";
    }
};

