/**
 * Created by yanyue on 2020/3/15 16:48
 */
/**
 * Created by yanyue on 2019-11-16 11:21
 */
import router, {resetRouter} from '../../router'
import {setToken, getToken, removeToken} from "../../common/js/auth";
import api from "@/api"

const user = {
    namespaced: true,
    state: {
        token: getToken(),
        userInfo: {},
        roles: [],

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
        //    //commit('SET_ACCESSEDROUTES', accessedRoutes);
        //    //commit('SER_ROUTES', new Set(constantRoutes.concat(state.accessedRoutes)));
        //    //router.addRoutes(state.accessedRoutes);
        //},
        getUserInfo: ({commit, state}, userInfo) => {
            return new Promise((resolve, reject) => {
                api.getUserInfo({token: state.token}).then(res => {
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
