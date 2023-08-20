
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const cookie = require('koa-cookie');
const koaBody = require('koa-body');
const verifyToken = require('./middleware/verifyToken');

app.use(cookie.default())
app.use(verifyToken({
    exclude: ['/', 'login','Token','register']
}))
app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods());
app.listen(9002, () => {
    console.log('Server is running');
})
