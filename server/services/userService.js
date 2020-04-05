/**
 * Created by yanyue on 2020/3/28 14:32
 * user用户相关的服务
 */
const {querySql, queryOne} = require("../db");

//登录用户
function login(username, password) {
    return querySql(`select * from user where username='${username}' and password='${password}'`)
}

//查询用户
function findUser(username) {
    return queryOne(`select * from user where username='${username}'`)
}

//新增用户
function addUser(username, password, roles, email) {
    return querySql(`insert user (username,password,roles,email)values('${username}','${password}','${roles}','${email}');`)
}

//获取所有用户
function getAllUsers(username, pageNum, pageSize) {
    if (username) {
        return querySql(`select * from user where username='${username}' limit ${(pageNum - 1) * pageSize} , ${pageSize}`)
    } else {
        return querySql(`select * from user limit ${(pageNum - 1) * pageSize} ,${pageSize}`)
    }

}

module.exports = {
    login, findUser, addUser, getAllUsers
};
