<template>
    <div class='RadarEcharts'>
        <g-echarts :chartData="option"/>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/28 18:52
     * 雷达图
     */

    export default {
        name: "RadarEcharts",
        data() {
            return {
                option: {
                    //标题
                    title: {
                        //标题文本
                        text: '您的性格类型',
                        //标题样式
                        textStyle: {
                            color: 'black', //标题颜色
                            fontSize: 14,
                            lineHeight: 20,
                        },
                        // 标题的位置
                        left: 'left',  //left center right
                        top: 'top',
                    },

                    //grid 直接坐标系中除坐标轴之外的绘画网格，用于定义直角系整体布局
                    grid: {
                        // 图表的位置
                        position: 'center',
                    },
                    //气泡提示框，展示更加详细的数据
                    //tooltip: {
                    //    //雷达图的tooltip不会超出div，也可以设置position属性，
                    //    // position定位的tooltip 不会随着鼠标移动而位置变化，不友好
                    //    confine: true,
                    //    enterable: true, //鼠标是否可以移动到tooltip区域内
                    //},


                    //定义雷达图
                    radar: {
                        //shape: 'circle',  //圆形边框的雷达图
                        splitNumber: 9, // 雷达图圈数设置
                        //坐标系起始角度，也就是第一个指示器轴的角度
                        //startAngle:45,
                        //雷达图项的名称
                        name: {
                            //字体样式
                            textStyle: {
                                color: 'black',
                            },
                        },
                        // 设置雷达图中间射线(就是中心射向四周的线)的颜色
                        axisLine: {
                            lineStyle: {
                                color: 'rgba(131,141,158,.1)',
                            },
                        },


                        //雷达图的指示器，用来指定雷达图中的多个变量（维度）
                        indicator: [
                            {
                                name: '1.完美型', max: 22,
                                //若将此属性放在radar下，则每条indicator都会显示每个圈上的数值，放在这儿，只在1.完美型这条indicator上显示
                                //axisLabel: {
                                //    show: true,
                                //    fontSize: 12,
                                //    color: '#838D9E',
                                //    showMaxLabel: false, //不显示最大值，即外圈不显示数字30
                                //    showMinLabel: true, //显示最小数字，即中心点显示0
                                //},
                                color:'#ff9077',

                            },
                            {name: '2.助人型', max: 22},
                            {name: '3.成就型', max: 22},
                            {name: '4.艺术型', max: 22},
                            {name: '5.理智型', max: 22},
                            {name: '6.警觉型', max: 22},
                            {name: '7.活跃型', max: 22},
                            {name: '8.领袖型', max: 22,color:'#ccc'},
                            {name: '9.平和型', max: 22},

                        ].reverse(),
                        //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
                        splitArea: {
                            show: false,
                            areaStyle: {
                                color: 'rgba(255,0,0,0)', // 图表背景的颜色
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 1,
                                color: 'rgba(131,141,158,.1)', // 设置网格的颜色
                            },
                        },
                    },


                    series: [{
                        name: '雷达图', // tooltip中的标题
                        type: 'radar', //表示是雷达图
                        symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                        //symbolSize: 8, // 拐点的大小
                        lineStyle:{
                            normal: {
                                color:"#ff9077"
                            }
                        },
                        //areaStyle: {
                        //    normal: {
                        //        width: 1,
                        //        opacity: 0.2,
                        //    },
                        //},
                        data: [
                            {
                                value: [17, 15, 11, 14, 0, 16, 13, 17, 9,8],
                                name: '2018-07',
                                // 设置区域边框和区域的颜色
                                //itemStyle: {
                                //    normal: {
                                //        color: 'rgba(255,225,0,.3)',
                                //        lineStyle: {
                                //            color: 'rgba(255,225,0,.3)',
                                //        },
                                //    },
                                //},
                                //在拐点处显示数值
                                label: {
                                    normal: {
                                        show: true,
                                        formatter: (params) => {
                                            return params.value
                                        },
                                    },
                                },
                            },
                            //{
                            //    value: [5, 20, 19, 11, 22, 17, 8, 19, 16,9],
                            //    name: '',
                            //    itemStyle: {
                            //        normal: {
                            //            color: 'rgba(60,135,213,.3)',
                            //            lineStyle: {
                            //                width: 1,
                            //                color: 'rgba(60,135,213,.3)',
                            //            },
                            //        },
                            //    },
                            //},

                        ],
                    }],


                }
            }
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .RadarEcharts {
        @include content-box;
        height: 100%;

    }
</style>
