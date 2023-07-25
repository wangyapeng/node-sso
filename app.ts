
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
    if (ctx.status == 404){
        ctx.status = 404;
        ctx.body = '404页面';
    } else {
        console.log(ctx.url)
    }

    if (ctx.url.includes('register') || ctx.url.includes('login') || ctx.url.includes('refreshToken')) {
        await next();
    } else {
        //@ts-ignore
        const token = ctx.request.header['authorization'].replace('Bear','').trim();
        var ret = await AuthMideWare.vertifyToken(token);
        if (ret) {
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
