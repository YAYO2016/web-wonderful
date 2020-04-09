/**
 * Created by yanyue on 2020/4/9 14:09
 * 会议模型
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MeetingSchema = new Schema({
    //会议名称
    title: {
        type: String,
        required: true
    },
    //开始时间
    start:{
        type: Date,
        required: true
    },
    //结束时间
    end:{
        type: Date,
        required: true
    },

});

module.exports = Meeting = mongoose.model('meeting', MeetingSchema);
