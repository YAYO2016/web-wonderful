/**
 * Created by yanyue on 2020/3/15 16:48
 */
/**
 * Created by yanyue on 2019-11-16 11:21
 */
import {constantRoutes, asyncRoutes} from "../../router/routes";
import router from '@/router'
import {setToken, removeToken, filterAsyncRoutes} from "../../common/js/permission";

const user = {
    namespaced: true,
    state: {
        token: '',
        userInfo: {},
        accessedRoutes: [],
        routes: [],
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_USERINFO(state, payload) {
            state.userInfo = payload;
        },
        SET_ACCESSEDROUTES(state, payload) {
            state.accessedRoutes = payload;
        },
        SER_ROUTES(state, payload) {
            state.routes = payload;
        }
    },
    actions: {
        setUserInfo: ({commit, state}, userInfo) => {
            setToken(userInfo.token);
            commit('SET_TOKEN', userInfo.token);
            commit('SET_USERINFO', userInfo);
            //这里对路由进行权限过滤
            let accessedRoutes = filterAsyncRoutes(asyncRoutes, userInfo.roles);
            commit('SET_ACCESSEDROUTES', accessedRoutes);
            //将过滤后的异步路由添加到总的路由中
            router.addRoutes(accessedRoutes);
            commit('SER_ROUTES', new Set(constantRoutes.concat(state.accessedRoutes)));
        },
        clearCurrentState: ({commit}) => {
            removeToken();
            commit('SET_TOKEN', "");
            commit('SET_ACCESSEDROUTES', []);
            commit('SER_ROUTES', []);
            commit('SET_USER', {});
        },
    },
    getters: {}
};

export default user;
