/**
 * Created by yanyue on 2020/3/28 14:32
 * user用户相关的服务
 */
const {querySql} = require("../db");

function login(username, password) {
    return querySql(`select * from admin_user where username='${username}' and password='${password}'`)
}

module.exports = {
    login
};