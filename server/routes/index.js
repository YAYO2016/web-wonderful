/**
 * Created by yanyue on 2020/3/13 22:33
 * 总的路由文件
 */
const express = require("express");

const boom = require("boom");


const {CODE_ERROR} = require("../utils/constant");

//注册路由
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('express后台管理系统')
});


/**
 * 导入各个路由模块
 */
const userRouter = require("./userRouter");
router.use('/user',userRouter);

//const fileRouter = require("./fileRouter");
//router.use('/file',fileRouter);

//const home = require("./home");
//router.use('/home',home);

//const bookRouter = require("./bookRouter");
//router.use('/book',bookRouter);

const bankRouter = require("./BankRouter");
router.use('/bank',bankRouter);


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
