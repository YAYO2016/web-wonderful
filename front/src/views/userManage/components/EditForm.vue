<template>
    <div class='EditForm'>
        <el-form ref="editForm" :model="tempFormData" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="tempFormData.username" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
                <el-input v-model="tempFormData.age" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="tempFormData.sex">
                    <el-radio :label="2">保密</el-radio>
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
                <el-date-picker
                        v-model="tempFormData.birthday"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="tempFormData.address" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleEditSubmit('editForm')">确认</el-button>
                <el-button @click="tempShow=false">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/19 18:27
     */
    import mixins from "@/common/js/mixins";
    //mixins.dialogFormMixin 提供参数就2个
    //tempFormData  父组件传递给表单的值tempFormData
    //tempShow 用来给表单内部关闭外部dialog的变量

    export default {
        name: "EditForm",
        mixins: [mixins.dialogFormMixin],
        data() {
            return {}
        },
        created() {
            //dialog使用了v-if，所以dialog中的表单控件中的任何子组件都是重新生成的，每次打开都会执行created和mounted等方法
            console.log("editForm created");
        },
        methods: {
            handleEditSubmit(formName) {
                let vm = this;
                if (vm.validateRules(formName, vm)) {
                    vm.tempShow = false;
                    console.log("编辑用户成功");
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .EditForm {

    }
</style>
