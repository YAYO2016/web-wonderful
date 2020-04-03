/**
 * Created by yanyue on 2020/3/13 22:33
 * 总的路由文件
 */
const express = require("express");

const boom = require("boom");

const userRouter = require("./userRouter");
const home = require("./home");
const fileRouter = require("./fileRouter");

const {CODE_ERROR} = require("../utils/constant");

//注册路由
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('express后台管理系统')
});

//导入user路由模块
router.use('/users',userRouter);
router.use('/file',fileRouter);
router.use('/home',home);
/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常的处理流程的后面
 * 否则，会拦截正常请求
 */
router.use((req,res,next)=>{
    next(boom.notFound("接口不存在"))
});

/**
 * 自定义路由异常处理中间件
 * 注意2点：
 * 方法的参数不能少
 * 方法必须放在路由最后
 */
router.use((err,req,res,next)=>{
    //自定义异常信息 （接口不存在）
    const msg = (err && err.message) || "系统错误";
    //异常信息code 404
    const statusCode = (err.output && err.output.statusCode) || 500;
    //系统给的默认异常提示（Not Found）
    const errorMsg = (err.output && err.output.payload && err.output.payload.error) || err.message;
    res.status(statusCode).json({
        code:CODE_ERROR,
        msg,
        error:statusCode,
        errorMsg
    })
});

module.exports = router;
