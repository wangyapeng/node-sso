
import { Context, Next } from 'koa';
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const koaBody = require('koa-body');
import AuthMideWare from './service/auth';

app.use(koaBody())

/*
中间件
*/
//@ts-ignore
app.use(async (ctx: Context,next: Next) => {
    console.log(ctx.url, ctx.status);
    if (ctx.status == 404){
        ctx.status = 404;
        ctx.body = '404页面';
    } else {
        console.log(ctx.url)
    }

    if (ctx.url.includes('register') || ctx.url.includes('login')) {
        await next();
    } else {
        //@ts-ignore
        var ret = await AuthMideWare.vertifyToken(ctx?.request?.body?.token);
        if (ret) {
            ctx.status = 200;
            ctx.body = 'just this user login';
            await next();
        } else {
            ctx.status = 401;
            ctx.body = '用户未登录'
        }
    }
})


app.use(router.routes()).use(router.allowedMethods());

app.listen(9002, () => {
    console.log('Server is running on port 9002');
})
