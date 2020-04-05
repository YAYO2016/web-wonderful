<template>
    <div class='UserManage'>
        <!--搜索区域-->
        <el-row :gutter="10">
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus"
                           @click="formVisible = true">新增
                </el-button>
            </el-col>
            <el-col :span="12" align="right">
                <el-input v-model="search.input" placeholder="请输入"
                          style="width: 180px"
                          clearable
                ></el-input>
                <g-split-v></g-split-v>
                <el-button type="primary" @click="handleSearch(search.input)">搜索</el-button>
            </el-col>
        </el-row>
        <g-split-l></g-split-l>
        <!--表格区域-->
        <el-row :gutter="10">
            <el-col :span="24">
                <!--表格-->
                <g-table :tableData="tableData">
                    <el-table-column type="index" width="50" label="序号"></el-table-column>
                    <el-table-column property="username" label="姓名"></el-table-column>
                    <el-table-column property="age" label="年龄"></el-table-column>
                    <el-table-column property="sex" label="性别"></el-table-column>
                    <!--<el-table-column property="sex" label="性别" :formatter="rowSexFormat"></el-table-column>-->
                    <el-table-column property="birthday" label="生日"></el-table-column>
                    <el-table-column property="address" label="地址" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作栏">
                        <template slot-scope="scope">
                            <el-button @click="handleModify(scope.row.id)">编辑</el-button>
                            <el-button type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </g-table>
                <!--分页-->
                <g-pagination :currentPage="pageInfo.pageNum"
                              :pageSize="pageInfo.pageSize"
                              :total="pageInfo.total"
                              @changePage="currentChange"/>
            </el-col>
        </el-row>

        <!--模态框区域-->
        <div class="dialog">
            <g-dialog :show="formVisible" :width="'500px'" @closedDialog="Form=formDemo()">
                <el-form ref="userForm" :model="Form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="Form.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="Form.age" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="Form.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker
                                v-model="Form.birthday"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="Form.address" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">确认</el-button>
                        <el-button @click="formVisible=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </g-dialog>
        </div>
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
                    pageNum: 1,
                    pageSize: 5,
                    total: 0,
                },
                Form: this.formDemo(),
                formVisible: false,
            }
        },
        methods: {
            //查询表格数据
            getData(currentPage = 1) {
                let vm = this;
                vm.pageInfo.pageIndex = currentPage;
                vm.$api.getUsers({
                    username: vm.searchKey.input,
                    pageNum: vm.pageInfo.pageNum,
                    pageSize: vm.pageInfo.pageSize,
                }).then(res => {
                    //如果输入的页面不是第一页，并且没有数据的话，那就查询第一页的数据返回
                    if (vm.pageInfo.pageNum !== 1 && res.data === null && res.data === []) {
                        vm.getData(1);
                    }
                    vm.tableData = res.data.list;
                    vm.pageInfo = res.data.pageInfo;
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
            },
            //新增 编辑 用户的数据模板
            formDemo() {
                return {
                    id: "",
                    name: "",
                    age: "",
                    sex: "",
                    birthday: "",
                    address: ""
                }
            },
            //表格点击修改用户
            handleModify(id) {
                let vm = this;
                vm.$api.getSingleUser({id}).then(res => {
                    vm.Form = res.data;
                    vm.formVisible = true;
                })
            },
            //表格点击删除按钮
            handleDelete(id) {
                this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //执行删除逻辑
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .UserManage {
        @include content-box;

    }
</style>
