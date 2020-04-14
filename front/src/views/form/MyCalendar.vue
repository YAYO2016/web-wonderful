<template>
    <div class='MyCalendar'>
        <table>
            <thead>
            <tr>
                <th width="70px"></th>
                <th v-for="(item,index) in weekdays" :key="index">{{item}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(timeStep,index) in timeSteps" :key="index">
                <td>{{timeStep}}</td>
                <td v-for="(item,index) in weekdays" :key="index"
                    :data-date="`${item} ${timeStep}`"
                ></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    /**
     * 自定义日历
     * Created by yanyue on 2020/4/14 22:05
     */
    import moment from "moment";

    export default {
        name: "MyCalendar",
        data() {
            return {
                nowDate:new Date(),
                weekdays: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                minTime: '9:00',  //表格开始时间
                maxTime: '18:00',  //表格结束时间
                slotDuration: '00:30:00', //时间间隔
            }
        },
        mounted() {
        },
        computed: {
            timeSteps() {
                let vm = this;
                let times = [];
                let startHours = Number(this.minTime.split(":")[0]);
                let startMinutes = Number(this.minTime.split(":")[1]);

                let endHours = Number(this.maxTime.split(":")[0]);
                let endMinutes = Number(this.maxTime.split(":")[1]);
                for (let i = startHours; i < endHours; i++) {
                    times.push(`${i}:00`);
                    times.push(`${i}:30`)
                }
                return times;
            }
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .MyCalendar {
        @include content-box;

        table {
            width: 100%;
            border-collapse: collapse;

            thead {
                tr {
                    height: 30px;
                    font-size: 14px;

                    th {
                        border: 1px solid #ddd;
                        text-align: center;
                        vertical-align: middle;
                    }
                }
            }

            tbody {
                tr {
                    height: 25px;
                }

                td {
                    text-align: center;
                    vertical-align: middle;
                    border: 1px solid #ddd;
                }
            }
        }
    }
</style>
