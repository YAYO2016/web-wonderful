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
                    return {}
                }
            }
        },
        computed: {
            //左侧菜单的打开和关闭
            isCollapse() {
                return this.$store.state.common.isCollapse;
            }
        },
        data() {
            return {
                //echart对象
                echart: null,
            }
        },
        mounted() {
            this.initChart();
            //监听window窗口大小发生变化的resize事件，如果发生就重新调整图表的大小
            window.addEventListener('resize', this.resizeChart)
            // 1.浏览器窗口发生变化
        },
        destroyed() {
            window.removeEventListener('resize', this.resizeChart)
        },
        methods: {
            //初始化echarts图形
            initChart() {
                let vm = this;
                if (vm.echart) {
                    vm.echart.setOption(vm.chartData);
                } else {
                    vm.echart = echarts.init(vm.$refs.echart);
                    vm.echart.setOption(vm.chartData);
                }
            },
            resizeChart() {
                let vm = this;
                //resize 改变图表尺寸，在容器大小发生变化的时候需要手动调用；
                vm.echart ? vm.echart.resize() : '';
            }
        },
        watch: {
            //数据发生变化的话，就重新更新下echart图
            chartData: {
                handler: function () {
                    this.initChart()
                },
                deep: true,
            },
            // 2.折叠菜单的时候 图表尺寸需要重新调整
            isCollapse() {
                setTimeout(() => {
                    this.resizeChart()
                }, 300)
            }
        },
    }
</script>

<style lang='scss' scoped>
    .ECharts {
        height: 100%;
        width: 100%;
    }
</style>
