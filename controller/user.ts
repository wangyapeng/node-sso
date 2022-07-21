import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';

import { User } from '../entity/user';

export default class UserController {
  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);


    const egzist = await userRepository.findOneBy({email: newUser.email})
    console.log("egzist ", egzist);
    if (egzist) {
      ctx.status = 409;
      ctx.body = 'email already exists';
      return;
    }
    // 保存到数据库
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }

  public static async login(ctx: Context) {
    ctx.status = 401;
    ctx.body = 'not login';
  }
}
