<template>
    <div class='FormInputTest'>
        <!--专门测试公共输入组件InputView-->
        <el-form ref="InputViewForm" :model="form" label-width="160px">
            <el-form-item label="用户名（输入框）：" class="fl" label-width="140px">
                <g-input-view :value.sync="form.name"></g-input-view>
            </el-form-item>
            <el-form-item label="地址选择（单选）" class="fl">
                <g-input-view type="select" :value.sync="form.address"
                              :options="areasOptions"
                              option-key="label"
                              option-value="value"
                ></g-input-view>
            </el-form-item>
            <el-form-item label="喜欢的城市（多选）" class="fl">
                <g-input-view type="select"
                              allSelect
                              :value.sync="form.loverAddress"
                              :options="areasOptions"
                              option-key="label"
                              option-value="value"
                ></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="生日(日期)：" class="fl" label-width="140px">
                <g-input-view type="date" :value.sync="form.birthday"></g-input-view>
            </el-form-item>
            <el-form-item label="出差(日期范围)：" class="fl">
                <g-input-view type="daterange" :start-date.sync="form.startDate" :end-date.sync="form.endDate"
                              width="350px"></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
        </el-form>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/15 22:09
     */

    export default {
        name: "FormInputTest",
        data() {
            return {
                form: {
                    name: "",
                    address: "",
                    loverAddress: [],
                    birthday: '',
                    startDate: "",
                    endDate: "",

                },
                areasOptions: [
                    {
                        value: 'nanjing',
                        label: '南京'
                    },
                    {
                        value: 'Chengdu',
                        label: '成都'
                    }, {
                        value: 'Shenzhen',
                        label: '深圳'
                    }, {
                        value: 'Guangzhou',
                        label: '广州'
                    }, {
                        value: 'Dalian',
                        label: '大连'
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .FormInputTest {
        @include content-box;
    }
</style>
