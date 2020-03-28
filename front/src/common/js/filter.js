/**
 * Created by yanyue on 2020/3/28 13:36
 * 全局过滤器
 */


const rolesFilter = function(val) {
    if (!val) return '';
    if (val.indexOf("admin") !== -1) {
        return "超级管理员";
    } else {
        return "游客"
    }
};

export {
    rolesFilter,
}
