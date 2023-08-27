//@ts-nocheck
import Router from 'koa-router';
import { Context, Next } from 'koa';
import UserController  from '../controller/user.controller';
import { getTeanantInfo, putTenantInfo } from '../controller/tenant.controller';
import { authorizeByJsonp, generateTokenByCode, getTrailOrder, openTrialOrder, verityAppToken } from '../controller/auth.controller';
import { getApplist } from '../controller/app.controller';
const router = new Router();

router.get('/', async(ctx: Context, next: Next) => {
    await ctx.render('index')
    await next()
})

router.get('/login', async(ctx: Context, next: Next) => {
    await ctx.render('login')
    await next()
})


router.post('/auth/login', UserController.login);
router.get('/auth/logout', UserController.logout);
router.post('/auth/register', UserController.register);
router.post('/auth/getUserInfo', UserController.getUserInfo);
router.post('/auth/refreshToken', UserController.refreshToken);
router.get('/auth/verityToken', UserController.verityToken);

router.get('/auth/verityAppToken', verityAppToken);
router.get('/auth/token',generateTokenByCode)

router.get('/auth/getTrialOrder', getTrailOrder)

router.get('/app-list',getApplist);
router.post('/open-trial0rder',openTrialOrder)

router.get('/internal_api/authorizeByJsonp', authorizeByJsonp)


router.get('/tenantInfo', getTeanantInfo);
router.post('/tenant', putTenantInfo);

export default router