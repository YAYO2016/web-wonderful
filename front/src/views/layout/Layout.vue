<template>
    <el-container class="Layout" style="height: 100%">
        <el-aside width="auto">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <Tabs></Tabs>
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
    import Tabs from './components/tabs/Tabs'

    export default {
        name: "Layout",
        components: {Header, Aside,Tabs},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .Layout {
        .el-header {
            background-color: $white;
        }
    }
</style>
