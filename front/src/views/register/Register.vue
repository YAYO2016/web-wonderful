<template>
    <div class='Register'>
        <!--section定义了文档中的摸个区域-->
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">严跃后台管理系统</span>
                <el-form :model="registerForm" ref="registerForm" :rules="registerRules" label-width="80px"
                         class="registerForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerForm.password2" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="选择身份" prop="roles">
                        <el-select v-model="registerForm.roles" placeholder="请选择身份">
                            <el-option label="管理员" value="admin"></el-option>
                            <el-option label="员工" value="visitor"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-09-18 9:34
     */

    export default {
        name: "Register",
        data() {
            //两次输入的密码一致校验
            var validatePassWord = (rule, value, callback) => {
                if (value !== this.registerForm.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback()
                }
            };

            return {
                registerForm: {
                    username: "",
                    email: "",
                    password: "",
                    password2: "",
                    roles: ""

                },
                registerRules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}, //blur失去焦点的时候触发
                        {min: 2, max: 30, message: '长度在2-30个字符之间', trigger: 'blur'}
                    ],
                    email: [
                        {type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在2-30个字符之间', trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '确认密码不能为空', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在2-30个字符之间', trigger: 'blur'},
                        {validator: validatePassWord, trigger: 'blur'}
                    ],
                    //下拉选择框，使用change事件比较好
                    identity: [
                        {required: true, message: '身份不能为空', trigger: 'change'},
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                let vm = this;
                //表单验证函数
                vm.$refs[formName].validate(valid => {
                    if (valid) {
                        vm.$api.register(vm.registerForm).then(res => {
                            vm.$message({
                                message: res.message,
                                type: 'success'
                            });
                            //注册成功，跳转到登录页面
                            vm.$router.push('/login');
                        });
                    }
                })

            }
        }
    }
</script>

<style lang='scss' scoped>
    .Register {
        position: relative;
        width: 100%;
        height: 100%;
        /*背景图片 不重复 居中*/
        background: url(../../assets/imgs/bg.jpg) no-repeat center center;
        background-size: 100% 100%;

        .form_container {
            /*top: 10%;*/
            /*left: 34%;*/
            padding: 25px;
            border-radius: 5px;
            text-align: center;
            //实现水平垂直居中
            position: absolute;
            min-width: 370px;
            min-height: 210px;
            left: 50%; /* 定位父级的50% */
            top: 40%;
            transform: translate(-50%, -50%); /*自己的50% */

            .manage_tip .title {
                font-family: "Microsoft YaHei";
                font-weight: bold;
                font-size: 26px;
                color: #fff;
            }

            .registerForm {
                margin-top: 20px;
                background-color: #fff;
                padding: 20px 40px 20px 20px;
                border-radius: 5px;
                box-shadow: 0px 5px 10px #cccc;

                .submit_btn {
                    width: 100%;
                }
            }
        }
    }


</style>
