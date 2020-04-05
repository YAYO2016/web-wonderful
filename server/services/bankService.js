/**
 * Created by yanyue on 2020/4/5 19:02
 */
const {querySql, queryOne} = require("../db");

//获取所有的银行信息带模糊查询的
function getAllBanks(bankName, pageNum, pageSize) {
    return querySql(`select * from s_bank where bank_name like '%${bankName}%' limit ${(pageNum - 1) * pageSize} , ${pageSize}`)
}

//获取银行数据的条数
function getBankCount(bankName) {
    if (bankName) {
        return querySql(`select count(*) from s_bank  where bank_name = '${bankName}'`)
    } else {
        return querySql(`select count(*) from s_bank`)
    }

}

//获取用户查询参数(用来搜索关键字用的),因为数据太多就用1000个数据返回试试
function getBankInfo(bankName) {
    return querySql(`select bank_id,bank_name,owner_county from s_bank  where bank_name like '%${bankName}%' limit 0 , 1000`)
}


module.exports = {
    getAllBanks, getBankCount, getBankInfo
};
