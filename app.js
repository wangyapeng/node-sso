const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = require('./router');
const koaBody = require('koa-body');
const {redisConfig} = require('./config');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');

const { createConnection } = require('typeorm');
require('reflect-metadata');

createConnection().then(() => {
    app.keys=['sdaHGH1.!'] //配置session秘钥
    app.use(session({
        cookie:{
            path:'/',
            httpOnly: false,
            maxAge: 24*60*60*1000
        },
        store:redisStore({
            // all:'127.0.0.1:6379' //写死本地的redis
            all: `${redisConfig.host}:${redisConfig.port}`
        })
    }))
    app.use(koaBody())
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((err) => console.log('TypeORM connection error:', err));
