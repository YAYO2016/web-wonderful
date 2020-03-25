/**
 * Created by yanyue on 2020/3/13 22:37
 * 用户路由
 */
const express = require("express");
const router = express.Router();
const util = require("../utils/util");
const _ = require("loadsh");

router.post('/login', (req, res, next) => {
    let body = req.body;
    if (body.username == 'admin' && body.password == '123456') {
        res.status(200).json({
            code: '200',
            message: '登录成功',
            //使用passpor-jwt的时候就一定要使用Bearer 放到token之前返回给页面
            data: {
                name: "admin",
                roles: ["admin"],
                token: "admin"
            }
        })
    }
    if (body.username == 'yanyue' && body.password == '123456') {
        res.status(200).json({
            code: '200',
            message: '登录成功',
            //使用passpor-jwt的时候就一定要使用Bearer 放到token之前返回给页面
            data: {
                name: "yanyue",
                roles: ["editor"],
                token: "yanyue"
            }
        })
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
    res.status(200).json({
        code: 200,
        data: {
            username: 'yanyue',
            roles: ["admin", "editor"]
        }
    })
});


module.exports = router;
