<template>
    <el-container class="Layout">
        <el-aside width="auto" class="aside-container">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header :style="{height:`${variables.headerHeight}`}">
                <Header/>
            </el-header>
            <Tags></Tags>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/15 15:55
     */
    import Header from './components/header/Header'
    import Aside from './components/aside/Aside'
    import Tags from './components/tags/Tags'
    import variables from '@/common/style/variables.scss'

    export default {
        name: "Layout",
        components: {Header, Aside, Tags},
        data() {
            return {}
        },
        computed: {
            variables() {
                return variables;
            }
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .Layout {
        height: 100%;

        .el-header {
            position: relative;
            background-color: $white;
            box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

        }

        .el-main {
            padding: 32px;
            background-color: #f0f2f5;
            position: relative;
        }
    }
</style>
