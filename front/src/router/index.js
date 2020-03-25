import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRoutes, asyncRoutes} from './routes';
import store from '../store'
import {filterAsyncRoutes, getToken} from '../common/js/permission';
import util from '../common/js/util'

// 解决控制台 在使用ElementUi时点击同一个路由，页面报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
});

const router = createRouter();


export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
