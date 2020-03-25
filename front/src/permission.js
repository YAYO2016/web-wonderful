import {getToken} from "./common/js/permission";
import store from "./store";
import util from "./common/js/util";
import router from "./router";
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({showSpinner: false}); //不显示右侧的转圈圈
/**
 * Created by yanyue on 2020/3/25 21:07
 * permission中定义了全局的路由守卫
 */

//白名单
const whiteList = ["/login", "/register"];

// 路由守卫,进行拦截，可以拦截用户设置的权限是路由requireAuth:true的（但是可能token失效了，但是本地还是保存着，所以需要axios拦截配合）
router.beforeEach(async (to, from, next) => {
    NProgress.start();
    //判断localStorage中是否有token来判断是否登录
    const hasToken = getToken();
    if (hasToken) {
        //如果token存在
        if (to.path === '/login') {
            //跳转到login页面的话，直接跳转到/主页去，然后重新执行了一次beforeEach
            next({path: '/'});
            NProgress.done()
        } else {
            //根据store中的roles是否存在，来判断页面是否刷新了
            const hasRoles = store.state.user.roles && store.state.user.roles.length > 0;
            if (hasRoles) {
                next();
                //NProgress.done()
            } else {
                try {
                    //如果roles不存在的时候，就去调用接口获取用户的roles
                    const {roles} = await store.dispatch("user/getUserInfo");
                    //根据用户的roles去过滤出可以访问的路由
                    const accessRoutes = await store.dispatch('user/generateRoutes', roles);
                    //将获取到路由参数添加到路由中
                    router.addRoutes(accessRoutes);
                    store.dispatch("common/getTabs");
                    next({...to, replace: true})
                } catch (e) {
                    store.dispatch("user/clearCurrentState");
                    store.dispatch("common/clearTabs");
                    // 用户没有登录
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }


    } else {
        //没有token,然后判断是否在白名单中
        if (whiteList.indexOf(to.path) !== -1) {
            //在白名单可以访问
            next();
        } else {
            //不在白名单中就跳转到login,并且清除用户信息
            store.dispatch("user/clearCurrentState");
            store.dispatch("common/clearTabs");
            // 用户没有登录
            next(`/login?redirect=${to.path}`);
            NProgress.done()
        }
    }
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
    NProgress.done()
});
