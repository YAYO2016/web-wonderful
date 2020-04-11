<template>
    <div class='FormCalendar'>
        <el-row :gutter="10">
            <el-col :span="16">
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
            </el-col>

            <el-col :span="8">
                <el-card class="box-card">
                    <el-collapse accordion v-model="searchForm.activeNames" @change="meetingForm=initMeetingForm()">
                        <el-collapse-item name="addMeeting">
                            <template slot="title">
                                新增会议
                            </template>
                            <el-form ref="addMeetingForm" :model="addMeetingForm" label-width="110px">
                                <el-form-item label="会议标题" prop="title"
                                              :rules="$rules.NotEmpty">
                                    <el-input v-model="addMeetingForm.title" placeholder="请输入会议标题"
                                              style="width: 200px"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="会议开始时间" prop="start" :rules="$rules.NotEmpty">
                                    <el-date-picker
                                            v-model="addMeetingForm.start"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="会议结束时间" prop="end" :rules="$rules.NotEmpty">
                                    <el-date-picker
                                            v-model="addMeetingForm.end"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleAddMeeting('addMeetingForm')">新增</el-button>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>
                        <el-collapse-item title="会议编辑" name="editMeeting">
                            <el-form ref="editMeetingForm" :model="editMeetingForm" label-width="110px">
                                <el-form-item label="会议标题" prop="title"
                                              :rules="$rules.NotEmpty">
                                    <el-input v-model="editMeetingForm.title" placeholder="请输入会议标题"
                                              style="width: 200px"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="会议开始时间" prop="start" :rules="$rules.NotEmpty">
                                    <el-date-picker
                                            v-model="editMeetingForm.start"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="会议结束时间" prop="end" :rules="$rules.NotEmpty">
                                    <el-date-picker
                                            v-model="editMeetingForm.end"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="handleEditMeeting('editMeetingForm')">提交编辑
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>

            </el-col>
        </el-row>

        <div class="dialog">
            <!--将新增会议功能放置到折叠面板中去-->
            <!--
            <g-dialog :show.sync="meetingDialogVisible" @closedDialog="meetingForm=initMeetingForm()">
                <el-form ref="meetingForm" :model="meetingForm" label-width="100px">
                    <el-form-item label="会议标题">
                        <el-input v-model="meetingForm.title" placeholder="请输入会议标题"
                                  style="width: 200px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="会议开始时间">
                        <el-date-picker
                                v-model="meetingForm.start"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="会议结束时间">
                        <el-date-picker
                                v-model="meetingForm.end"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAddMeeting">新增</el-button>
                        <el-button @click="meetingDialogVisible=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </g-dialog>
            -->
        </div>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/6 20:11
     * 高级日历组件
     */
    import {FullCalendar} from 'vue-full-calendar'
    import 'fullcalendar/dist/fullcalendar.css'
    //import $ from "jquery";


    export default {
        name: "FormCalendar",
        components: {FullCalendar},
        data() {
            return {
                searchForm: {
                    date: "",
                    view: "agendaWeek",  //默认显示周视图
                    activeNames: "addMeeting",//当前激活的折叠面板
                },
                //事件返回的值  title时间内容   start事件开始时间  end事件结束时间
                events: [],
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
                    slotLabelFormat: 'H:mm', // axisFormat 'H(:mm)'
                    slotLabelInterval: 1,
                    slotDuration: '00:30:00', //时间间隔
                    minTime: '9:00',  //表格开始时间
                    maxTime: '18:00',  //表格结束时间
                    selectable: false,  //不允许用户点击拉取表格区域（生成事件交给上面的新建按钮弹框去做）
                    editable: false,  //不允许用户操作已经存在的时间
                    /* 设置按钮文字 */
                    buttonText: {
                        today: '今天',
                    },
                    eventClick: this.eventClick, //点击事件
                    dayClick: this.dayClick, //点击日程表上面某一天
                },
                //meetingDialogVisible: false,
                addMeetingForm: this.initMeetingForm(),
                editMeetingForm: this.initMeetingForm()
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
            vm.getData();

        },
        methods: {
            getData() {
                let vm = this;
                vm.$api.getMeetings().then(res => {
                    vm.events = res.data;
                })
            },
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
            // 点击当天
            dayClick(day, jsEvent) {
                console.log('dayClick', day, jsEvent)
            },
            handleChangeSearchDate(date) {
                let vm = this;
                vm.$refs.calendar.fireMethod('gotoDate', date);
            },
            initMeetingForm() {
                return {
                    id:"",
                    title: "",
                    start: "",
                    end: ""
                }
            },
            handleAddMeeting(formName) {
                let vm = this;
                if (vm.validateRules(formName, vm)) {
                    this.$confirm('是否确认新增该会议?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.$api.addMeeting(vm.addMeetingForm).then(res => {
                            vm.$message("新增成功");
                            //vm.meetingDialogVisible = false;
                            //获取最新的数据并且更新日历，并且清空表单数据
                            vm.getData();
                            vm.addMeetingForm = vm.initMeetingForm();
                            vm.$refs.calendar.fireMethod('rerenderEvents');
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            handleEditMeeting(formName){
                let vm = this;
                if (vm.validateRules(formName, vm)) {
                    this.$confirm('是否确认编辑该会议?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        vm.$api.editMeeting(vm.editMeetingForm).then(res => {
                            vm.$message("编辑成功");
                            //获取最新的数据并且更新日历，并且清空表单数据
                            vm.getData();
                            vm.editMeetingForm = vm.initMeetingForm();
                            vm.$refs.calendar.fireMethod('rerenderEvents');
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .FormCalendar {
        @include content-box;
    }
</style>
