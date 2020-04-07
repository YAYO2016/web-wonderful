<template>
    <el-row class="Home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userInfo.avatar"/>
                    <div class="user-info">
                        <p class="name">{{userInfo.name}}</p>
                        <!--rolesFilter 使用过滤器-->
                        <p class="access">{{userInfo.roles|rolesFilter}}</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>{{$moment().format('YYYY-MM-DD HH:mm:ss')}}</span></p>
                    <p>上次登录地点：<span>南京</span></p>
                </div>
            </el-card>
            <el-card shadow="hover" style="height:522px;margin-top: 20px">
                <el-table :data="tableData">
                    <el-table-column show-overflow-tooltip v-for="(val, key) in tableLabel" :key="key" :prop="key"
                                     :label="val"></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num-wrapper">
                <el-card shadow="hover" v-for="item in countData" :key="item.name"
                         :body-style="{ display: 'flex', padding: 0 }">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
                    <div class="detail">
                        <p class="num">￥ {{ item.value }}</p>
                        <p class="txt">{{ item.name }}</p>
                    </div>
                </el-card>
            </div>
            <el-card shadow="hover">
                <!--echart图标-->
                <!--<g-echarts style="height: 280px"-->
                           <!--:chartData="echartData.order">-->
                    <!--&gt;-->
                <!--</g-echarts>-->
            </el-card>
            <div class="graph">
                <el-card shadow="hover">
                    <!--<g-echarts style="height: 260px"-->
                               <!--:chartData="echartData.user">-->
                    <!--</g-echarts>-->
                </el-card>
                <el-card shadow="hover">
                    <!--<g-echarts style="height: 260px"-->
                               <!--:chartData="echartData.video"-->
                               <!--:isAxisChart="false">-->
                    <!--</g-echarts>-->
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Home",
        data() {
            return {
                countData: [
                    {
                        name: '今日支付订单',
                        value: 1234,
                        icon: 'success',
                        color: '#2ec7c9'
                    },
                    {
                        name: '今日收藏订单',
                        value: 210,
                        icon: 'star-on',
                        color: '#ffb980'
                    },
                    {
                        name: '今日未支付订单',
                        value: 1234,
                        icon: 's-goods',
                        color: '#5ab1ef'
                    },
                    {
                        name: '本月支付订单',
                        value: 1234,
                        icon: 'success',
                        color: '#2ec7c9'
                    },
                    {
                        name: '本月收藏订单',
                        value: 210,
                        icon: 'star-on',
                        color: '#ffb980'
                    },
                    {
                        name: '本月未支付订单',
                        value: 1234,
                        icon: 's-goods',
                        color: '#5ab1ef'
                    }
                ],
                tableData: [],
                tableLabel: {
                    name: '课程',
                    todayBuy: '今日购买',
                    monthBuy: '本月购买',
                    totalBuy: '总购买'
                },
            }
        },
        computed: {
            ...mapState('user', ['userInfo']),
        },
        mounted() {
            let vm = this;
        },
        methods: {


        }
    }
</script>

<style lang="scss" scoped>
    .Home {
        .user {
            display: flex;
            align-items: center;
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #ccc;

            img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                margin-right: 40px;
            }

            .user-info {
                .name {
                    font-size: 32px;
                    margin-bottom: 10px;
                }

                .access {
                    color: #999999;
                }
            }
        }

        .login-info {
            p {
                line-height: 28px;
                font-size: 14px;
                color: #999999;

                span {
                    color: #666666;
                    margin-left: 60px;
                }
            }
        }

        .num-wrapper {
            display: flex;
            flex-wrap: wrap; //换行
            justify-content: space-between;

            .el-card {
                /*实现一行3列*/
                width: 32%;
                margin-bottom: 20px;
            }

            .icon {
                font-size: 30px;
                width: 80px;
                height: 80px;
                text-align: center;
                line-height: 80px;
                color: #fff;
            }

            .detail {
                margin-left: 15px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .num {
                    font-size: 30px;
                    margin-bottom: 10px;
                }

                .txt {
                    font-size: 14px;
                    text-align: center;
                    color: #999999;
                }
            }
        }

        .graph {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;

            .el-card {
                /*保证一行就2列*/
                width: 48%;
            }
        }
    }
</style>
