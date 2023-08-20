import { Tenant } from "../entity/tenant";
import { AppDataSource } from "../controller";
import { Context } from "koa";
import TenantService from "../service/tenant";

export async function getTeanantInfo(ctx: Context) {
    const { userId, tenantId } = ctx.request.query;
    const repository = AppDataSource.getRepository(Tenant);

    try {
        //@ts-ignore
        const egisit = await repository.findOneBy({id: tenantId})
        if (egisit) {
            ctx.status = 200;
            ctx.body = {
                success: true,
                data: egisit
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                error: true,
                message: '未查询到账套信息'
            }
        }
    } catch(e) {
        console.error(e);
        ctx.status = 500;
        ctx.body = {
            message: e.message
        }
    }
}

export async function putTenantInfo(ctx: Context & any) {
    const body = ctx.request.body;
    const { id } = ctx.request.query;
    try {
        const res = await TenantService.putTenantInfo(id, body);
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: res
        }
    } catch(e) {
        ctx.status = 500;
        ctx.body = {
            message: e.message
        }
    }
}