/**
 * Created by yanyue on 2020/3/13 21:54
 */
const express = require('express');
//创建express应用
const app = express();
//cors 解决跨域访问
const cors = require('cors');
//引入body-parser，用来传递post请求的数据
const bodyParser = require('body-parser');


//使用cors中间件
app.use(cors());
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//导入路由
const router = require("./router/index");
app.use("/", router);

//启动项目服务
const server = app.listen(7005,'localhost', function () {
    const {address, port} = server.address();
    console.log(`Http server is running on http://${address}:${port}"`);
});
