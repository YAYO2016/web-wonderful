/**
 * Created by yanyue on 2020/4/7 9:30
 * 用户实体映射
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    //用户名
    username: {
        type: String,
        required: true
    },
    //密码
    password: {
        type: String,
        default: '123456'
    },
    //头像url
    avatar:{
        type:String
    },
    //email
    email: {
        type: String
    },
    //权限角色
    roles: {
        type: String,
        default: 'visitor'   //admin,visitor
    },
    //年龄
    age: {
        type: Number
    },
    //号码
    tel: {
        type: String
    },
    //地址
    address: {
        type: String,
        default:"南京"
    },
    //性别
    sex: {
        type: Number,
        default:2
    },
    //创建日期
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
