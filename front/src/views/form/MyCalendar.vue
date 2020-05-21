<template>
    <div class='MyCalendar'>
        <GFullCalendar></GFullCalendar>
    </div>
</template>

<script>
    /**
     * 自定义日历
     * Created by yanyue on 2020/4/14 22:05
     */
    import GFullCalendar from "@/components/form/GFullCalendar"

    export default {
        components:{GFullCalendar},
        name: "MyCalendar",
        data() {

        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .MyCalendar {
        @include content-box;

    }
</style>
