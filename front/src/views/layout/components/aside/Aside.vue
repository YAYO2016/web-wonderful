<template>
    <el-menu
            class="el-menu-vertical-demo el-menu-slide"
            :default-active="$route.path"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :active-text-color="variables.menuActiveText"
            :collapse="isCollapse"
            router
    >
        <h3 class="title" v-show="!isCollapse">严跃后台管理系统</h3>
        <h3 class="title" v-show="isCollapse">严跃</h3>
        <template v-for="item in routes"
                  v-if="!item.hidden && item.children && item.children.length > 0">
            <!--单个元素的-->
            <el-menu-item v-if="item.children.length === 1" :index="item.children[0].path"
                          :key="item.children[0].path"
                          @click="clickMenu(item.children[0])">
                <i v-if="item.children[0].meta.icon" :class="`${item.children[0].meta.icon}`"></i>
                <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>

            <!--多个子元素的-->
            <el-submenu v-else :index="item.children[0].path" :key="item.children[0].path">
                <!--父目录名称-->
                <template slot="title">
                    <i v-if="item.meta.icon" :class="`${item.meta.icon}`"></i>
                    <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
                </template>
                <!--子菜单名称-->
                <el-menu-item v-for="child in item.children" :index='child.path' :key="child.path"
                              @click="clickMenu(child)">
                    <i v-if="child.meta.icon" :class="`${child.meta.icon}`"></i>
                    <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                </el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/15 15:59
     */
    import variables from '@/common/style/variables.scss'
    import {mapState} from 'vuex'

    export default {
        name: "Aside",
        data() {
            return {}
        },
        computed: {
            ...mapState('permission', ['routes']),
            isCollapse() {
                return this.$store.state.common.isCollapse
            },
            variables() {
                return variables;
            }
        },
        methods: {
            clickMenu(item) {
                let vm = this;
                vm.$store.dispatch('common/selectMenu', item)
            }
        }
    }
</script>

<style lang='scss' scoped>
    .el-menu {
        height: 100%;

        .title {
            color: $white;
            text-align: center;
            line-height: $headerHeight;
        }
    }

    .el-menu-slide {
        border-right: none;

        i {
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 18px;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
