const Router = require('koa-router');
import { Context } from 'koa';
import UserController  from '../controller/user.controller';
import { getTeanantInfo, putTenantInfo } from '../controller/tenant.controller';
import { authorizeByJsonp, generateTokenByCode, getTrailOrder, openTrialOrder, verityAppToken } from '../controller/auth.controller';
import { getApplist } from '../controller/app.controller';
const router = new Router();


router.post('/auth/login', UserController.login);
router.get('/auth/logout', UserController.logout);
router.post('/auth/register', UserController.register);
router.post('/auth/getUserInfo', UserController.getUserInfo);
router.post('/auth/refreshToken', UserController.refreshToken);
router.post('/auth/verityToken', UserController.verityToken);

router.post('/auth/verityAppToken', verityAppToken);
router.get('/auth/token',generateTokenByCode)

router.get('/auth/getTrialOrder', getTrailOrder)

router.get('/app-list',getApplist);
router.post('/open-trial0rder',openTrialOrder)

router.get('/internal_api/authorizeByJsonp', authorizeByJsonp)


router.get('/tenantInfo', getTeanantInfo);
router.post('/tenant', putTenantInfo);

module.exports = router;