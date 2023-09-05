import { Context } from "koa";
import argon2 from "argon2";
import Koa from "koa";
import { User } from "../entity/user";
import { AppDataSource, RedisDataSource } from "../../dataSource";
import { redisConfig, tokenConfig } from "../../config";
import AuthMideWare from "../service/auth";
import { Tenant } from "../entity/tenant";
import { EntityManager } from "typeorm";
import UserService from "../service/user";
import { randomString } from "../../utils/string";


class CaptionController {
    public static async generate(ctx: Koa.Context) {
        const {time} = ctx.request.query;
        const randomStr = `capt${randomString(22)}${time}`
        await RedisDataSource.set(`${randomStr}`, '1', 'EX', 60*10);
        ctx.status = 200;
        ctx.body = {
            data: {
                code: 200,
                key: randomStr
            }
        }
    }

    public static async verify(ctx: Koa.Context) {
        const { key } = ctx.request.body;
        console.log('----> key',key, ctx.request.body)
        const random = await RedisDataSource.get(key);
        if (!random) {
            ctx.status = 500;
            ctx.body = {
                ret: {
                    code: 500,
                    message: "验证码已过期"
                },
                data: {
                    pass: false
                }
            }
            return
        }

        ctx.status = 200;
        ctx.body = {
            ret: {
                code: 200,
                message: "true"
            },
            data: {
                pass: true
            }
        }
    }
}

export default CaptionController