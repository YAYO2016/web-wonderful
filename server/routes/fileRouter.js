/**
 * Created by yanyue on 2020/4/1 21:17
 * 专门的文件上传后台接口
 */
const express = require("express");
const router = express.Router();
const {UPLOAD_PATH} = require("../utils/constant");
const Result = require("../models/Result");
const boom = require('boom');

//multer文件上传工具
const multer = require("multer");

router.post("/upload", multer({dest: UPLOAD_PATH}).single("file"), function (req, res, next) {
        if (!req.file || req.file.length === 0) {
            new Result("上传失败").fail(res);
        } else {
            new Result(req.file,"上传成功").success(res);
        }
    }
);


module.exports = router;
