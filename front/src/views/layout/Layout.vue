<template>
    <el-container class="Layout" style="height: 100%">
        <el-aside width="200px">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
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

    export default {
        name: "Layout",
        components: {Header, Aside},
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .Layout {

    }
</style>
