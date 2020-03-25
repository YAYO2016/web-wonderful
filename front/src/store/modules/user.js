/**
 * Created by yanyue on 2020/3/15 16:48
 */
/**
 * Created by yanyue on 2019-11-16 11:21
 */
import {constantRoutes, asyncRoutes} from "../../router/routes";
import router, {resetRouter} from '@/router'
import {setToken, getToken, removeToken, filterAsyncRoutes} from "../../common/js/permission";
import api from "@/api"

const user = {
    namespaced: true,
    state: {
        token: '',
        userInfo: {},
        roles: [],
        addRoutes: [],
        routes: [],
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_USERINFO(state, payload) {
            state.userInfo = payload;
        },
        SET_ROLES(state, payload) {
            state.roles = payload;
        },
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes;
            state.routes = constantRoutes.concat(routes);
        }
    },
    actions: {
        login({commit}, userInfo) {
            const {username, password} = userInfo
            return new Promise((resolve, reject) => {
                api.login({username: username.trim(), password: password}).then(response => {
                    const {data} = response;
                    commit('SET_TOKEN', data.token);
                    setToken(data.token);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //setUserInfo: ({commit, state}, userInfo) => {
        //    setToken(userInfo.token);
        //    commit('SET_TOKEN', userInfo.token);
        //    commit('SET_USERINFO', userInfo);
        //    commit('SET_ROLES', userInfo.roles);
        //    //localStorage.setItem("userInfo", JSON.stringify(userInfo));
        //    //这里对路由进行权限过滤
        //    //let accessedRoutes = filterAsyncRoutes(asyncRoutes, userInfo.roles);
        //    //commit('SET_ACCESSEDROUTES', accessedRoutes);
        //    //commit('SER_ROUTES', new Set(constantRoutes.concat(state.accessedRoutes)));
        //    //router.addRoutes(state.accessedRoutes);
        //},
        getUserInfo: ({commit, state}, userInfo) => {
            return new Promise((resolve, reject) => {
                api.getUserInfo(state.token).then(res => {
                    let userInfo = res.data;
                    if (!userInfo) {
                        reject('校验失败，请重新登录')
                    }
                    commit('SET_USERINFO', userInfo);
                    commit('SET_ROLES', userInfo.roles);
                    resolve(userInfo)
                }).catch(error => {
                    reject(error)
                })
            });

        },
        generateRoutes({commit}, roles) {
            return new Promise(resolve => {
                let accessedRoutes;
                if (roles.includes('admin')) {
                    accessedRoutes = asyncRoutes || []
                } else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                commit('SET_ROUTES', accessedRoutes);
                resolve(accessedRoutes)
            })
        },
        clearCurrentState: ({commit}) => {
            removeToken();
            commit('SET_TOKEN', "");
            commit('SET_USERINFO', {});
            commit('SET_ROLES', []);
            //localStorage.removeItem("userInfo");
            //commit('SET_ACCESSEDROUTES', []);
            //commit('SER_ROUTES', []);
            resetRouter();
        },
    },
    getters: {}
};

export default user;
