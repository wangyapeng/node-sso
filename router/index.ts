const Router = require('koa-router');
import UserController  from '../controller/user';
const router = new Router();

// 指定一个url匹配
router.get('/', async (ctx: any) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})

console.log(UserController)

router.post('/auth/login', UserController.login);
router.post('/auth/register', UserController.register);

module.exports = router;