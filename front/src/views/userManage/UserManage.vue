<template>
    <div class='UserManage'>
        <!--搜索区域-->
        <el-row :gutter="10">
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-plus"
                           @click="addFormVisible = true">新增
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
                    <el-table-column property="sex" label="性别" :formatter="gRowSexFormat"></el-table-column>
                    <el-table-column property="birthday" label="生日" :formatter="gRowDateFormat"></el-table-column>
                    <el-table-column property="address" label="地址" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作栏">
                        <template slot-scope="scope">
                            <el-button type="text" @click="handleModify(scope.row._id)">编辑</el-button>
                            <el-button type="text" @click="handleDelete(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </g-table>
                <!--分页-->
                <g-pagination :currentPage="pageInfo.pageNum"
                              :pageSize="pageInfo.pageSize"
                              :total="pageInfo.total"
                              :changePage="getData">
                </g-pagination>
            </el-col>
        </el-row>

        <!--模态框区域-->
        <div class="dialog">
            <!--模态框情形1：模态框中表单没有封装，直接编写-->
            <g-dialog :show.sync="addFormVisible" :width="'500px'" @closedDialog="addForm=formDemo()">
                <!--@closedDialog=$refs.addForm.resetFields()这样是无效的  因为我使用了v-if去关闭dialog的，直接消失了表单，也就不存在$refs.addForm了-->
                <el-form ref="addForm" :model="addForm" label-width="80px">
                    <el-form-item label="用户名" prop="username" :rules="$rules.NotEmpty">
                        <el-input v-model="addForm.username" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="addForm.age" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="addForm.sex">
                            <el-radio :label="2">保密</el-radio>
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="0">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-date-picker
                                v-model="addForm.birthday"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="addForm.address" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAddUser('addForm')">确认</el-button>
                        <el-button @click="addFormVisible=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </g-dialog>

            <!--模态框情形2：模态框中表单被单独封装，需要传递父组件给的表单参数formData，和关闭dialog的控制变量editFormVisible-->
            <g-dialog :show.sync="editFormVisible" :width="'500px'" @closedDialog="editForm=formDemo()">
                <EditForm :formData="editForm" :show.sync="editFormVisible"></EditForm>
            </g-dialog>
        </div>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/15 16:16
     */

    import EditForm from "./components/EditForm";

    export default {
        name: "UserManage",
        components: {EditForm},
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
                addFormVisible: false,
                addForm: this.formDemo(),
                editFormVisible: false,
                editForm: this.formDemo(),

            }
        },
        methods: {
            //查询表格数据
            getData(currentPage = 1) {
                let vm = this;
                vm.pageInfo.pageNum = currentPage;
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
            //点击查询
            handleSearch(input) {
                let vm = this;
                //只有点击查询按钮的时候，关键字才会进行接口查询，不然只是个临时的数据而已
                vm.searchKey.input = input;
                vm.getData();
            },
            //表格点击修改用户
            handleModify(id) {
                let vm = this;
                vm.$api.getSingleUser({id}).then(res => {
                    vm.editForm = res.data;
                    vm.editFormVisible = true;
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
            },
            handleAddUser(formName) {
                let vm = this;
                if (vm.validateRules(formName, vm)) {
                    vm.addFormVisible = false;
                    console.log("新增用户成功");
                }
            },
            //新增 编辑 用户的数据模板
            formDemo() {
                return {
                    id: "",
                    username: "",
                    age: "",
                    sex: "",
                    birthday: "",
                    address: ""
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .UserManage {
        @include content-box;

    }
</style>
