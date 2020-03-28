/**
 * Created by yanyue on 2020/3/28 14:06
 */
const mysql = require("mysql");
const config = require("./config.js");
//是否debug提示
const {debug} = require("../utils/constant.js");

//创建mysql的连接
function connect() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        //multipleStatements：允许每条 mysql 语句有多条查询.使用它时要非常注意，
        // 因为它很容易引起 sql 注入（默认：false）
        multipleStatements: true
    })
}

//执行mysql的查询
function querySql(sql) {
    const conn = connect();
    //debug为true的时候就去打印sql语句
    debug && console.log(sql);
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && console.log('查询失败，原因:' + JSON.stringify(err))
                    reject(err);
                } else {
                    debug && console.log('查询成功', JSON.stringify(results))
                    resolve(results);
                }
            })
        } catch (e) {
            reject(e);
        } finally {
            conn.end();
        }
    })
}

module.exports = {querySql};
