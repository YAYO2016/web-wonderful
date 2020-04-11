/**
 * Created by yanyue on 2020/4/9 14:29
 * 会议接口后台
 */

const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");
const boom = require('boom');
const util = require('../utils/util');
const Result = require("../models/Result.js");

//新增会议
router.post("/addMeeting", function (req, res, next) {
    let {title, start, end} = req.body;
    //util.DateFn.localDate这边采用本地时间函数，因为mongoDB数据存储默认格林威治时间，和我们存在时间差
    const newMeeting = new Meeting({title, start: util.DateFn.localDate(start), end: util.DateFn.localDate(end)});
    newMeeting.save().then(meeting => {
        new Result('新增会议成功').success(res);
    }).catch(err => {
        new Result('新增会议失败').fail(res);
    })
});

//获取所有的会议
router.get("/getMeetings", function (req, res, next) {
    Meeting.find().then(meetings => {
        new Result(meetings, '查询成功').success(res);
    }).catch(err => {
        new Result('查询失败').fail(res);
    })
});

//会议的编辑
router.post("/editMeeting", function (req, res, next) {
    let {id, title, start, end} = req.body;
    //查询数据并且更新数据
    Meeting.updateOne({_id: id},
        {
            title,
            start: util.DateFn.localDate(start),
            end: util.DateFn.localDate(end)
        }).then(meetings => {
        console.log(meetings);
        new Result(meetings, '编辑成功').success(res);
    }).catch(err => {
        new Result('编辑失败').fail(res);
    })
});

module.exports = router;
