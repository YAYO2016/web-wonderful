/**
 * Created by yanyue on 2020/4/7 22:09
 */

/**
 * Created by yanyue on 2020/4/5 19:05
 * 银行接口
 */
const express = require("express");
const router = express.Router();
const Bank = require("../models/Bank");
const boom = require('boom');
const Result = require("../models/Result.js");

router.post("/getBanks", async function (req, res, next) {
    let body = req.body;
    let {bankName, pageNum, pageSize} = body;
    let banks = await Bank.find(bankName ? {bankName} : {}).sort("bankId").skip((pageNum - 1) * pageSize).limit(pageSize);
    let countTotal = await Bank.find(bankName ? {bankName} : {}).count();

    if (banks) {
        let result = {
            list: banks,
            pageInfo: {
                pageNum: pageNum,
                pageSize: pageSize,
                total: countTotal
            }
        };
        new Result(result, '查询成功').success(res);
    } else {
        new Result('查询失败').fail(res);
    }
});

router.post("/getBankInfo", async function (req, res, next) {
    let body = req.body;
    let {bankName, pageNum, pageSize} = body;
    console.log(bankName);
    let banks = await Bank.find(bankName ? {bankName: {$regex: `${bankName}`}} : {}).sort("bankId").skip((pageNum - 1) * pageSize).limit(pageSize);

    if (banks) {
        new Result(banks, '查询成功').success(res);
    } else {
        new Result('查询失败').fail(res);
    }

});

module.exports = router;
