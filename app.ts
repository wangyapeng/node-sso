
const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const koaBody = require('koa-body');

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods());
app.listen(9002, () => {
    console.log('Server is running');
})
