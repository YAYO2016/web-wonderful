/**
 * Created by yanyue on 2020/3/28 12:48
 * 响应结果的封装
 */

const {
    CODE_ERROR,
    CODE_SUCCESS
} = require('../utils/constant');

class Result {
    //构造函数
    constructor(data, message = '操作成功', options) {
        this.data = null;
        if (arguments.length === 0) {
            this.message = '操作成功'
        } else if (arguments.length === 1) {
            this.message = data
        } else {
            this.data = data;
            this.message = message;
            if (options) {
                this.options = options
            }
        }
    }

    //创建结果返回
    createResult() {
        if (!this.code) {
            this.code = CODE_SUCCESS
        }
        let base = {
            code: this.code,
            message: this.message
        };
        if (this.data) {
            base.data = this.data
        }
        if (this.options) {
            base = { ...base, ...this.options }
        }
        console.log(base);
        return base
    }

    json(res) {
        res.json(this.createResult())
    }

    //成功的返回
    success(res) {
        this.code = CODE_SUCCESS;
        this.json(res)
    }

    //失败放返回
    fail(res) {
        this.code = CODE_ERROR;
        this.json(res)
    }
}

module.exports = Result;
