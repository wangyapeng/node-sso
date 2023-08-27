
import { Context, Request, Response } from "koa";
import Koa from "koa";
const app = new Koa();
import router from "./server/router/index";
import cookie from "koa-cookie";
import koaBody from "koa-body";
import verifyToken from "./server/middleware/verifyToken";
import catchError from "./server/middleware/catchError";
import logger from "koa-logger";
import cors from "koa2-cors";
import fs from "fs";
import koaConnect from 'koa-connect';
import koaStatic from "koa-static";

const excludeRoute = [
  "/",
  "logout",
  "/*.js",
  "login",
  "Token",
  "register",
  "verityAppToken",
  "authorizeByJsonp",
];
import path from "path";
import views from "koa-views";

import sendFile from "koa-send";

//@ts-ignore
//@ts-nocheck
import { render } from "./www/server/entry-server.js";

const rootDir = process.cwd()
const resolve = (p: any) => path.resolve(rootDir, p);

import { createServer as createViteServer } from "vite";
const __dirname = path.resolve();
const start = async () => {
  app.use(
    cors({
      origin: function (ctx: Context & any) {
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

  //@ts-ignore
  app.use(cookie.default());

  // 创建 vite 服务
  const viteServer = await createViteServer({
    root: process.cwd(),
    logLevel: 'error',
    server: {
      middlewareMode: true,
    },
  });

  // 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）
  app.use(koaConnect(viteServer.middlewares));

   console.log("----->",resolve("dist/www/client/index.html"))
   //同步读取文件
   const template = fs.readFileSync(resolve("dist/www/client/index.html"), "utf-8");
   const manifest = fs.readFileSync(
     resolve("dist/www/client/ssr-manifest.json"),
     "utf-8"
   );
   
  const clientRoot = resolve("dist/www/client");

  app.use(async (ctx: Context) => {
    // 请求的是静态资源 或者/favicon.ico
    if (ctx.path.startsWith("/assets")) {
      await sendFile(ctx as any, ctx.path, { root: clientRoot });
      return;
    }

    const [renderedHtml, state, preloadLinks] = await render(ctx, manifest);

    const html = template
      .replace("<!--preload-links-->", preloadLinks)
      .replace("<!--pinia-state-->", state)
      .replace("<!--app-html-->", renderedHtml);

    ctx.type = "text/html";
    ctx.body = html;
  });

  app.use(koaStatic(__dirname + "static"));
  app.use(koaStatic(__dirname + "src/assets"));

  // app.use(views(path.join(__dirname, "./views"), { extension: "ejs" }));

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(8080, () => {
    console.log("Server is running");
  });
};

start();
