import { route } from 'quasar/wrappers';
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { LocalStorage } from 'quasar';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.fullPath} to ${to.fullPath}`);
    const userLoggedIn = LocalStorage.has('user');

    if (to.meta.auth && !userLoggedIn) {
      if (to.path !== '/login') {
        console.log('Redirecting to /login');
        return next('/login');
      } else {
        return next();
      }
    }

    if (!to.meta.auth && userLoggedIn) {
      if (to.path !== '/app') {
        console.log('Redirecting to /app');
        return next('/app');
      } else {
        return next();
      }
    }

    return next();
  });

  return Router;
});
