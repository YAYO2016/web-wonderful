<template>
    <el-date-picker
            class='GDateRange'
            v-model="dateRange"
            :type="type"
            :value-format="valueFormat"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
    </el-date-picker>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/14 19:15
     * 主要为了解决日期选择范围的值是一个数组的问题
     * 通过该组件，可以分别设置startDate和endDate
     */

    export default {
        name: "GDateRange",
        props: {
            type: {
                type: String,
                default: "daterange"
            },
            startDate: {
                type: String,
                default: ""
            },
            endDate: {
                type: String,
                default: ""
            },
            valueFormat: {
                type: String,
                default: "yyyy-MM-dd HH:mm:ss"
            }
        },
        data() {
            return {
                dateRange: []
            }
        },
        mounted() {
            this.dateRange = [this.startDate, this.endDate]
        },
        watch: {
            dateRange(newVal) {
                if (newVal) {
                    this.$emit("update:startDate", newVal[0]);
                    this.$emit("update:endDate", newVal[1]);
                } else {
                    this.$emit("update:startDate", "");
                    this.$emit("update:endDate", "");
                }
            }
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .GDateRange {

    }
</style>
