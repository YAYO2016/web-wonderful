<template>
    <el-row class="Home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                鼠标悬浮时候显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时候显示
            </el-card>
        </el-col>
        <el-col :span="16">
            <el-card shadow="hover" v-for="item in 6" :key="item">
                鼠标悬浮时候显示
            </el-card>
            <el-card shadow="hover">
                鼠标悬浮时候显示
            </el-card>
            <div class="graph">
                <el-card shadow="hover">
                    鼠标悬浮时候显示
                </el-card>
                <el-card shadow="hover">
                    鼠标悬浮时候显示
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>

</style>
