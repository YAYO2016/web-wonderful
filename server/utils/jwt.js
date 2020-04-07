/**
 * Created by yanyue on 2020/3/28 16:50
 * JWT 认证
 */

const expressJwt = require('express-jwt');
const { PRIVATE_KEY } = require('../utils/constant');

const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    credentialsRequired: true // 设置为false就不进行校验了，游客也可以访问
}).unless({
    path: [
        '/',
        '/user/register',
        '/user/login'
    ], // 设置 jwt 认证白名单
});

module.exports = jwtAuth;
