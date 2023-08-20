import { Context } from 'koa';
import * as argon2 from 'argon2';

import { User } from '../entity/user';
import { AppDataSource } from '.';
import { tokenConfig } from '../config';
import AuthMideWare from '../service/auth';
import { Tenant } from '../entity/tenant';
import { EntityManager } from 'typeorm';
import UserService from '../service/user';

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

export default class UserController {
  public static async register(ctx: Context) {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = new User();

    //@ts-ignore
    const { name, email, password } = ctx.request.body;
    newUser.name = name;
    newUser.email = email;
    newUser.password = await argon2.hash(password);

    const egzist = await userRepository.findOneBy({email: newUser.email})
    if (egzist) {
      ctx.status = 409;
      ctx.body = 'email already exists';
      return;
    }
    // save to the database
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }

  public static async getUserInfo(ctx: Context) {
    //@ts-ignore
    const { id } = ctx.request.body;
    //@ts-ignore
    const token = ctx.request.header['authorization'].replace('Bear','').trim();
    var decoded = jwt.verify(token, tokenConfig.secret);
    try {
      const userInfo = await UserService.requestUserInfo(id || decoded.id);
      if (userInfo) {
          ctx.status = 200;
          ctx.body = userInfo
          return
      }
    } catch(e) {
      ctx.status = 401;
      ctx.body = e.message;
    }
  }



  public static async login(ctx: Context) {
    //@ts-ignore
    const { name, email, password } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const egzist = await userRepository.findBy({email: email});

    if (!egzist[0] || egzist.length === 0) {
      ctx.body = 'user info is not egisit, please regist';
      return
    }

    var passwordIsValid = await argon2.verify(
      egzist[0].password,
      password
    );

    if (!passwordIsValid) {
      ctx.status = 401;
      ctx.body = {
        accessToken: null,
        message: "Invalid Password!"
      };
      return;
    }
    const id = egzist[0].id;
    const token = jwt.sign({ id: egzist[0].id },
      tokenConfig.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 60 * 60 * 24 * 29,
      });

    const refreshToken = jwt.sign({ id: egzist[0].id, tokenType: "refresh" },
      tokenConfig.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 60 * 60 * 24 * 30,
    });

    ctx.cookies.set("login", "true", {
      domain: 'dq.com',
      path: "/", // 有效范围
      httpOnly: false, // 只能在服务器修改
      maxAge: 24 * 60 * 60 * 1000,
    })

    ctx.cookies.set('userId',`${id}`, {
      domain: 'dq.com',
      path: "/", // 有效范围
      httpOnly: false, // 只能在服务器修改
      maxAge: 24 * 60 * 60 * 1000,
    })

    ctx.cookies.set('userToken',`${token}`, {
      domain: 'dq.com',
      path: "/", // 有效范围
      httpOnly: false, // 只能在服务器修改
      maxAge: 24 * 60 * 60 * 1000,
    })

    ctx.status = 200;
    ctx.body = {
      id: egzist[0].id,
      name: egzist[0].name,
      refreshToken,
      token,
    };
  }

  /**
   * logout
   * @param ctx
   */
  public static async logout(ctx: Context) {
    ctx.cookies.set("login", "false", {
      path: "/", // 有效范围
      domain: 'dq.com',
      httpOnly: false, // 只能在服务器修改
      maxAge: 0,
    })
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: "登出成功"
    }
  }

  public static async verityToken(ctx: Context) {
    //@ts-ignore
    const { token, refreshToken } = ctx.request.body;
    var ret = await AuthMideWare.vertifyToken(token);
    if (ret) {
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: '校验成功'
      }
    } else {
        ctx.status = 401;
        ctx.body = {
          success: false,
          errorMsg: 'token校验失败'
        }
    }
  }

  /**
   * 刷新token
   */
  public static async refreshToken(ctx: Context) {
    //@ts-ignore
    const {token, refreshToken} = ctx.request.body;
    var decoded = jwt.verify(refreshToken, tokenConfig.secret);

    // token 的有效期为60分钟，过期需要刷新
    if (new Date(decoded.exp * 1000).getTime() > Date.now()) {
      const userRepository = AppDataSource.getRepository(User);
      const egzist = await userRepository.findBy({id: decoded.id});
      const token = jwt.sign({ id: egzist[0].id },
        tokenConfig.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 60 * 60, // 24 hours
        });
        const refreshToken = jwt.sign({ id: egzist[0].id, tokenType: "refresh" },
          tokenConfig.secret,
          {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 60 * 60 * 24 * 30,
        });
        ctx.status = 200;
        ctx.body = {
          id: egzist[0].id,
          email: egzist[0].email,
          token,
          refreshToken
        }
    } else {
      ctx.status = 10010;
      ctx.body = {
        errCode: 10010,
        errMsg:'登录过期'
      }
    }
  }
}
