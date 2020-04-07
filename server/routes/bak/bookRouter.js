/**
 * Created by yanyue on 2020/4/1 21:17
 * Book的后台接口模块
 */
const express = require("express");
const router = express.Router();
const {UPLOAD_PATH} = require("../../utils/constant");
const Result = require("../../models/Result");
const Book = require("../../models/bak/Book");
const boom = require('boom');
const util = require("../../utils/util");
const bookService = require("../../services/bak/bookService");

//multer文件上传工具
const multer = require("multer");

//上传电子书接口   dest文件上传的目标位置 single上传单个文件
router.post("/upload", multer({dest: `${UPLOAD_PATH}\\book`}).single("file"), function (req, res, next) {
        if (!req.file || req.file.length === 0) {
            new Result("上传电子书失败").fail(res);
        } else {
            const book = new Book(req.file);
            book.parse()
                .then(book => {
                    console.log('book', book);
                    new Result(book, '上传电子书成功').success(res)
                })
                .catch(err => {
                    next(boom.badImplementation(err))
                })
        }
    }
);

router.post("/create", function (req, res, next) {
    //解析请求中的token获取用户的基本信息
    //数据库中上传图书同时需要绑定当前上传用户的基本信息
    let decode = util.EnCryPtoFn.decode(req);
    //将请求中的book信息放入到book对象中
    let book = new Book(null, req.body);
    if (decode && decode.username) {
        book.username = decode.username;
    }
    console.log(book);
    bookService.insertBook(book).then(result => {

    }).catch(err => {
        next(boom.badImplementation(err));
    })


});


module.exports = router;
