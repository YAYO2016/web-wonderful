/**
 * Created by yanyue on 2020/3/13 22:37
 * 用户路由
 */
const express = require("express");
const router = express.Router();

router.get('/getData', (req, res, next) => {
    res.status(200).json({
        code: '200',
        message: '操作成功',
        //使用passpor-jwt的时候就一定要使用Bearer 放到token之前返回给页面
        data: {
           list:[
               {name:'ES6',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
               {name:'小程序',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
               {name:'vue',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
               {name:'springboot',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
               {name:'react',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
               {name:'redis',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
               {name:'php',todayBuy:100,monthBuy:4400.23,totalBuy:780009},
           ]
        }
    })

});

module.exports = router;
