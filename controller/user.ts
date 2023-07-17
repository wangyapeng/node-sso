import { Context } from 'koa';
import * as argon2 from 'argon2';

import { User } from '../entity/user';
import { AppDataSource } from '.';
import { tokenConfig } from '../config';
import AuthMideWare from '../service/auth';

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

export default class UserController {
  public static async register(ctx: Context) {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = new User();

    //@ts-ignore
    const { name, email, password } = ctx.request.body;
    console.log(ctx.request)
    newUser.name = name;
    newUser.email = email;
    newUser.password = await argon2.hash(password);

    const egzist = await userRepository.findOneBy({email: newUser.email})
    console.log("egzist ", egzist);
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
    const { id, name } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const userInfo = await userRepository.findOneBy({name: name})

    if (userInfo) {
       ctx.status = 200;
       ctx.body = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
       }
       return
    }
    ctx.status = 200;
    ctx.body = '用户登录成功，暂未查询到用户信息';
  }



  public static async login(ctx: Context) {
    //@ts-ignore
    const { name, email, password } = ctx.request.body;
    const userRepository = AppDataSource.getRepository(User);
    const egzist = await userRepository.findBy({email: email});

    if (!egzist) {
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

    const token = jwt.sign({ id: egzist[0].id },
      tokenConfig.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 60 * 60, // 24 hours
      });

    ctx.status = 200;
    ctx.body = {
      id: egzist[0].id,
      name: egzist[0].name,
      token,
    };
  }
}
