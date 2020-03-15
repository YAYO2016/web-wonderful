/**
 * Created by yanyue on 2020/3/14 21:45
 */
const getters = {
    roles: state => state.user.userInfo.roles,
    routes:state => state.user.routes,
};
export default getters

