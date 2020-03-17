<template>
    <div class='Login' :style="{background:`url(${backgroundImg}) no-repeat center center`}">
        <div class="form_container">
            <div class="manage_tip">
                <span class="title">严跃后台管理系统</span>
                <el-form :model="loginForm" ref="loginForm" :rules="loginRules" label-width="80px"
                         class="loginForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <!--键盘enter输入，需要焦点在当前输入框上才有用-->
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"
                                  @keydown.enter.native="submitForm('loginForm')"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')"
                                   :loading="loading"
                        >登录
                        </el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号?现在
                            <router-link to="/register">注册</router-link>
                        </p>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/14 17:03
     */
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "login",
        data() {
            return {
                redirect: undefined,
                otherQuery: {},
                loading: false,
                backgroundImg: require('@/assets/imgs/bg.jpg'),
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, message: '用户名不正确', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 2, max: 30, message: '长度在2-30个字符之间', trigger: 'blur'}
                    ],
                }
            }
        },
        watch: {
            $route: {
                handler: function(route) {
                    const query = route.query
                    if (query) {
                        this.redirect = query.redirect
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true
            }
        },
        methods: {
            ...mapActions('user', ['setUserInfo']),
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            },
            submitForm(formName) {
                let vm = this;
                //表单验证函数
                if (vm.validateRules(formName, vm)) {
                    vm.loading = true;
                    vm.$api.login(vm.loginForm).then(res => {
                        vm.setUserInfo(res.data);
                        vm.$message({
                            message: res.message,
                            type: 'success'
                        });
                        //注册成功，跳转到登录页面
                        vm.$router.push({ path: this.redirect || '/', query: vm.otherQuery });
                        vm.loading = false;
                    }).catch(() => {
                        vm.loading = false;
                    });
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .Login {
        position: relative;
        width: 100%;
        height: 100%;
        /*背景图片 不重复 居中*/
        /*background: url(@/assets/imgs/bg.jpg) no-repeat center center;*/
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

            .loginForm {
                margin-top: 20px;
                background-color: #fff;
                padding: 20px 40px 20px 20px;
                border-radius: 5px;
                box-shadow: 0px 5px 10px #cccc;

                .tiparea {
                    text-align: right;
                    font-size: 12px;
                    color: #333;

                    a {
                        color: #409eff;
                    }
                }

                .submit_btn {
                    width: 100%;
                }
            }
        }
    }
</style>
