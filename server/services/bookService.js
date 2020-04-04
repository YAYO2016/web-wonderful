/**
 * Created by yanyue on 2020/3/28 14:32
 * user用户相关的服务
 */
const Book = require("../models/Book");

//插入新的书
function insertBook(book) {
    return new Promise((resolve, reject) => {
        try {
            if (book instanceof Book) {

            } else {
                reject(new Error("添加的图书对象不合法"))
            }
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    insertBook
};
