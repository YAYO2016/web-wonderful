/**
 * Created by yanyue on 2020/3/13 22:37
 * 用户路由
 */
const Mock = require('mockjs');

const express = require("express");
const router = express.Router();

router.get('/getData', (req, res, next) => {
    let List = []
    for (let i = 0; i < 7; i++) {
        List.push(
            Mock.mock({
                vue: Mock.Random.float(100, 8000, 0, 2),
                wechat: Mock.Random.float(100, 8000, 0, 2),
                ES6: Mock.Random.float(100, 8000, 0, 2),
                Redis: Mock.Random.float(100, 8000, 0, 2),
                React: Mock.Random.float(100, 8000, 0, 2),
                springboot: Mock.Random.float(100, 8000, 0, 2)
            })
        )
    }
    res.status(200).json({
        code: '200',
        message: '操作成功',
        //使用passpor-jwt的时候就一定要使用Bearer 放到token之前返回给页面
        data:{
            // 饼图
            videoData: [
                {
                    name: 'springboot',
                    value: Mock.Random.float(1000, 10000, 0, 2)
                },
                {
                    name: 'vue',
                    value: Mock.Random.float(1000, 10000, 0, 2)
                },
                {
                    name: '小程序',
                    value: Mock.Random.float(1000, 10000, 0, 2)
                },
                {
                    name: 'ES6',
                    value: Mock.Random.float(1000, 10000, 0, 2)
                },
                {
                    name: 'Redis',
                    value: Mock.Random.float(1000, 10000, 0, 2)
                },
                {
                    name: 'React',
                    value: Mock.Random.float(1000, 10000, 0, 2)
                }
            ],
            // 柱状图
            userData: [
                {
                    date: '周一',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                },
                {
                    date: '周二',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                },
                {
                    date: '周三',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                },
                {
                    date: '周四',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                },
                {
                    date: '周五',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                },
                {
                    date: '周六',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                },
                {
                    date: '周日',
                    new: Mock.Random.integer(1, 100),
                    active: Mock.Random.integer(100, 1000)
                }
            ],
            // 折线图
            orderData: {
                date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                data: List
            },
            tableData: [
                {
                    name: 'ES6',
                    todayBuy: Mock.Random.float(100, 1000, 0, 2),
                    monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                    totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                },
                {
                    name: '小程序',
                    todayBuy: Mock.Random.float(100, 1000, 0, 2),
                    monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                    totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                },
                {
                    name: 'Vue',
                    todayBuy: Mock.Random.float(100, 1000, 0, 2),
                    monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                    totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                },
                {
                    name: 'springboot',
                    todayBuy: Mock.Random.float(100, 1000, 0, 2),
                    monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                    totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                },
                {
                    name: 'React',
                    todayBuy: Mock.Random.float(100, 1000, 0, 2),
                    monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                    totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                },
                {
                    name: 'Redis',
                    todayBuy: Mock.Random.float(100, 1000, 0, 2),
                    monthBuy: Mock.Random.float(3000, 5000, 0, 2),
                    totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
                }
            ]
        }
    })

});

module.exports = router;
