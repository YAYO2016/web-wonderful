<template>
    <div class='UserManage'>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus">新增</el-button>
            </el-col>
            <el-col :span="12" align="right">
                <el-input v-model="search.input" placeholder="请输入"
                          style="width: 180px;margin-right: 20px"
                          clearable
                ></el-input>
                <el-button type="primary" @click="handleSearch(search.input)">搜索</el-button>
            </el-col>
        </el-row>
        <g-split></g-split>
        <el-row :gutter="10">
            <el-col :span="24">
                <g-table :tableData="tableData">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column property="name" label="姓名"></el-table-column>
                    <el-table-column property="age" label="年龄"></el-table-column>
                    <el-table-column property="sex" label="性别" :formatter="rowSexFormat"></el-table-column>
                    <el-table-column property="birthday" label="生日"></el-table-column>
                    <el-table-column property="address" label="地址" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作栏">
                        <el-button >编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </el-table-column>
                </g-table>
                <g-pagination :currentPage="pageInfo.pageIndex"
                              :pageSize="pageInfo.pageSize"
                              :total="pageInfo.total"
                              @changePage="currentChange"/>
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
        mounted() {
            let vm = this;
            vm.getData();
        },
        data() {
            return {
                search: {
                    input: '',
                },
                searchKey: {
                    input: '',
                },
                tableData: [],
                pageInfo: {
                    pageIndex: 1,
                    pageSize: 5,
                    total: 0,
                },
            }
        },
        methods: {
            //查询表格数据
            getData(currentPage = 1) {
                let vm = this;
                vm.pageInfo.pageIndex = currentPage;
                vm.$api.getUsers({
                    username: vm.searchKey.input,
                    pageNum: vm.pageInfo.pageIndex,
                    pageSize: vm.pageInfo.pageSize,
                }).then(res => {
                    //如果输入的页面不是第一页，并且没有数据的话，那就查询第一页的数据返回
                    if (vm.pageInfo.pageIndex !== 1 && res.data === null && res.data === []) {
                        vm.getData('1');
                    }
                    vm.tableData = res.data.list;
                    vm.pageInfo = res.pageInfo;
                })
            },
            //翻页
            currentChange(currentPage) {
                let vm = this;
                vm.getData(currentPage)
            },
            //点击查询
            handleSearch(input) {
                let vm = this;
                //只有点击查询按钮的时候，关键字才会进行接口查询，不然只是个临时的数据而已
                vm.searchKey.input = input;
                vm.getData();
            }
        }
    }
</script>

<style lang='scss' scoped>
    .UserManage {
        @include content-box;

    }
</style>
