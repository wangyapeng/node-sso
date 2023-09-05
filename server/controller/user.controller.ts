import { Context } from "koa";
import argon2 from "argon2";
import Koa from "koa";
import { User } from "../entity/user";
import { AppDataSource } from "../../dataSource";
import { tokenConfig } from "../../config";
import AuthMideWare from "../service/auth";
import { Tenant } from "../entity/tenant";
import { EntityManager } from "typeorm";
import UserService from "../service/user";

import jwt from "jsonwebtoken";

export default class UserController {
  public static async register(ctx: Koa.Context) {
    console.log('--------> register', ctx.request.body)
    const userRepository = AppDataSource.getRepository(User);
    const newUser = new User();
    const { name, email, password } = ctx.request.body;
    newUser.name = name;
    newUser.email = email;
    newUser.password = await argon2.hash(password);

    const egzist = await userRepository.findOneBy({ email: newUser.email });
    if (egzist) {
      ctx.status = 409;
      ctx.body = "email already exists";
      return;
    }
    // save to the database
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }

  public static async getUserInfo(ctx: Koa.Context) {
    const { id } = ctx.request.body;
    const token = ctx.request.header["authorization"]
      .replace("Bear", "")
      .trim();
    
      if (!token) {
          ctx.status = 200;
          ctx.body = {
            message: "未查询到信息"
          };
        return;
      }
    try {
      var decoded = jwt.verify(token, tokenConfig.secret) as any;
      const userInfo = await UserService.requestUserInfo(id || decoded.id);
      if (userInfo) {
        ctx.status = 200;
        ctx.body = userInfo;
        return;
      }
    } catch (e) {
      console.error(e)
      ctx.status = 401;
      ctx.body = e.message;
      return
    }
  }

  public static async login(ctx: Koa.Context) {
    const { name, email, password } = ctx.request.body;
    const res = await UserService.login(ctx, { name, email, password });
    const { id, token }: any = res.data;
    ctx.cookies.set("login", "true", {
      domain: "dq.com",
      path: "/", // 有效范围
      httpOnly: false, // 只能在服务器修改
      maxAge: 24 * 60 * 60 * 1000,
    });

    ctx.cookies.set("userId", `${id}`, {
      domain: "dq.com",
      path: "/", // 有效范围
      httpOnly: false, // 只能在服务器修改
      maxAge: 24 * 60 * 60 * 1000,
    });

    ctx.cookies.set("userToken", `${token}`, {
      domain: "dq.com",
      path: "/", // 有效范围
      httpOnly: false, // 只能在服务器修改
      maxAge: 24 * 60 * 60 * 1000,
    });

    ctx.status = 200;
    ctx.body = res.data;
    return
  }

  /**
   * logout
   * @param ctx
   */
  public static async logout(ctx: Koa.Context) {
    ctx.cookies.set("login", "false", {
      path: "/", // 有效范围
      domain: "dq.com",
      httpOnly: false, // 只能在服务器修改
      maxAge: 0,
    });
    ctx.cookies.set("userId", null, {
      path: "/", // 有效范围
      domain: "dq.com",
      httpOnly: false, // 只能在服务器修改
      maxAge: 0,
    });
    ctx.cookies.set("userToken", null, {
      path: "/", // 有效范围
      domain: "dq.com",
      httpOnly: false, // 只能在服务器修改
      maxAge: 0,
    });
    ctx.cookies.set("appUserToken", null, {
      path: "/", // 有效范围
      domain: "dq.com",
      httpOnly: false, // 只能在服务器修改
      maxAge: 0,
    });
    ctx.cookies.set("appUserToken", null, {
      path: "/", // 有效范围
      domain: "dudu.dq.com",
      httpOnly: false, // 只能在服务器修改
      maxAge: 0,
    });
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "登出成功",
    };
  }

  public static async verityToken(ctx: Koa.Context) {
    try {
      // const hasToken = ctx.request.header['authorization'] || ctx.request.query?.token;
      // const bear = ctx.request.header['authorization'].replace('Bear','');
      // const token = bear.trim() || ctx.request.query?.token;
      // if (!token) {
      //   ctx.status = 401;
      //   ctx.code = 401;
      //   ctx.body = {
      //     success: false,
      //     errorMsg: "未发现token信息",
      //   };
      //   return
      // }
      // var ret = await AuthMideWare.vertifyToken(token);
      if (true) {
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: "校验成功",
        };
      }
    } catch(e) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        errorMsg: "token校验失败",
      };
    }
  }

  /**
   * 刷新token
   */
  public static async refreshToken(ctx: Koa.Context) {
    const { token, refreshToken } = ctx.request.body;
    var decoded = jwt.verify(refreshToken, tokenConfig.secret) as any;

    // token 的有效期为60分钟，过期需要刷新
    if (new Date(decoded.exp * 1000).getTime() > Date.now()) {
      const userRepository = AppDataSource.getRepository(User);
      const egzist = await userRepository.findBy({ id: decoded.id });
      const id = egzist[0].id;
      const token = UserService.generateToken({ id }, 60 * 60 * 24 * 29);
      const refreshToken = UserService.generateToken(
        { id, tokenType: "refresh" },
        60 * 60 * 24 * 30
      );
      ctx.status = 200;
      ctx.body = {
        id: egzist[0].id,
        email: egzist[0].email,
        token,
        refreshToken,
      };
    } else {
      ctx.status = 10010;
      ctx.body = {
        errCode: 10010,
        errMsg: "登录过期",
      };
    }
  }
}
