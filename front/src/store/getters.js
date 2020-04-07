/**
 * Created by yanyue on 2020/3/14 21:45
 */
const getters = {
    roles: state => state.user.roles,
    routes:state => state.permission.routes,
    token:state => state.user.token,
    userInfo:state => state.user.userInfo,
};
export default getters

