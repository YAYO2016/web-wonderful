<template>
    <div class='LineEcharts'>
        <g-echarts :chartData="option"/>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/28 18:52
     */

    export default {
        name: "LineEcharts",
        data() {
            return {
                option:{
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                }
            }
        },
        methods: {

        }
    }
</script>

<style lang='scss' scoped>
    .LineEcharts {
        @include content-box;
        height: 100%;

    }
</style>
