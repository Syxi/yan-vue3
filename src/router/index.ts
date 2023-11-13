import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/reditect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/view/redirect/index.vue"),
      }
    ]
  },

  {
    path: "/login",
    component: () => import("@/view/login/index.vue"),
    meta: { hidden: true }
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/view/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "dashboard",
          icon: "homepage",
          affix: true,
          keepAlive: true,
        }
      },

      {
        path: "401",
        component: () => import("@/view/error-page/401.vue"),
        meta: { hidden: true },
      },

      {
        path: "404",
        component: () => import("@/view/error-page/404.vue"),
        meta: { hidden: true }
      },
    ]
  }
]


// 创建路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});


// 重置路由
export function resetRouter() {
  router.replace({ path: "/login" });
}


export default router;

