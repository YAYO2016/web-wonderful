/**
 * Created by yanyue on 2020/3/13 22:38
 * 常用全局常量
 */
const {env} = require("./env");
//文件上传的目录地址，后台使用
const UPLOAD_PATH = env === 'dev' ? 'D:\\local-server\\upload' : '/root/upload';
//文件上传的url，前台使用
const UPLOAD_URL = env === 'dev' ? 'http://localhost:8089/book' : 'http://yanyue.guyubao.com/book';

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
    UPLOAD_PATH,
    UPLOAD_URL,
    MIME_TYPE_EPUB: "application/epub",  //默认的文件上传类型


};


