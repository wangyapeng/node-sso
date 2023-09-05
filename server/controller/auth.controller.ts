import { App } from "../entity/app";
import { AppDataSource, RedisDataSource } from "../../dataSource";
import Koa from "koa";
import { Context } from "koa";
import AuthMideWare from "../service/auth";
import OrderService from "../service/order";
import UserService from "../service/user";

export async function openTrialOrder(ctx: Koa.Context) {
    const { userId, tenantId, appId } = ctx.request.body;

    try {
        const parmas = {
            userId: userId,
            tenantId: tenantId,
            appId: appId
        };
        // 1. 创建订单
        const order = await OrderService.createTrialOrder(parmas);

        if (!order) {
            ctx.status = 200;
            ctx.body = {
                errorMessage: '已存在试用订单',
                error: true,
            }
            return
        }
        // 2. 开通鉴权
        const auth = await AuthMideWare.authTrialOrder(parmas)

        ctx.status = 200;
        ctx.body = {
            data: '开通成功',
            success: true,
        }
    } catch(e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = {
            errorMessage: e.message,
            error: true,
        }
    }
}

export async function getTrailOrder(ctx: Koa.Context) {
    const {userId, tenantId} = ctx.request.query;
    try {
        const res = await AuthMideWare.getTrialOrder({userId, tenantId});
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: res || []
        }
    } catch(e) {
        ctx.status = 500;
        ctx.body = {
            errorMessage: e.message,
            error: true,
        }
    }
}


export async function generateTokenByCode(ctx: Koa.Context) {
    const params = ctx.request.query;
    const { code } = params;
    const res =  await RedisDataSource.get(`${code}`);

    if (!res) {
        ctx.status = 401;
        ctx.body = {
            error: true,
            errorMessage: "code超时"
        };
        return
    }

    const token = UserService.generateToken(params, 1000 * 60 * 60 * 24 * 29);
    ctx.status = 200;
    ctx.body = token;
}

export async function verityAppToken(ctx: Context) {
    const { token } = ctx.request.query;
    console.log('------> token', token)
    const res = await AuthMideWare.verityAppToken(token);
    ctx.status = 200;
    ctx.body = res
}



export async function authorizeByJsonp(ctx: Koa.Context) {
    const params = ctx.url.split('?')[1];
    ctx.set('Content-Type', 'application/javascript')
    const res = await AuthMideWare.genarateAuthJson(params);
    ctx.body = res;
}
