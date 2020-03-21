<template>
    <div class='FormTable'>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>可拖动的表格</span>
            </div>
            <div>
                <el-table
                        row-key="id"
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            v-for="(item, index) in col"
                            :key="`col_${index}`"
                            :prop="dropCol[index].prop"
                            :label="item.label"
                    >
                    </el-table-column>
                </el-table>
                <!--<pre style="text-align: left">-->
                <!--{{dropCol}}-->
                <!--</pre>-->
                <!--<hr>-->
                <!--<pre style="text-align: left">-->
                <!--{{tableData}}-->
                <!--</pre>-->
            </div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>空的表格</span>
            </div>
            <div>
                <el-table
                        :data="tableData0"
                        border
                        style="width: 100%">
                    <div slot="empty">
                        <div>表格内容为空</div>
                        <i class="fa fa-table fa-4x"></i>
                    </div>
                </el-table>
            </div>
        </el-card>
        <g-split></g-split>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>滚动条的表格</span>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            fixed
                            prop="date"
                            label="日期"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="province"
                            label="省份"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="city"
                            label="市区"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="zip"
                            label="邮编"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                    <div slot="empty">
                        <div>表格内容为空</div>
                        <i class="fa fa-table fa-4x"></i>
                    </div>
                </el-table>
            </div>
        </el-card>
        <g-split></g-split>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>默认展开的表格</span>
            </div>
            <div>
                <!--default-expand-all 默认展开所有行-->
                <el-table
                        :default-expand-all="true"
                        :data="tableData2"
                        border
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="商品名称">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="所属店铺">
                                    <span>{{ props.row.shop }}</span>
                                </el-form-item>
                                <el-form-item label="商品 ID">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="店铺 ID">
                                    <span>{{ props.row.shopId }}</span>
                                </el-form-item>
                                <el-form-item label="商品分类">
                                    <span>{{ props.row.category }}</span>
                                </el-form-item>
                                <el-form-item label="店铺地址">
                                    <span>{{ props.row.address }}</span>
                                </el-form-item>
                                <el-form-item label="商品描述">
                                    <span>{{ props.row.desc }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="商品 ID"
                            prop="id">
                    </el-table-column>
                    <el-table-column
                            label="商品名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="描述"
                            prop="desc">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-22 11:39
     */

    import Sortable from 'sortablejs'

    export default {
        name: "FormTable",
        data() {
            return {
                tableData0: [],
                col: [
                    {
                        label: "日期",
                        prop: "date"
                    },
                    {
                        label: "姓名",
                        prop: "name"
                    },
                    {
                        label: "省份",
                        prop: "province"
                    },
                    {
                        label: "市区",
                        prop: "city"
                    },
                    {
                        label: "地址",
                        prop: "address"
                    },
                    {
                        label: "邮编",
                        prop: "zip"
                    },
                    {
                        label: "操作",
                        prop: "right"
                    }
                ],
                dropCol: [
                    {
                        label: "日期",
                        prop: "date"
                    },
                    {
                        label: "姓名",
                        prop: "name"
                    },
                    {
                        label: "省份",
                        prop: "province"
                    },
                    {
                        label: "市区",
                        prop: "city"
                    },
                    {
                        label: "地址",
                        prop: "address"
                    },
                    {
                        label: "邮编",
                        prop: "zip"
                    },
                    {
                        label: "操作",
                        prop: "right"
                    }
                ],
                tableData: [
                    {
                        id: 1,
                        date: '2016-05-02',
                        name: '王小虎1',
                        province: '上海',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1518 弄',
                        zip: 200333
                    }, {
                        id: 2,
                        date: '2016-05-04',
                        name: 'yanyue',
                        province: '北京',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1517 弄',
                        zip: 200333
                    }, {
                        id: 3,
                        date: '2016-05-01',
                        name: '王小虎3',
                        province: '意大利',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1519 弄',
                        zip: 200333
                    }, {
                        id: 4,
                        date: '2016-05-03',
                        name: 'YAYO',
                        province: '南京',
                        city: '普陀区',
                        address: '上海市普陀区金沙江路 1516 弄',
                        zip: 200333
                    }],
                tableData2: [
                    {
                        id: '12987122',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987123',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987125',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }, {
                        id: '12987126',
                        name: '好滋好味鸡蛋仔',
                        category: '江浙小吃、小吃零食',
                        desc: '荷兰优质淡奶，奶香浓而不腻',
                        address: '上海市普陀区真北路',
                        shop: '王小虎夫妻店',
                        shopId: '10333'
                    }]
            }
        },
        mounted() {
            // 阻止默认行为
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            };
            this.rowDrop();
            this.columnDrop();
        },
        methods: {
            handleClick(row) {
                console.log(row);
            },
            //行拖拽
            rowDrop() {
                const tbody = document.querySelector(".el-table__body-wrapper tbody");
                const _this = this;
                Sortable.create(tbody, {
                    onEnd({newIndex, oldIndex}) {
                        const currRow = _this.tableData.splice(oldIndex, 1)[0];
                        _this.tableData.splice(newIndex, 0, currRow);
                    }
                });
            },
            //列拖拽
            columnDrop() {
                const wrapperTr = document.querySelector(".el-table__header-wrapper tr");
                this.sortable = Sortable.create(wrapperTr, {
                    animation: 180,
                    delay: 0,
                    filter: ".cannotDrag",
                    onEnd: evt => {
                        const oldItem = this.dropCol[evt.oldIndex];
                        this.dropCol.splice(evt.oldIndex, 1);
                        this.dropCol.splice(evt.newIndex, 0, oldItem);
                    }
                });
            }
        }

    }
</script>

<style lang='scss' scoped>
    .FormTable {
        //@include content-box;

        /*//滚动条的宽度*/
        /*::-webkit-scrollbar {*/
        /*    width: 10px;*/
        /*    height: 10px;*/
        /*}*/
        /*//滚动条的滑块*/
        /*::-webkit-scrollbar-thumb {*/
        /*    background-color: #dddee0;*/
        /*    border-radius: 5px;*/
        /*}*/
    }
</style>
