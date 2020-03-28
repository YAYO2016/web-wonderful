<template>
    <div class='Login' :style="{background:`url(${backgroundImg}) no-repeat center center`}">
        <div class="form_container">
            <div class="manage_tip">
                <span class="title">严跃后台管理系统</span>
                <el-form :model="loginForm" ref="loginForm" :rules="loginRules" label-width="80px"
                         class="loginForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input ref="username" v-model.trim="loginForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password" style=" position: relative;margin-bottom: 28px;">
                        <!--键盘enter输入，需要焦点在当前输入框上才有用-->
                        <el-input :type="passwordType" v-model.trim="loginForm.password" placeholder="请输入密码"
                                  ref="password"
                                  @keydown.enter.native="handleLogin('loginForm')"
                                  @keyup.native="loginKeyDown"
                        >
                            <!--是否显式显示密码-->
                            <i :class="`iconfont ${passwordType==='password'?'icon-eye-close':'icon-eye-open'}`"
                               slot="suffix"
                               @click="handleShowPwd"></i>
                        </el-input>
                        <div style="height:15px;position: absolute;right: 0;">
                            <el-tag v-show="bigChar">大写锁定已打开</el-tag>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="handleLogin('loginForm')"
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
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                redirect: undefined,
                otherQuery: {},
                //按钮loading
                loading: false,
                passwordType: 'password',
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
                },
                firstTochar: false,
                bigChar: false,
            }
        },
        mounted() {
            // 如果啥都没写的话，会默认聚焦
            let vm = this;
            if (vm.loginForm.username === '') {
                vm.$refs.username.focus();
            } else if (vm.loginForm.password === '') {
                vm.$refs.password.focus();
            }


        },
        watch: {
            $route: {
                handler: function (route) {
                    const query = route.query;  //获取路由参数 ?后面的
                    if (query) {
                        //提取出路由参数中的redirect 和剩余的其他参数otherQuery
                        this.redirect = query.redirect;
                        this.otherQuery = this.getOtherQuery(query)
                    }
                },
                immediate: true  //会在create的时候就进行调用
            }
        },
        methods: {
            //...mapActions('user', ['setUserInfo']),
            getOtherQuery(query) {
                return Object.keys(query).reduce((acc, cur) => {
                    if (cur !== 'redirect') {
                        acc[cur] = query[cur]
                    }
                    return acc
                }, {})
            },
            handleShowPwd() {
                let vm = this;
                if (vm.passwordType === 'password') {
                    vm.passwordType = ''
                } else {
                    vm.passwordType = 'password'
                }
                vm.$nextTick(() => {
                    vm.$refs.password.focus()
                })
            },
            handleLogin(formName) {
                let vm = this;
                //表单验证函数
                if (vm.validateRules(formName, vm)) {
                    vm.loading = true;
                    vm.$store.dispatch('user/login', vm.loginForm)
                        .then((res) => {
                            //登录成功，跳转到路由query中redirect参数的路由地址，并且带上剩余的其他路由参数otherQuery
                            vm.$router.push({path: vm.redirect || '/', query: vm.otherQuery});
                            vm.$message.success(res.message);
                            vm.loading = false
                        })
                        .catch(() => {
                            vm.loading = false
                        })
                }
            },
            loginKeyDown(event) {
                let vm = this;
                //是否输入过字母键，且判断是否按键为caps lock
                if (vm.firstTochar) {
                    if (event.keyCode === 20) {
                        vm.bigChar = !vm.bigChar;
                        return;
                    }
                }
                //未输入过字母键，或按键不是caps lock，判断每次最后输入的字符的大小写
                let e = event || window.event;
                let keyvalue = e.keyCode ? e.keyCode : e.which;
                let shifKey = e.shiftKey ? e.shiftKey : ((keyvalue == 16) ? true : false);
                if (typeof (vm.loginForm.password) === 'undefined') {
                    return;
                }
                let strlen = vm.loginForm.password.length;
                let password = vm.loginForm.password;

                if (strlen) {
                    let uniCode = password.charCodeAt(strlen - 1);
                    if (keyvalue >= 65 && keyvalue <= 90) {
                        //如果是字母键
                        vm.firstTochar = true;
                        if (((uniCode >= 65 && uniCode <= 90) && !shifKey) || ((uniCode >= 97 && uniCode <= 122) && shifKey)) {
                            vm.bigChar = true;
                        } else {
                            vm.bigChar = false;
                        }
                    }
                }
            },
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
