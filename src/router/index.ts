import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
  Router,
} from "vue-router";

export const createRouter = (type: "client" | "server"): Router =>
  createVueRouter({
    history: type === "client" ? createWebHistory() : createMemoryHistory(),

    routes: [
      {
        path: "/",
        name: "index",
        meta: {
          title: "首页",
          keepAlive: true,
          requireAuth: true,
        },
        component: () => import("../pages/index.vue"),
      },
      {
        path: "/login",
        name: "login",
        meta: {
          title: "登录",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("../pages/login.vue"),
      },
      {
        path: "/register",
        name: "register",
        meta: {
          title: "注册",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("../pages/register.vue"),
      },
    ],
  });
