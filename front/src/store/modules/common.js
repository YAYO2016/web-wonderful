/**
 * Created by yanyue on 2020/3/15 21:38
 */
const common = {
    namespaced: true,
    state: {
        isCollapse: false,
        tabsList:[
            {
                path: '/home',
                name: 'Home',
                meta: {title: '首页', icon: 'el-icon-s-home'}
            }
        ],
    },
    mutations: {

    },
    actions: {
        collapseMenu: ({commit, state}) => {
            state.isCollapse = !state.isCollapse
        },
        closeTab:({commit, state}, payload) => {
            let result = state.tabsList.findIndex(item => item.name === payload.name);
            state.tabsList.splice(result, 1)
        },
        selectMenu:({commit, state}, payload) => {
            console.log(payload);
            //tabList中不存在的话就新增下
            let result = state.tabsList.findIndex(item => item.name === payload.name);
            result === -1 ? state.tabsList.push(payload) : null;
        }
    },
    getters: {}
};

export default common;
