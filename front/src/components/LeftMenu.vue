<template>
    <!--el-scrollbar滚动组件-->
    <el-scrollbar class="LeftMenu el-scrollbar">
        <el-col>
            <el-menu
                    class="el-menu-slide"
                    :default-active="$router.currentRoute.path"
                    router
            >
                <template v-for="item in accessedRouters"
                          v-if="item.show && item.children && item.children.length > 0">
                    <!--单个元素的-->
                    <el-menu-item v-if="item.children.length == 1" :index="item.children[0].path" :key="item.name">
                        <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                        <span slot="title">{{item.children[0].meta.title}}</span>
                    </el-menu-item>

                    <!--多个子元素的-->
                    <el-submenu v-else :index="item.children[0].path" :key="item.name">
                        <!--父目录名称-->
                        <template slot="title">
                            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
                        </template>
                        <!--子菜单名称-->
                        <el-menu-item v-for="child in item.children" :index='child.path' :key="child.name">
                            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
                            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
                        </el-menu-item>
                    </el-submenu>

                </template>
            </el-menu>
        </el-col>
    </el-scrollbar>
</template>

<script>
    /**
     * Created by yanyue on 2019-09-21 22:48
     */
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "LeftMenu",
        data() {
            return {}
        },
        computed: {
            ...mapState('user', ['accessedRouters']),
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .LeftMenu {
        &.el-scrollbar {
            height: 100%;
            border-right: 1px solid #e6e6e6;
            background: #fff;

            .el-menu-slide {
                border-right: none;

                i {
                    margin-right: 5px;
                    width: 24px;
                    text-align: center;
                    font-size: 18px;
                }
            }
        }
    }


</style>
