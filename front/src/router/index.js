import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRoutes, asyncRoutes} from './routes';
import store from '../store'
import {filterAsyncRoutes, getToken} from '../common/js/permission';

// 解决控制台 在使用ElementUi时点击同一个路由，页面报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter);

const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// 路由守卫,进行拦截，可以拦截用户设置的权限是路由requireAuth:true的（但是可能token失效了，但是本地还是保存着，所以需要axios拦截配合）
router.beforeEach((to, from, next) => {
    //判断localStorage中是否有token来判断是否登录
    const hasToken = getToken();
    if (to.path === "/login" || to.path === "/register") {
        //如果是登录或者注册路由的时候，就无须判断，直接跳转
        next();
    } else {
        if (hasToken) {
            next()
        } else {
            // 用户没有登录
            next('/login')
        }
    }
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router
