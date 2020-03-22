<template>
    <div class='UserManage'>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus">新增</el-button>
            </el-col>
            <el-col :span="12" align="right">
                <el-input v-model="searchWords" placeholder="请输入" style="width: 180px;padding-right: 20px"></el-input>
                <el-button type="primary">搜索</el-button>
            </el-col>
        </el-row>
        <g-split></g-split>
        <el-row :gutter="10">
            <el-col :span="24">
                <g-table :tableData="userData">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column property="name" label="姓名"></el-table-column>
                    <el-table-column property="age" label="年龄"></el-table-column>
                    <el-table-column property="sex" label="性别" :formatter="rowSexFormat"></el-table-column>
                    <el-table-column property="birthday" label="生日"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                    <el-table-column label="操作栏">
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">删除</el-button>
                    </el-table-column>
                </g-table>
                <g-pagination :currentPage="pageInfo.currentPage"
                              :pageSize="pageInfo.pageSize"
                              :total="pageInfo.total"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/15 16:16
     */

    export default {
        name: "UserManage",
        created() {
            let vm = this;
            vm.getUserData();
        },
        data() {
            return {
                searchWords: '',
                userData: [],
                pageInfo: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 100,
                },
            }
        },
        methods: {
            getUserData() {
                let vm = this;
                vm.$api.getUsers().then(res => {
                    vm.userData = res.data.list;
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
    .UserManage {
        @include content-box;

    }
</style>
