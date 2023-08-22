import { App } from "../entity/app";
import { AppDataSource } from "../controller";
import { Context } from "koa";

export async function getApplist(ctx: Context) {
    const repository = AppDataSource.getRepository(App);
    const list = await repository.findAndCount();

    ctx.status = 200;
    ctx.body = {
        data: list,
        success: true,
    }
}