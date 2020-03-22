/**
 * Created by yanyue on 2020/3/13 22:37
 * 用户路由
 */
const express = require("express");
const router = express.Router();
const util = require("../utils/util");

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
   util.FileFn.readJSONFile(userPath).then(result=>{
       res.json(result);
   })
});


module.exports = router;
