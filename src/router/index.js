import Vue from "vue";
import Router from "vue-router";
import "nprogress/nprogress.css";
import store from "../store/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "../utils/auth"; // get token from cookie
import getPageTitle from "../utils/get-page-title";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
    meta: { title: "Авторизация" },
    hidden: true
  },
  {
    path: "/404",
    component: () => import("../views/error-page/404"),
    name: "Page404",
    hidden: true,
    meta: { title: "not found", noCache: true }
  }
];

export const asyncRoutes = [
  {
    path: "/game",
    name: "mainPage",
    component: () => import("../views/Game"),
    meta: {
      title: "Игра",
      roles: ["user"]
    },
    children: [
      {
        path: "sessions",
        name: "sessions",
        meta: {
          title: "Сесии игр",
          roles: ["user"]
        }
      }
    ]
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin"),
    meta: {
      title: "Администрироание",
      roles: ["admin_full"]
    }
  },

  { path: "*", redirect: "/404", hidden: true, meta: { title: "not found" } }
];

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login" || to.path === "/") {
      // if is logged in, redirect to the home page
      NProgress.done();
      next({ path: "/game", replace: false });
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles =
        store.getters["auth/userWithRoles"].roles &&
        store.getters["auth/userWithRoles"].roles.length > 0;
      if (hasRoles) {
        next();
        NProgress.done();
      } else {
        try {
          // get user info
          await store.dispatch("auth/getInfo");
          // get list permissions
          await store.dispatch("auth/getPermissions");
          const { roles } = store.getters["auth/userWithRoles"];

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );

          // dynamical add accessible routes
          router.addRoutes(accessRoutes);

          next({ ...to, replace: true });
          NProgress.done();
        } catch (error) {
          next("/login");
        }
      }
    }
  } else {
    /* has no token */
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

export default router;
