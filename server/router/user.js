/**
 * Created by yanyue on 2020/3/13 22:37
 * 用户路由
 */
const express = require("express");
const router = express.Router();
const util = require("../utils/util");
const _ = require("loadsh");
const Result = require("../models/Result.js");
const {PWD_SALT} = require("../utils/constant");
const {login} = require("../services/userService");
const boom = require("boom");
const {body, validationResult} = require('express-validator');


router.post('/login'
    , [
        //这边使用express-validator进行校验，正常的话是给前端进行校验的
        body("username").isString().withMessage("用户名必须为字符").isLength({min:5}).withMessage("用户名不能少于5个字符"),
        body("password").isLength({min:5}).withMessage("密码不能少于5个字符")
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
            login(username, util.EnCryPtoFn.md5(`${password}${PWD_SALT}`)).then(user => {
                if (!user || user.length === 0) {
                    new Result('登录失败').fail(res);
                } else {
                    new Result(
                        user[0],
                        '登录成功',
                    ).success(res);
                }
            });
        }
    });

const userPath = "./assets/json/user.json";
router.get('/getUsers', (req, res, next) => {
    //等待1s，模拟从数据库查询数据的时间间隔
    util.OtherFn.sleep(1000);
    let reqBody = req.query;
    util.FileFn.readJSONFile(userPath).then(result => {
        let total = result.data.list.length;
        let list = result.data.list.slice((reqBody.pageNum - 1) * reqBody.pageSize, reqBody.pageNum * reqBody.pageSize);
        let username = reqBody.username;
        if (username) {
            list = list.map(item => {
                if (item.name === username) {
                    return item;
                }
            });
            //loadsh的compact函数会去掉数组中的无效元素
            list = _.compact(list);
            result.data.list = list;
            result.pageInfo = {};
            result.pageInfo.total = list.length;
            result.pageInfo.pageIndex = reqBody.pageNum;
            result.pageInfo.pageSize = reqBody.pageSize;
            res.json(result);
        } else {
            result.data.list = list;
            result.pageInfo = {};
            result.pageInfo.total = total;
            result.pageInfo.pageIndex = reqBody.pageNum;
            result.pageInfo.pageSize = reqBody.pageSize;
            res.json(result);
        }
    })
});

router.get('/getSingleUser', (req, res, next) => {
    let reqBody = req.query;
    util.FileFn.readJSONFile(userPath).then(result => {
        let list = result.data.list;
        let id = reqBody.id;
        let user = null;
        list.forEach(item => {
            if (item.id == id) {
                user = item;
            }
        })
        //loadsh的compact函数会去掉数组中的无效元素
        result.data = user;
        res.json(result);
    })
});

router.post('/getUserInfo', (req, res, next) => {
    let reqBody = req.body;
    console.log(`token:${reqBody.token}`);
    if (reqBody.token == "admin") {
        res.status(200).json({
            code: 200,
            data: {
                username: 'admin',
                roles: ["admin"]
            }
        })
    } else {
        res.status(200).json({
            code: 200,
            data: {
                username: 'yanyue',
                roles: ["editor"]
            }
        })
    }

});


module.exports = router;
