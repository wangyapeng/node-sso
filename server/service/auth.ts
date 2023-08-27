//@ts-nocheck
import { AppDataSource, RedisDataSource } from "../controller";
import { tokenConfig } from "../../config";
import { User } from "../entity/user";
import { AppStatusType, Auth } from "../entity/auth";
import { App } from "../entity/app";
import { randomString } from "../../utils/string";

import jwt from "jsonwebtoken";

var n = 1;
export default class AuthMideWare {
    public static async vertifyToken(token: any) {
        try {
            var decoded = jwt.verify(token, tokenConfig.secret);
            const userRepository = AppDataSource.getRepository(User);
            const userInfo = await userRepository.findOneBy({id: decoded.id});
            if (!userInfo) {
                return Promise.resolve(false);
            }

            // token 的有效期为60分钟，过期需要刷新
            //@ts-ignore
            if (new Date(decoded.exp * 1000).getTime() > Date.now()) {
                return Promise.resolve(userInfo);
            }

            return Promise.resolve(false);;
        } catch(err) {
            console.error(err)
            return Promise.resolve(false);
        }
    }

    // 开通企业试用订单鉴权
    public static async authTrialOrder(params: any) {
        const { userId, tenantId, appId} = params;
        const auth = new Auth();
        const authRepository = AppDataSource.getRepository(Auth);
        const appRepository = AppDataSource.getRepository(App);
        const app = await appRepository.findOneBy({id: Number(appId)});

        if (app) {
            auth.id = Date.now() + "";;
            auth.userId = userId;
            auth.tenantId = tenantId;
            auth.app = app;
            auth.domainName = `${Math.random().toString(36).slice(-8)}`;
            auth.bookCode = `${Math.random().toString(36).slice(-8)}`;
            auth.productName = app!.name;
            auth.productAppKey = app!.value;
            auth.appStatus = AppStatusType.TrialOrder;
            auth.authTime = new Date(Date.now());
            auth.failureTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
            
            const res = await authRepository.save(auth);
            return res;
        } else {
            return false;
        }
    }


    public static async getTrialOrder(params: any) {
        const { userId, tenantId, appId} = params;
        const authRepository = AppDataSource.getRepository(Auth);
        const res = await authRepository.findAndCountBy({
            userId,
            tenantId,
        })
        return res;
    }


    public static async verityAppToken(token: any) {
        try {
            var decoded = jwt.verify(token, tokenConfig.secret);
            const userRepository = AppDataSource.getRepository(User);
            const authRepository = AppDataSource.getRepository(Auth);
            const userInfo = await userRepository.findOneBy({id: decoded.userId});
            if (!userInfo) {
                return Promise.resolve(false);
            }

            const value = decoded.appKey;
            const productAppKey = decoded.appKey;
            const domainName = decoded.domainName;
            const bookCode = decoded.bookCode;
            const auth = await authRepository.findOneBy({
                userId: decoded.userId,
                productAppKey,
                domainName,
                bookCode,
            })

            if (!auth) {
                return false;
            }

            // token 的有效期为60分钟，过期需要刷新
            if (new Date(decoded.exp * 1000).getTime() > Date.now()) {
                return Promise.resolve(userInfo);
            }

            return Promise.resolve(false);;
        } catch(err) {
            console.error(err)
            return Promise.resolve(false);
        }
    }


    public static async genarateAuthJson(params: any) {
        console.log(params);
        const obj = params.split('&');
        const clientId = obj[0].split('=')[1];
        const jsonCallback = obj[1].split('=')[1];
        const code = `bf-${randomString(22)}`
        // 设置code过期时间为10分钟
        //@ts-ignore
        const res = await RedisDataSource.set(`${code}`, true, 'EX', 60*10);

        return `${jsonCallback}({"code":"${code}"});`
    }
}
