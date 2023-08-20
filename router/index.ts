const Router = require('koa-router');
import { Context } from 'koa';
import UserController  from '../controller/user.controller';
import { getTeanantInfo, putTenantInfo } from '../controller/tenant.controller';
const router = new Router();

// 指定一个url匹配
router.get('/', async (ctx: Context) => {
    ctx.type = 'html';
    ctx.body = '<h1>hello world!</h1>';
})

router.post('/auth/login', UserController.login);
router.get('/auth/logout', UserController.logout);
router.post('/auth/register', UserController.register);
router.post('/auth/getUserInfo', UserController.getUserInfo);
router.post('/auth/refreshToken', UserController.refreshToken);
router.post('/auth/verityToken', UserController.verityToken);


router.get('/tenantInfo', getTeanantInfo);
router.post('/tenant', putTenantInfo);

module.exports = router;