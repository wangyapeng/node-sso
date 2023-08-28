import { App } from "../entity/app";
import { AppDataSource } from ".";
import { Context } from "koa";
import Koa from "koa";

export async function getApplist(ctx: Koa.Context) {
    const repository = AppDataSource.getRepository(App);
    const list = await repository.findAndCount();

    ctx.status = 200;
    ctx.body = {
        data: list,
        success: true,
    }
}