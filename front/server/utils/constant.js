/**
 * Created by yanyue on 2020/3/13 22:38
 * 常用全局常量
 */
module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 200,
    debug: true,
    //login登录密码加密盐
    PWD_SALT: "qian_nian_yan_server",
    //生成token的主键密钥
    PRIVATE_KEY: 'qian_nian_yan_server_token',
    //token的失效时间（1小时）
    JWT_EXPIRED: 60 * 60, //单位s token失效时间
    //upload文件上传目录
    UPLOAD_PATH: "D:/local-server/upload"
};


