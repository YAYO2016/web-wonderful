<template>
    <div class='FormCalendar'>
        <full-calendar
                ref="calendar"
                :events="events"
                :config="config"
        >
        </full-calendar>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/6 20:11
     * 高级日历组件
     */
    import {FullCalendar} from 'vue-full-calendar'
    import 'fullcalendar/dist/fullcalendar.css'


    export default {
        name: "FormCalendar",
        components: {FullCalendar},
        data() {
            return {
                //事件返回的值  title时间内容   start事件开始时间  end事件结束时间
                events: [
                    {title: '赵子龙', start: '2020-04-06T12:30', end: '2020-04-06T13:30',},
                    {title: '严跃', start: '2020-04-06T12:30', end: '2020-04-06T13:30',},
                    {title: '刘备', start: '2020-04-06T10:20', end: '2020-04-06T11:00', color: 'red'},  //color 文字颜色
                    {title: '关羽', start: '2020-04-06T14:20', end: '2020-04-06T15:20', backgroundColor: 'green',},  //backgroundColor背景色
                    {title: '张飞', start: '2020-04-06T16:00', end: '2020-04-06T17:00', color: 'orange', editable: false},  //editable禁止修改
                    {title: '曹操', start: '2020-04-06T18:40', end: '2020-04-06T19:20',}
                ],
                config: {
                    firstDay: 1,  //以每一为每周的第一天
                    locale: 'zh-cn',  //语言
                    defaultView: 'agendaWeek',  //默认按周显示
                    //weekends:true,  //是否在日历中显示周末
                    height: 'auto', //高度
                    fixedWeekCount: false,  //是否固定显示六周
                    //weekMode:"liquid", //周数不定，每周的高度可变，整个日历的高度不变
                    header: { //表头信息
                        left: 'prev,today,next',
                        center: 'title',
                        right: 'custom',
                    },
                    /* agenda 模式 */
                    allDaySlot: false,
                    //allDay:false,
                    slotLabelFormat: 'H:mm', // axisFormat 'H(:mm)'
                    slotLabelInterval: 1,
                    slotDuration: '00:30:00',
                    minTime: '8:00',
                    maxTime: '20:00',
                    editable: true,
                    /* 设置按钮文字 */
                    buttonText: {
                        today: '今天',
                    },
                    eventClick: this.eventClick, //点击事件
                    dayClick: this.dayClick, //点击日程表上面某一天
                },
            }
        },
        methods: {
            // 点击事件
            eventClick(event, jsEvent, pos) {
                console.log('eventClick', event, jsEvent, pos);
                console.log(event._id);
                console.log(event.title);
                console.log(event.start);
                console.log(event.end);
            },
            // 点击当天
            dayClick(day, jsEvent) {
                console.log('dayClick', day, jsEvent)
            }
        }
    }
</script>

<style lang='scss' scoped>
    .FormCalendar {
        @include content-box;
    }
</style>
