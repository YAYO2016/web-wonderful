/**
 * Created by yanyue on 2020/4/5 19:05
 * 银行接口
 */
const express = require("express");
const router = express.Router();
const Result = require("../../models/Result");
const boom = require('boom');
const {getAllBanks, getBankCount, getBankInfo} = require("../../services/bak/bankService");

router.post("/getBanks", async function (req, res, next) {
    let body = req.body;
    let {bankName, pageNum, pageSize} = body;
    let count = 0;
    await getBankCount(bankName).then(result => {
        console.log("count", result);
        count = result[0]['count(*)'];
        console.log(count);
    });
    await getAllBanks(bankName, pageNum, pageSize).then(banks => {
        if (banks) {
            let result = {
                list: banks,
                pageInfo: {
                    pageNum: pageNum,
                    pageSize: pageSize,
                    total: count
                }
            };
            new Result(result, '查询成功').success(res);
        } else {
            new Result('查询失败').fail(res);
        }
    })
});

router.get("/getBankInfo", async function (req, res, next) {
    let query = req.query;
    let bankName = query.bankName || "";
    getBankInfo(bankName).then(banks => {
        if (banks) {
            let bankResults = banks.map(bank=>{
               return {
                   bankId:bank.bank_id,
                   bankName:bank.bank_name,
                   ownerCounty:bank.owner_county,
               }
            });
            new Result(bankResults, '查询成功').success(res);
        } else {
            new Result('查询失败').fail(res);
        }
    })

});

module.exports = router;
