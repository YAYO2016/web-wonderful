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
                    legend: {
                        textStyle: {
                            color: '#333'
                        }
                    },
                    grid: {
                        left: '20%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        },
                        axisLabel: {
                            color: '#333'
                        }
                    },
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#17b3a3'
                                }
                            }
                        }
                    ],
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
                    tooltip: {
                        trigger: 'item'
                    },
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
                handler: function() {
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
