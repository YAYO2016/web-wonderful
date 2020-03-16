<template>
    <div class='Header'>
        <div class="left-content">
            <el-button type="primary" icon="el-icon-menu"
            @click="$store.dispatch('common/collapseMenu')"
            ></el-button>
            <!--面包屑-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="bread in breadCrumbItems" :key="bread.path"
                                    :to="{path:bread.path}">
                    {{bread.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="right-content">
            <!--用户相关-->
            <el-dropdown trigger="click">
                <span class="el-dropdown-link"><img :src="userImg" class="user"/></span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/15 15:59
     */
    import {mapState} from 'vuex'

    export default {
        name: "Header",
        data() {
            return {
                userImg: require('@/assets/imgs/visitor.jpg'),
                breadCrumbItems: [],
            }
        },
        computed: {
            ...mapState({
                routes: state => state.user.routes
            })
        },
        watch: {
            $route: {
                handler: function (to, from) {
                    let vm = this;
                    vm.initBreadCrumbItems(to);
                },
                immediate: true, //一开始就执行一次
            }
        },
        methods: {
            initBreadCrumbItems(router) {
                let vm = this;
                //根路由title
                let breadCrumbItems = [{path: '/', title: '后台管理系统'}];
                //let breadCrumbItems = [{path: '/', title: '首页'}];
                //遍历父级到当前子路由的页面的title和path存储到当前数组中
                for (let index in router.matched) {
                    if (router.matched[index].meta && router.matched[index].meta.title) {
                        breadCrumbItems.push({
                            path: router.matched[index].path ? router.matched[index].path : '/',
                            title: router.matched[index].meta.title
                        })
                    }
                }
                vm.breadCrumbItems = breadCrumbItems;
            },
            collapseMenu() {
                let vm = this;
                vm.$store.dispatch('common/collapseMenu')
            },
            logOut() {
                let vm = this;
                vm.$store.dispatch('user/clearCurrentState');
                vm.$store.dispatch('common/clearTabs');
                location.reload()
            }
        }
    }
</script>

<style lang='scss' scoped>
    .Header {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: space-between;

        .left-content {
            display: flex;
            align-items: center;

            .el-button {
                margin-right: 20px;
            }
        }

        .right-content {
            .user {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }

    }

    .el-breadcrumb__item {
        .el-breadcrumb__inner {
            color: #666666;
            font-weight: normal;
        }

        &:last-child {
            .el-breadcrumb__inner {
                color: #ffffff;
            }
        }
    }
</style>
