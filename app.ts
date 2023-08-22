/// <reference lib="es2017.string" />

import { Context } from "koa";
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cookie = require('koa-cookie');
const koaBody = require('koa-body');
const verifyToken = require('./middleware/verifyToken');
const catchError = require('./middleware/catchError');
const logger = require('koa-logger')
const cors = require('koa2-cors');
const excludeRoute = ['login','Token','register', 'verityAppToken', 'authorizeByJsonp'];

app.use(
    cors({
        origin: function(ctx: Context) { //设置允许来自指定域名请求
            return 'http://localhost:3110'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

app.use(catchError())

app.use(logger())

app.use(koaBody())

app.use(cookie.default())

app.use(verifyToken({
    exclude: excludeRoute,
}))

app.use(router.routes()).use(router.allowedMethods());

app.listen(9002, () => {
    console.log('Server is running');
})
