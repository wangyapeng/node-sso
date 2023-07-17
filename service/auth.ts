import { tokenConfig } from "../config";

var jwt = require("jsonwebtoken");
export default class AuthMideWare {
    public static async vertifyToken(token: any) {
        try {
            var decoded = jwt.verify(token, tokenConfig.secret);
            console.info(`token失效时间-${new Date(decoded.exp * 1000).toString()}`)
            if (new Date(decoded.exp * 1000).getTime() > Date.now()) {
                console.error('token有效')
                return Promise.resolve(true);
            }
            return Promise.resolve(false);;
        } catch(err) {
            // err
            return Promise.resolve(false);
        }
    }
}

module.exports = AuthMideWare