<template>
    <div class='ECharts' ref="echart">
        ECharts
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/17 22:19
     */

    import echarts from 'echarts';

    export default {
        name: "ECharts",
        props: {
            //父组件传递过来的chartData数据
            chartData: {
                type: Object,
                default() {
                    return {
                        xData: [], //x轴数据
                        series: [] //系列数据
                    }
                }
            },
            //是否有坐标轴
            isAxisChart: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            options() {
                let vm = this;
                return vm.isAxisChart ? vm.axisOption : vm.normalOption;

            }
        },
        data() {
            return {
                //echart对象
                echart: null,

                //有坐标轴配置
                axisOption: {
                    //图例设置：展示了不同系列的标记，点击图例会显示和隐藏相关系列的显示
                    legend: {
                        //图例的公用文本样式
                        textStyle: {
                            //颜色设置
                            color: '#333'
                        }
                    },
                    //grid 直角坐标系内绘图网格
                    grid: {
                        //往左偏移20%  默认10%
                        left: '20%'
                    },
                    //提示框组件：实现悬浮显示的效果
                    tooltip: {
                        //trigger 触发类型  axis坐标轴触发
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        //x轴线配置
                        axisLine: {
                            //轴的颜色配置
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        },
                        //x轴的标签设置
                        axisLabel: {
                            //标签颜色
                            color: '#333'
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            //y轴线配置
                            axisLine: {
                                //轴的颜色配置
                                lineStyle: {
                                    color: '#17b3a3'
                                }
                            }
                        }
                    ],
                    //多个数据的颜色设置
                    color: [
                        '#2ec7c9',
                        '#b6a2de',
                        '#5ab1ef',
                        '#ffb980',
                        '#d87a80',
                        '#8d98b3',
                        '#e5cf0d',
                        '#97b552',
                        '#95706d',
                        '#dc69aa',
                        '#07a2a4',
                        '#9a7fd1',
                        '#588dd5',
                        '#f5994e',
                        '#c05050',
                        '#59678c',
                        '#c9ab00',
                        '#7eb00a',
                        '#6f5553',
                        '#c14089'
                    ],
                    series: []
                },

                //没有坐标轴配置
                normalOption: {
                    //提示框组件：实现悬浮显示的效果
                    tooltip: {
                        //触发时机 item 数据项图形触发
                        trigger: 'item'
                    },
                    //多个数据的颜色设置
                    color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
                    series: []
                },

            }
        },
        mounted() {
            window.addEventListener('resize', this.resizeChart)
        },
        destroyed() {
            window.removeEventListener('resize', this.resizeChart)
        },
        methods: {
            //初始化echarts图形
            initChart() {
                let vm = this;
                vm.initChartData();
                if (vm.echart) {
                    vm.echart.setOption(vm.options);
                } else {
                    vm.echart = echarts.init(vm.$refs.echart);
                    vm.echart.setOption(vm.options);
                }
            },
            //初始化图表数据
            initChartData() {
                let vm = this;
                //判断是否有坐标轴，然后赋值给不同的对象类型
                if (vm.isAxisChart) {
                    vm.axisOption.xAxis.data = vm.chartData.xData
                    vm.axisOption.series = vm.chartData.series
                } else {
                    vm.normalOption.series = vm.chartData.series
                }
            },
            resizeChart() {
                let vm = this;
                vm.echart ? vm.echart.resize() : '';
            }
        },
        watch: {
            //数据发生变化的话，就重新更新下echart图
            chartData: {
                handler: function () {
                    this.initChart()
                },
                deep: true
            },
        },
    }
</script>

<style lang='scss' scoped>
    .ECharts {
        height: 100%;
    }
</style>
