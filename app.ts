
import { Context, Next, Request, Response } from "koa";
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
  "logout",
  "/*.js",
  "login",
  "Token",
  "v1/",
  "@vite/client",
  "register",
  "verityAppToken",
  "authorizeByJsonp",
];

const ssrUrl = [
  "/",
  "/login",
  "/register"
]
import path from "path";
// import views from "koa-views";

import { createServer as createViteServer } from "vite";
import { startDataSource } from "./dataSource";
const __dirname = path.resolve();
const start = async () => {
  await startDataSource()

  app.use(
    cors({
      //@ts-ignore
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

  app.use(koaBody({
    onError: (err) => {
      console.log('----> koa body error', err);
    }
  }));

  app.use(verifyToken({
    exclude: excludeRoute
  }))

  app.use(router.routes()).use(router.allowedMethods());

  //@ts-ignore
  app.use(cookie.default());
  // 创建 vite 服务
  const viteServer = await createViteServer({
    root: process.cwd(),
    logLevel: 'error',
    appType: 'custom',
    server: {
      middlewareMode: true,
    },
  });

  // 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）

  app.use(koaConnect(viteServer.middlewares));
  app.use(async (ctx: Koa.BaseContext,next: Next) => {
    await next()
    try {
      // 1. 获取index.html
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

      // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
      template = await viteServer.transformIndexHtml(ctx.path, template);

      // 3. 加载服务器入口, vite.ssrLoadModule 将自动转换
      const { render } = await viteServer.ssrLoadModule('/src/entry-server.ts');

      //  4. 渲染应用的 HTML
      const [renderedHtml, state] = await render(ctx, {});

      const html = template.replace('<!--app-html-->', renderedHtml).replace('<!--pinia-state-->', state);

      ctx.type = 'text/html';
      ctx.body = html;
    } catch (e) {
      viteServer && viteServer.ssrFixStacktrace(e);
      console.error(e.stack);
      ctx.throw(500, e.stack);
    }
  });

  app.use(koaStatic(__dirname + "static",{maxage: 10 *1000} ));
  app.use(koaStatic(__dirname + "src/assets",{maxage: 24*10 *1000}));
  app.listen(9999, () => {
    console.log("Server is running");
  });
};

start();
