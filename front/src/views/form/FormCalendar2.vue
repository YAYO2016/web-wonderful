<template>
    <div class='FormCalendar'>
        <el-form ref="searchForm" :model="searchForm" label-width="80px" inline>
            <el-form-item label="选择日期">
                <el-date-picker
                        style="width: 165px"
                        v-model="searchForm.date"
                        @change="handleChangeSearchDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-arrow-left"
                               @click="$refs.calendar.fireMethod('prev')">上一{{computedViewWords}}
                    </el-button>
                    <el-button type="primary" @click="$refs.calendar.fireMethod('today')">
                        本{{computedViewWords}}
                    </el-button>
                    <el-button type="primary" @click="$refs.calendar.fireMethod('next')">下一{{computedViewWords}}
                        <i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="primary" @click="meetingDialogVisible=true">新增会议</el-button>-->
            <!--</el-form-item>-->
            <el-form-item class="fr">
                <el-select v-model="searchForm.view"
                           style="width: 100px"
                           @change="$refs.calendar.fireMethod('changeView', searchForm.view)"
                           placeholder="查看类型">
                    <el-option label="月" value="month"></el-option>
                    <el-option label="周" value="agendaWeek"></el-option>
                    <el-option label="日" value="agendaDay"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <g-split-l></g-split-l>
        <!--日历组件-->
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
    import $ from "jquery";


    export default {
        name: "FormCalendar",
        components: {FullCalendar},
        data() {
            return {
                searchForm: {
                    date: "",
                    view: "agendaWeek",  //默认显示周视图
                },
                //事件返回的值  title时间内容   start事件开始时间  end事件结束时间
                events: [
                    //{
                    //    id:"123",
                    //    start: this.$moment("2020-4-9 9:00:00"),
                    //    end: this.$moment("2020-4-9 18:00:00"),
                    //    color: "#ccc",
                    //    borderColor: "#ff7900",
                    //    editable: false,
                    //},
                    {
                        title: "严跃开会",
                        start: this.$moment("2020-4-9 9:00:00"),
                        end: this.$moment("2020-4-9 12:00:00"),
                        color: "#ff7900",
                    },

                ],
                config: {
                    defaultDate: new Date(),
                    firstDay: 1,  //以每一为每周的第一天
                    locale: 'zh-cn',  //语言
                    defaultView: 'agendaWeek',  //默认按周显示
                    //weekends:true,  //是否在日历中显示周末
                    height: 'auto', //高度
                    fixedWeekCount: false,  //是否固定显示六周
                    //weekMode:"liquid", //周数不定，每周的高度可变，整个日历的高度不变
                    header: false,
                    //header: { //表头信息
                    //    left: 'prev,today,next',
                    //    center: 'title',
                    //    right: 'custom',
                    //},
                    /* agenda 模式 */
                    allDaySlot: false,
                    //allDay:false,
                    //设置日历y轴上显示的时间文本格式。
                    slotLabelFormat: 'H:mm', // axisFormat 'H(:mm)'
                    slotEventOverlap: false,  //设置日程视图中的事件是否可以重叠
                    //schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                    slotLabelInterval: 1,
                    slotDuration: '00:30:00', //时间间隔
                    minTime: '9:00',  //表格开始时间
                    maxTime: '18:00',  //表格结束时间
                    selectable: true,  //不允许用户点击拉取表格区域（生成事件交给上面的新建按钮弹框去做）
                    editable: false,  //不允许用户操作已经存在的时间
                    /* 设置按钮文字 */
                    buttonText: {
                        today: '今天',
                    },
                    //设置用户可选的时间段（selectable:true的时候才生效）
                    selectConstraint: "businessHours",
                    //强调日历中的某些时间段，比如默认情况下，工作日的时间周一-周五上午9点-下午5点。
                    businessHours: [
                        {
                            dow: [1, 2, 3, 4, 5], // 周一 - 周四
                            start: '9:00', // 上午10点开始
                            end: '12:00', // 下午18点结束
                        },
                        {
                            dow: [1, 2, 3, 4, 5],
                            start: '13:30',
                            end: '18:00'
                        }
                    ],
                    //themeSystem: 'bootstrap3',  //指定日历使用哪种风格皮肤
                    selectOverlap: false,  //确定是否允许用户选择事件占用的时间段
                    eventClick: this.eventClick, //点击事件
                    dayClick: this.dayClick, //点击日程表上面某一天
                    selectAllow: this.selectAllow  //使用回调函数精确控制可选区域
                },

                allowDates: [],

            }
        },
        computed: {
            computedViewWords() {
                let vm = this;
                switch (vm.searchForm.view) {
                    case "month":
                        return "月";
                    case "agendaWeek":
                        return "周";
                    case "agendaDay":
                        return "日";
                }
            }
        },
        mounted() {
            let vm = this;
            // 接口返回的运行选择的时间
            //$(".fc-sat").css('backgroundColor','red');//这个是周六的TD
            //$(".fc-sun").css('backgroundColor','red');//这个是周日的TD
            //$(".fc-mon").css('backgroundColor','red');
            //$(".fc-tue").css('backgroundColor','red');
            //$(".fc-wed").css('backgroundColor','red');
            //$(".fc-thu").css('backgroundColor','red');
            //$(".fc-fri").css('backgroundColor','red');

            //然后回显的话，每个日期TD都会有一个唯一值data-date
            $("td[data-date='"+this.gDateFormat("2020-4-8 9:00:00")+"']").css('backgroundColor','red');

            console.log(this.gDateFormat("2020-4-8 9:00:00"));
            //$(".fc-mon .fc-widget-content .fc-day7 ").css('backgroundColor','red');

            console.log(this.gTimeFormat("2020-4-8 9:00:00"));
            console.log("td[data-date='"+this.gTimeFormat("2020-4-8 9:00:00")+"']");
            vm.allowDates = [
                {
                    start: "2020-4-8 9:00:00",
                    end: "2020-4-8 12:00:00",
                },
                {
                    start: "2020-4-10 9:00:00",
                    end: "2020-4-10 12:00:00",
                }
            ]



        },
        methods: {
            // 点击事件
            eventClick(event, jsEvent, pos) {
                //console.log('eventClick', event, jsEvent, pos);
                //console.log(event._id);
                let vm = this;
                vm.searchForm.activeNames = "editMeeting";
                vm.editMeetingForm.id = event._id;
                vm.editMeetingForm.title = event.title;
                vm.editMeetingForm.start = vm.gTimeFormat(event.start);
                vm.editMeetingForm.end = vm.gTimeFormat(event.end);
            },
            handleChangeSearchDate(date) {
                let vm = this;
                vm.$refs.calendar.fireMethod('gotoDate', date);
            },
            // 点击当天
            dayClick(day, jsEvent) {
                console.log('dayClick', day, jsEvent)
            },
            selectAllow(dateinfo) {
                let vm = this;
                //console.log(dateinfo.start);
                //console.log(dateinfo.end);
                //console.log(vm.allowDates);
                let flag = false;
                vm.allowDates.forEach(date => {
                    //console.log(dateinfo.start.hours());
                    //console.log(date.start.hours());
                    //console.log(dateinfo.start.isAfter(date.start));
                    //console.log(!dateinfo.start.isBefore(date.start) && dateinfo.end.isBefore(date.end));
                    //console.log(dateinfo.start.isAfter(date.start));
                    //console.log(dateinfo.end);
                    //console.log(date.end);
                    //console.log(dateinfo.end.isBefore(date.end));
                    //console.log(vm.gTimeFormat(dateinfo.start));
                    //console.log(date.start);
                    //console.log(vm.$moment(vm.gTimeFormat(dateinfo.start)).isAfter(date.start)
                    //    && vm.$moment(vm.gTimeFormat(dateinfo.end)).isBefore(date.end));
                    if ((vm.$moment(vm.gTimeFormat(dateinfo.start)).isAfter(date.start) || vm.$moment(vm.gTimeFormat(dateinfo.start)).isSame(date.start))
                        &&
                        (vm.$moment(vm.gTimeFormat(dateinfo.end)).isBefore(date.end) || vm.$moment(vm.gTimeFormat(dateinfo.end)).isSame(date.end))) {
                        flag = true;
                    }
                });
                return flag;
            }


        }
    }
</script>

<style lang='scss' scoped>
    .FormCalendar {
        @include content-box;
    }
</style>
