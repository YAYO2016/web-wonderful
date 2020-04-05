<template>
    <div class='BankList'>
        <el-form ref="form" :model="searchForm" label-width="80px">
            <el-form-item label="银行名称" class="fl">
                <g-auto-complete :data="searchForm" :valueKey="'bankName,ownerCounty,bankId(No)'"
                                 :querySearchFunction="querySearchFunction"
                                 :itemsLength="'medium'"
                                 :width="'200px'"
                ></g-auto-complete>
            </el-form-item>
            <g-split-v></g-split-v>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form>
        <g-table :table-data="tableData">
            <el-table-column prop="bank_id" label="银行id" width="80px"></el-table-column>
            <el-table-column prop="bank_name" label="银行名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bank_no" label="总银行编号"></el-table-column>
            <el-table-column prop="branch_no" label="分行编号"></el-table-column>
            <el-table-column prop="owner_county" label="所属地"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </g-table>
        <g-pagination :currentPage="pageInfo.pageNum"
                      :pageSize="pageInfo.pageSize"
                      :total="pageInfo.total"
                      :changePage="getData">
        </g-pagination>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/5 19:14
     */

    export default {
        name: "BankList",
        data() {
            return {
                tableData: [],
                searchForm: {
                    bankName: '',
                    bankId: '',
                },
                searchKeyForm: {
                    bankName: '',
                    bankId: '',
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            }
        },
        mounted() {
            this.getData(1);
        },
        methods: {
            getData(currentPage = 1) {
                let vm = this;
                vm.pageInfo.pageNum = currentPage;
                vm.$api.getBanks({
                    bankName: vm.searchKeyForm.bankName,
                    pageNum: vm.pageInfo.pageNum,
                    pageSize: vm.pageInfo.pageSize
                }).then(res => {
                    //如果输入的页面不是第一页，并且没有数据的话，那就查询第一页的数据返回
                    if (vm.pageInfo.pageNum !== 1 && res.data === null && res.data.list === []) {
                        vm.getData(1);
                    }
                    vm.tableData = res.data.list;
                    vm.pageInfo = res.data.pageInfo;
                })
            },
            querySearchFunction(queryString) {
                let vm = this;
                return vm.$api.getBankInfo({bankName: queryString}).then(res => {
                    return res.data;
                })
            },
            handleSearch() {
                let vm = this;
                vm.searchKeyForm = {...vm.searchForm};
                vm.getData(1);
            }

        }
    }
</script>

<style lang='scss' scoped>
    .BankList {
        @include content-box;
    }
</style>
