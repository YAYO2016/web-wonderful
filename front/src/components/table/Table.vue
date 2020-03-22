<template>
    <div class="Table">
        <el-table
                ref="table"
                :data="tableData"
                :size="size"
                :height="height"
                :header-cell-style="{background:'#F5F7FA'}"
                highlight
                highlight-current-row
                border
                @row-click="rowClick"
                @current-change="handleCurrentChange"
                :row-class-name="tableRowClassName"
                @selection-change="handleChange"
                @select="select"
                @filter-change="filterChange"
                tooltip-effect="dark"
        >
            <slot></slot>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'BackTable',
        props: {
            tableData: {
                type: Array,
                default: []
            },
            rowClickFun: {
                type: Function,
                default: () => {
                }
            },
            handleSelectionChange: {
                type: Function,
                default: () => {
                }
            },
            height: {
                type: String,
            },
            size: {
                type: String,
                default: 'mini'
            }
        },
        data() {
            return {}
        },
        methods: {
            rowClick(row) {
                let vm = this;
                return vm.rowClickFun(row);
            },
            tableRowClassName({row, rowIndex}) {
                //将下标添加到row中去
                row.index = rowIndex;
            },
            handleCurrentChange() {

            },
            handleChange(val) {
                let vm = this;
                vm.$emit('handleChange', val);
            },
            select() {
                let vm = this;
                vm.$emit('select');
            },
            filterChange(val) {
                let vm = this;
                vm.$emit('filterChange', val);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .Table {
        /deep/ .el-table th.gutter{
            display: table-cell!important;
        }
        /deep/ .el-table__header-wrapper {
            th {
                text-align: center;
            }
        }

        /deep/ .el-table__body-wrapper {
            td {
                text-align: center;

                div {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }

</style>
