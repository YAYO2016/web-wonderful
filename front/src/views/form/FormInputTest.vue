<template>
    <div class='FormInputTest'>
        <!--专门测试公共输入组件InputView-->
        <el-form ref="InputViewForm" :model="form" label-width="180px">
            <el-form-item label="用户名（输入框）：" class="fl" label-width="140px">
                <g-input-view :value.sync="form.name"></g-input-view>
                <g-split-v></g-split-v>
                <g-input-view :value.sync="form.name" disabled></g-input-view>
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
            <el-divider></el-divider>
            <el-form-item label="生日(日期)：" class="fl" label-width="140px">
                <g-input-view type="date" :value.sync="form.birthday"></g-input-view>
            </el-form-item>
            <el-form-item label="出差(日期范围)：" class="fl">
                <g-input-view type="daterange" :start-date.sync="form.startDate" :end-date.sync="form.endDate"
                              width="350px"></g-input-view>
            </el-form-item>
            <el-form-item label="出差(日期时间范围)：" class="fl">
                <g-input-view type="datetimerange" :start-date.sync="form.startDate" :end-date.sync="form.endDate"
                              width="350px"></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="性别（单选）：" class="fl">
                <g-input-view type="radio" :value.sync="form.sex"
                              :options="[{key:'男',value:1},{key:'女',value:0},{key:'保密',value:3}]"
                              width="200px"></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="兴趣爱好（多选）：" class="fl">
                <g-input-view type="checkbox" :value.sync="form.favourite"
                              allSelect
                              :options="[{key:'篮球',value:'lanqiu'},{key:'羽毛球',value:'yumaoq'},{key:'保龄球',value:'baolingqiu'}]"
                              width="350px"></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="输入数字：" class="fl">
                <g-input-view type="number" :value.sync="form.number" max="10" min="-3" step="0.1" precision="2"
                              controls-position="right"></g-input-view>
            </el-form-item>
            <el-form-item label="正数：" class="fl">
                <g-input-view type="inputPositive" :value.sync="form.number"></g-input-view>
            </el-form-item>
            <el-form-item label="正整数：" class="fl">
                <g-input-view type="inputInt" :value.sync="form.number"></g-input-view>
            </el-form-item>
            <el-form-item label="金额（默认2位小数）：" class="fl">
                <g-input-view type="money" :value.sync="form.money"></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="区域选择：" class="fl">
                <g-input-view type="areas" :value.sync="form.areas"></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="颜色选择：" class="fl">
                <g-input-view type="color" :value.sync="form.color"
                              predefineColor="true"
                              size="large"
                              alpha
                ></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="树形结构选择：" class="fl">
                <g-input-view type="tree" :value.sync="form.selectMenus"
                              width="250px"
                              :options="menuOptions"
                              option-key="name"
                              option-value="children"
                              optionId="id"
                              optionParentId="parentId"
                ></g-input-view>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
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
                    loverAddress: ['nanjing','Chengdu'],
                    birthday: '',
                    startDate:new Date(),
                    endDate:new Date(),
                    sex: "",
                    favourite: [],
                    number: 0,
                    money: 0,
                    areas: "140421",
                    color: "",
                    selectMenus: [3],

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
                ],
                menuOptions: [
                    {id: 1, parentId: 0, name: "一级菜单A", rank: 1},
                    {id: 2, parentId: 0, name: "一级菜单B", rank: 1},
                    {id: 3, parentId: 0, name: "一级菜单C", rank: 1},
                    {id: 4, parentId: 1, name: "二级菜单A-A", rank: 2},
                    {id: 5, parentId: 1, name: "二级菜单A-B", rank: 2},
                    {id: 6, parentId: 2, name: "二级菜单B-A", rank: 2},
                    {id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3},
                    {id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4},
                    {id: 9, parentId: 8, name: "五级菜单A-A-A-A-A", rank: 5},
                    {id: 10, parentId: 9, name: "六级菜单A-A-A-A-A-A", rank: 6},
                    {id: 11, parentId: 10, name: "七级菜单A-A-A-A-A-A-A", rank: 7},
                    {id: 12, parentId: 11, name: "八级菜单A-A-A-A-A-A-A-A", rank: 8},
                    {id: 13, parentId: 12, name: "九级菜单A-A-A-A-A-A-A-A-A", rank: 9},
                    {id: 14, parentId: 13, name: "十级菜单A-A-A-A-A-A-A-A-A-A", rank: 10},
                ],
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
