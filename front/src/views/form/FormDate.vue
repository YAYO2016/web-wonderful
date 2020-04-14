<template>
    <div class='FormDate'>
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="活动时间" class="fl">
                <!--value-format 返回值的格式  时间戳
                format 输入框的显示格式
                picker-options 配置选择选择限制
                -->
                <el-date-picker style="width: 300px" type="date" placeholder="选择日期" v-model="form.date"
                                value-format="timestamp"
                                format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="{
                                    disabledDate(time) {
                                        //不可以选择今天之前的
                                        return time.getTime() < Date.now() - 8.64e7;
                                         //如果没有后面的-8.64e7就是不可以选择今天的
                                    }
                                }"
                ></el-date-picker>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="当前日期时间" class="fl">
                <el-date-picker
                        v-model="form.now"
                        type="date"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="width: 400px" label="日期格式" class="fl">
                <el-input v-model="form.format" placeholder="yyyy-MM-dd HH:mm:ss"></el-input>
            </el-form-item>
            <el-form-item label="格式结果时间" class="fl">
                <el-input v-model="formatDate" placeholder="结果时间"></el-input>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="生效日期" class="fl">
                <el-date-picker
                        v-model="form.now"
                        type="date"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="类型" class="fl">
                <el-select v-model="form.selectDateType" placeholder="请选择类型">
                    <el-option
                            v-for="item in ['日','月','年']"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间期限" class="fl">
                <el-input v-model="form.selectCount"
                          oninput="value=value.replace(/\D|^0/g,'')"
                          placeholder="输入期限"></el-input>
            </el-form-item>
            <el-form-item label="截止日期" class="fl">
                <el-input v-model="expireDate" readonly placeholder="截止日期"></el-input>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="日期时间">
                <el-date-picker
                        v-model="form.datetime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="选择时间范围">
                <!--该控件涉及到父子组件的传值，使用sync-->
                <g-date-range :start-date.sync="form.startDate" :end-date.sync="form.endDate"></g-date-range>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-18 23:40
     */

    export default {
        name: "FormDate",
        data() {
            return {
                form: {
                    date: new Date().getTime(),
                    now: this.$moment(),  //moment获取当前日期
                    format: "YYYY-MM-DD HH:mm:ss",
                    selectDateType: '日',
                    selectCount: 0,
                    datetime:"",
                    startDate:"",
                    endDate:""
                }
            }
        },
        computed: {
            formatDate() {
                let vm = this;
                if (vm.form.now) {
                    return vm.$moment(vm.form.now).format(vm.form.format)
                }
            },
            expireDate() {
                let vm = this;
                switch (vm.form.selectDateType) {
                    //日期加减 add  subtract
                    case "日":
                        return vm.$moment(vm.form.now).add(vm.form.selectCount, 'days').format('YYYY-MM-DD HH:mm:ss');
                    case "月":
                        return vm.$moment(vm.form.now).add(vm.form.selectCount, 'months').format('YYYY-MM-DD HH:mm:ss');
                    case "年":
                        return vm.$moment(vm.form.now).add(vm.form.selectCount, 'years').format('YYYY-MM-DD HH:mm:ss');
                }
            }
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .FormDate {
        @include content-box;

    }
</style>
