<template>
    <div class='EditForm'>
        <el-form ref="userForm" :model="Form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="Form.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="Form.age" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="Form.sex">
                    <el-radio :label="2">保密</el-radio>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker
                        v-model="Form.birthday"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="Form.address" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="">确认</el-button>
                <el-button @click="formVisible=false">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/19 18:27
     */

    export default {
        name: "EditForm",
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .EditForm {

    }
</style>
