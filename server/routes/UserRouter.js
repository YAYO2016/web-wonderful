/**
 * Created by yanyue on 2020/3/13 22:37
 * 用户路由
 */
const express = require("express");
const router = express.Router();
const util = require("../utils/util");
const _ = require("loadsh");
const Result = require("../models/Result.js");
const {PWD_SALT, PRIVATE_KEY, JWT_EXPIRED} = require("../utils/constant");
const boom = require("boom");
const {body, validationResult} = require('express-validator');
//使用jwt生成token
const jwt = require("jsonwebtoken");

const User = require("../models/User");

//user/login 登录接口
router.post('/login'
    , [
        //这边使用express-validator进行校验，正常的话是给前端进行校验的
        body("username").isString().withMessage("用户名必须为字符").isLength({min: 5}).withMessage("用户名不能少于5个字符"),
        body("password").isLength({min: 5}).withMessage("密码不能少于5个字符")
    ]
    , (req, res, next) => {
        //express-validator对请求进行校验
        const err = validationResult(req);
        if (!err.isEmpty()) {
            const [{msg}] = err.errors;
            next(boom.badRequest(msg));
        } else {
            let {username, password} = req.body;
            //调用userService中的login登录服务(密码进行md5加盐加密)
            User.findOne({username: username, password: util.EnCryPtoFn.md5(`${password}${PWD_SALT}`)}).then(user => {
                if (!user) {
                    new Result('登录失败').fail(res);
                } else {
                    //生成token
                    let token = jwt.sign(
                        {username: user.username},
                        PRIVATE_KEY,
                        //expiresIn过期时间
                        {expiresIn: JWT_EXPIRED}
                    );
                    //登录成功就传给前端一个token，
                    // 然后前端凭借这个token再去调用接口获取用户的具体数据
                    new Result({token}, '登录成功').success(res);
                }
            });
        }
    });


//注册用户
router.post('/register'
    , [
        //这边使用express-validator进行校验，正常的话是给前端进行校验的
        body("username").isString().withMessage("用户名必须为字符").isLength({min: 5}).withMessage("用户名不能少于5个字符"),
        body("password").isLength({min: 5}).withMessage("密码不能少于5个字符"),
        body("roles").isLength({min: 1}).withMessage("角色不能为空"),
        body("email").isEmail().withMessage("email非空"),
    ]
    , (req, res, next) => {
        //express-validator对请求进行校验
        const err = validationResult(req);
        if (!err.isEmpty()) {
            const [{msg}] = err.errors;
            next(boom.badRequest(msg));
        } else {
            let {username, password, roles, email} = req.body;
            //调用userService中的login登录服务(密码进行md5加盐加密)
            const newUser = new User({
                username,
                password: util.EnCryPtoFn.md5(`${password}${PWD_SALT}`),
                email,
                roles,
            });

            newUser
                .save()
                .then(user => {
                    new Result('注册成功').success(res);
                })
                .catch(err => {
                    new Result('注册失败').fail(res);
                    console.log(err)
                });

            //User.findOne(username, util.EnCryPtoFn.md5(`${password}${PWD_SALT}`), roles, email).then(user => {
            //    if (!user || user.length === 0) {
            //        new Result('注册失败').fail(res);
            //    } else {
            //        new Result('注册成功').success(res);
            //    }
            //});
        }
    });

//user/getUserInfo   获取用户信息接口
router.post('/getUserInfo', (req, res, next) => {
    // 解析请求中token获取token加密的数据 username
    let decode = util.EnCryPtoFn.decode(req);
    if (decode && decode.username) {
        User.findOne({username: decode.username}).then(user => {
            if (user) {
                new Result(user, '用户查询成功').success(res);
            } else {
                new Result('用户查询失败').fail(res);
            }
        })
    } else {
        new Result('用户信息查询失败').fail(res);
    }
});

router.post('/getUsers', async (req, res, next) => {
    let body = req.body;
    let {username, pageNum, pageSize} = body;
    let allUser = await User.find();
    User.find(username ? {username} : {}).limit(pageSize).skip((pageNum - 1) * pageSize).then(users => {
        if (users) {
            let result = {
                list: users,
                pageInfo: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    total: allUser.length
                }
            };
            new Result(result, '用户查询成功').success(res);
        } else {
            new Result('用户查询失败').fail(res);
        }
    })
});


//读取本地json文件，然后生成数据并且返回的
//const userPath = "./assets/json/user.json";
//router.get('/getUsers', (req, res, next) => {
//    //等待1s，模拟从数据库查询数据的时间间隔
//    util.OtherFn.sleep(1000);
//    let reqBody = req.query;
//    util.FileFn.readJSONFile(userPath).then(result => {
//        let total = result.data.list.length;
//        let list = result.data.list.slice((reqBody.pageNum - 1) * reqBody.pageSize, reqBody.pageNum * reqBody.pageSize);
//        let username = reqBody.username;
//        if (username) {
//            list = list.map(item => {
//                if (item.name === username) {
//                    return item;
//                }
//            });
//            //loadsh的compact函数会去掉数组中的无效元素
//            list = _.compact(list);
//            result.data.list = list;
//            result.pageInfo = {};
//            result.pageInfo.total = list.length;
//            result.pageInfo.pageIndex = reqBody.pageNum;
//            result.pageInfo.pageSize = reqBody.pageSize;
//            res.json(result);
//        } else {
//            result.data.list = list;
//            result.pageInfo = {};
//            result.pageInfo.total = total;
//            result.pageInfo.pageIndex = reqBody.pageNum;
//            result.pageInfo.pageSize = reqBody.pageSize;
//            res.json(result);
//        }
//    })
//});

//router.get('/getSingleUser', (req, res, next) => {
//    let reqBody = req.query;
//    util.FileFn.readJSONFile(userPath).then(result => {
//        let list = result.data.list;
//        let id = reqBody.id;
//        let user = null;
//        list.forEach(item => {
//            if (item.id == id) {
//                user = item;
//            }
//        })
//        //loadsh的compact函数会去掉数组中的无效元素
//        result.data = user;
//        res.json(result);
//    })
//});

//router.post('/getUserInfo', (req, res, next) => {
//    let reqBody = req.body;
//    console.log(`token:${reqBody.token}`);
//    if (reqBody.token == "admin") {
//        res.status(200).json({
//            code: 200,
//            data: {
//                username: 'admin',
//                roles: ["admin"]
//            }
//        })
//    } else {
//        res.status(200).json({
//            code: 200,
//            data: {
//                username: 'yanyue',
//                roles: ["editor"]
//            }
//        })
//    }
//
//});


module.exports = router;
