<template>
    <el-menu
            class="el-menu-slide"
            :default-active="$router.currentRoute.path"
            router
    >
        <template v-for="item in routes"
                  v-if="!item.hidden && item.children && item.children.length > 0">
            <!--单个元素的-->
            <el-menu-item v-if="item.children.length == 1" :index="item.children[0].path"
                          :key="item.children[0].path">
                <i v-if="item.children[0].meta.icon" :class="`fa fa-${item.children[0].meta.icon}`"></i>
                <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>

            <!--多个子元素的-->
            <el-submenu v-else :index="item.children[0].path" :key="item.children[0].path">
                <!--父目录名称-->
                <template slot="title">
                    <i v-if="item.meta.icon" :class="`fa fa-${item.meta.icon}`"></i>
                    <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
                </template>
                <!--子菜单名称-->
                <el-menu-item v-for="child in item.children" :index='child.path' :key="child.path">
                    <i v-if="child.meta.icon" :class="`fa fa-${child.meta.icon}`"></i>
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
    import {mapState} from 'vuex'
    export default {
        name: "Aside",
        data() {
            return {}
        },
        computed: {
            ...mapState('user', ['routes']),

        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .el-menu {
        height: 100%;
    }
</style>
