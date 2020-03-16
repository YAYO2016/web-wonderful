<template>
    <el-row class="Home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover" style="height:290px">
                鼠标悬浮时候显示
            </el-card>
            <el-card shadow="hover" style="height:522px;margin-top: 20px">
                鼠标悬浮时候显示
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num-wrapper">
                <el-card shadow="hover" v-for="item in 6" :key="item">
                    <i class="icon"></i>
                    <div class="detail">
                        <p class="num">￥12345</p>
                        <p class="txt">今日支付订单</p>
                    </div>
                </el-card>
            </div>
            <el-card shadow="hover">
                <!--echart图标-->
                <div style="height: 280px"></div>
            </el-card>
            <div class="graph">
                <el-card shadow="hover">
                    <div style="height: 260px"></div>
                </el-card>
                <el-card shadow="hover">
                    <div style="height: 260px"></div>
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

<style lang="scss" scoped>
    .Home {
        .num-wrapper {
            display: flex;
            flex-wrap: wrap; //换行
            justify-content: space-between;

            .el-card {
                /*实现一行3列*/
                width: 32%;
                margin-bottom: 20px;
            }
        }
        .graph{
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .el-card{
                /*保证一行就2列*/
                width: 48%;
            }
        }
    }
</style>
