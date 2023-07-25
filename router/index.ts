const Router = require('koa-router');
import { Context } from 'koa';
import UserController  from '../controller/user';
const router = new Router();

// 指定一个url匹配
router.get('/', async (ctx: Context) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})

router.post('/auth/login', UserController.login);
router.post('/auth/register', UserController.register);
router.post('/auth/getUserInfo', UserController.getUserInfo);
router.post('/auth/refreshToken', UserController.refreshToken);

module.exports = router;