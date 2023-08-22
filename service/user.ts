import { User } from "../entity/user";
import { AppDataSource } from "../controller";
import { Tenant } from "../entity/tenant";
import { tokenConfig } from "../config";
import * as argon2 from "argon2";
import { Context } from "koa";
var jwt = require("jsonwebtoken");
class UserService {
  public static async requestUserInfo(id: any) {
    const userRepository = AppDataSource.getRepository(User);
    const tenantRepository = AppDataSource.getRepository(Tenant);

    try {
      var userInfo = await userRepository.findOneBy({ id: id });

      if (!userInfo) return false;
      const tenant = await tenantRepository
        .createQueryBuilder()
        .leftJoinAndSelect("user", "user", `user.id=${id}`)
        .getMany();

      userInfo["password"] = '';

      //@ts-ignore
      userInfo["tenants"] = tenant;
      return userInfo;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public static async login(ctx: Context, params: any) {
    const { name, email, password } = params;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const egzist = await userRepository.findBy({ email: email });

      if (!egzist[0] || egzist.length === 0) {
        return {
          result: false,
          message: "用户不存在",
        };
      }

      var passwordIsValid = await argon2.verify(egzist[0].password, password);

      if (!passwordIsValid) {
        return {
          result: false,
          message: "密码不正确",
        };
      }

      const id = egzist[0].id;
      const token = UserService.generateToken({ id }, 1000 * 60 * 60 * 24 * 29);
      const refreshToken = UserService.generateToken(
        { id, tokenType: "refresh" },
        1000 * 60 * 60 * 24 * 30
      );

      return {
        result: true,
        data: {
          id: egzist[0].id,
          name: egzist[0].name,
          refreshToken,
          token,
        },
      };
    } catch (e) {
      console.error(e);
      return {
        result: false,
        message: e.message,
      };
    }
  }

  public static generateToken(params: any, expires: number) {
    return jwt.sign(params, tokenConfig.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: expires,
    });
  }
}

export default UserService;
