<template>
    <div class='FormTree'>
        <el-row :gutter="10">
            <el-col :span="12">
                <el-tree
                        class="tree-wrapper"
                        :data="data"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        :props="defaultProps">
                </el-tree>
            </el-col>
            <el-col :span="12">

            </el-col>
        </el-row>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/11 17:23
     */
    import AreaArr from "@/assets/json/area-array.json"

    export default {
        name: "FormTree",
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                AreaArr:AreaArr.areas
            }
        },
        mounted(){
            let vm = this;
            vm.data = vm.$util.ArrayFn.translateDataToTree(vm.AreaArr,'code','belongTo','children')
            //接口获取十几万数据太困难，使用json文件返回
            //vm.$api.getBanks({
            //    pageNum: 1,
            //    pageSize: 99
            //}).then(res => {
            //    vm.data = res.data.list;
            //})
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
    .FormTree {
        @include content-box;

        .tree-wrapper {
            padding: 20px;
            width: 500px;
            height: 500px;
            overflow-y: auto;
            border: 1px solid #ccc;
            border-radius: 5px
        }
    }
</style>
