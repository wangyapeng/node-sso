import { AppDataSource } from "../controller";
import { tokenConfig } from "../config";
import { User } from "../entity/user";

var jwt = require("jsonwebtoken");
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
            if (new Date(decoded.exp * 1000).getTime() > Date.now()) {
                return Promise.resolve(userInfo);
            }

            return Promise.resolve(false);;
        } catch(err) {
            return Promise.resolve(false);
        }
    }
}

module.exports = AuthMideWare