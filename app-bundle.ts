import { defaults } from "./node_modules/argon2/argon2.d";

import { Context, Next, ParameterizedContext, Request, Response } from "koa";
import Koa from "koa";
const app = new Koa();
import router from "./server/router";
import cookie from "koa-cookie";
import koaBody from "koa-body";
import verifyToken from "./server/middleware/verifyToken";
import catchError from "./server/middleware/catchError";
import logger from "koa-logger";
import cors from "koa2-cors";
import fs from "fs";
import sendFile from 'koa-send';
import koaStatic from "koa-static";
//@ts-ignore
import {render} from './www/server/entry-server.js';

const excludeRoute = [
  "logout",
  "/*.js",
  "login",
  "v1",
  "Token",
  "register",
  "verityAppToken",
  "authorizeByJsonp",
];

const ssrUrl = ["/", "/login", "/register"];
import path from "path";
import { startDataSource } from "./dataSource";

const __dirname = path.resolve();
const start = async () => {
  await startDataSource()
  app.use(
    cors({
      origin: function (ctx: Koa.BaseContext) {
        //设置允许来自指定域名请求
        return "*"; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
      allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    })
  );

  app.use(catchError());

  app.use(logger());

  app.use(koaBody());

  app.use(verifyToken({
    exclude: excludeRoute
  }))

  //@ts-ignore
  app.use(cookie.default());

const __dirname = path.resolve();
const resolve = (p: any) => path.resolve(__dirname, p);

//同步读取文件
const template = fs.readFileSync(resolve('./dist/www/client/index.html'), 'utf-8');
const manifest = fs.readFileSync(resolve('./dist/www/client/ssr-manifest.json'),'utf-8');
const clientRoot = resolve('./dist/www/client');

  app.use(router.routes()).use(router.allowedMethods());

  app.use(async (ctx: Koa.Context, next: Next) => {
    await next();

    try {
       // 请求的是静态资源 或者/favicon.ico
      if (ctx.path.startsWith('/assets')) {
        //@ts-ignore
        await sendFile(ctx, ctx.path, { root: clientRoot });
        return;
      }

      const [renderedHtml, state, preloadLinks] = await render(ctx, manifest);

      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--pinia-state-->', state)
        .replace('<!--app-html-->', renderedHtml);

      ctx.type = 'text/html';
      ctx.body = html;
    } catch (e) {
      console.error(e.stack);
      ctx.throw(500, e.stack);
    }
  });

  app.use(koaStatic(__dirname + "static"));
  app.use(koaStatic(__dirname + "src/assets"));
  app.listen(9999, () => {
    console.log("Server is running");
  });
};

start();
