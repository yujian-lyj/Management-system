// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/view/Login1.vue";
import Home from "@/components/home.vue";
import Wellcome from "@/view/home/main/Main.vue";
import Test2 from "@/view/home/main/baseper.vue";
import Test3 from "@/view/home/main/BaseInfo.vue";
import Test4 from "@/view/home/main/text.vue";
import Test5 from "@/view/home/main/calen.vue";
import Test6 from "@/view/home/main/caletext.vue";
import Test7 from "@/view/home/main/todo.vue";
// 引入加载条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 配置
NProgress.inc();
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 800, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.1 // 初始化时的最小百分比
});

Vue.use(VueRouter);

// 所有人都可以访问
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/login",
    redirect: "/"
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    redirect: "/wellcome",
    meta: { title: "控制台" },
    children: [
      {
        path: "/wellcome",
        name: "wellcome",
        component: Wellcome,
        meta: { title: "控制台" }
      },
      {
        path: "/test2",
        name: "test2",
        component: Test2,
        meta: { title: "员工信息" }
      },
      {
        path: "/test3",
        name: "test3",
        component: Test3,
        meta: { title: "管理信息" }
      },
      {
        path: "/test4",
        name: "test4",
        component: Test4,
        meta: { title: "工资信息" }
      },
      {
        path: "/test5",
        name: "test5",
        component: Test5,
        meta: { title: "日历信息" }
      },
      {
        path: "/test6",
        name: "test6",
        component: Test6,
        meta: { title: "个人信息" }
      },
      {
        path: "/test7",
        name: "test7",
        component: Test7,
        meta: { title: "代办事件" }
      },
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/view/home/404.vue")
  },
  {
    path: "*",
    redirect: {
      name: "404"
    }
  }
];
//解决重复点击报错
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

const router = new VueRouter({
  routes
});

/**
 * 挂载路由守卫
 */
// @ts-ignore
router.beforeEach((to, from, next) => {
  if (to.path === "/") return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if (!tokenStr) return next("/");
  NProgress.start();
  next();
});

// 挂载路由守卫 - 访问结束
router.afterEach(() => {
  // 关闭加载条
  NProgress.done();
});

export default router;
