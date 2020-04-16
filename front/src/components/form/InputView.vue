<template>
    <div class='InputView'>
        <!--输入框-->
        <el-input
                class="input"
                v-if="type==='input'"
                v-model="viewValue"
                :placeholder="placeholder"
                :style="{width: width}"
                :clearable="clearable"
        ></el-input>

        <!--下拉单选和下拉多选选择框-->
        <el-select
                class="Select"
                v-if="type==='select'"
                v-model="viewValue"
                :placeholder="placeholder"
                :style="{width: width}"
                :clearable="clearable"
                :multiple="multiple||allSelect"
                collapse-tags
        >
            <!--全选框-->
            <el-checkbox
                    v-if="allSelect"
                    v-model="checked"
                    @change='selectAll'
            >全选
            </el-checkbox>
            <el-option v-for="(option,index) in options"
                       :key="index"
                       :value="option[optionValue]"
                       :label="option[optionKey]"
            >
            </el-option>
        </el-select>

        <!--radio单选-->
        <el-radio-group
                class="Radio"
                v-if="type==='radio'"
                v-model="viewValue"
                :placeholder="placeholder"
                :style="{width: width}">
            <el-radio v-for="(option,index) in options"
                      :key="index"
                      :label="option[optionValue]">
                {{option[optionKey]}}
            </el-radio>
        </el-radio-group>

        <!--多选框和全选-->
        <div v-if="type==='checkbox'" class="CheckBox" :style="{width: width}">
            <el-checkbox-group v-model="viewValue" style="display: inline-block">
                <el-checkbox v-for="(option,index) in options"
                             :key="index"
                             :label="option[optionValue]"
                > {{option[optionKey]}}
                </el-checkbox>
            </el-checkbox-group>
            <el-checkbox v-if="allSelect"
                         style="display: inline-block;margin-left: 20px"
                         v-model="checked"
                         @change='selectAll'>全选
            </el-checkbox>
        </div>


        <!--日期类-->
        <el-date-picker
                v-if="type==='date'||type==='daterange' || type==='datetimerange'"
                v-model="viewValue"
                :type="type"
                :clearable="clearable"
                :placeholder="placeholder"
                :format="type==='datetimerange'?'yyyy-MM-dd HH:mm:ss':dateFormat"
                :value-format="type==='datetimerange'?'yyyy-MM-dd HH:mm:ss  ':valueFormat"
                :style="{width: width}"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
        >
        </el-date-picker>

        <!--数字类-->
        <el-input-number
                v-if="type==='number'"
                v-model="viewValue"
                :style="{width: width}"
                :placeholder="placeholder"
                :min="Number(min)"
                :max="Number(max)"
                :clearable="clearable"
                :step="Number(step)"
                :label="placeholder"
                :precision="Number(precision)"
                :controls-position="controlsPosition"
        >
        </el-input-number>
        <el-input
                v-if="type==='inputPositive'"
                :style="{width: width}"
                :clearable="clearable"
                :placeholder="placeholder"
                v-model="viewValue"
                oninput="value=/^\d*(?:\.\d{0,})?$/.test(value)?value:''"
        >
            <!--只能输入数字>0的输入框（正数）-->
        </el-input>
        <el-input
                v-if="type==='inputPositiveInt' || type==='inputInt'"
                :style="{width: width}"
                :clearable="clearable"
                :placeholder="placeholder"
                v-model="viewValue"
                oninput="value=value.replace(/\D|^0/g,'')"
        >
            <!--只能输入数字，没有小数的的输入框（正整数）-->
        </el-input>
        <el-input
                v-if="type==='money'"
                :placeholder="placeholder"
                :clearable="clearable"
                :style="{width: width}"
                v-model="viewValue"
                oninput="value=(/^\d*(?:\.\d{0,})?$/.test(value)?value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'):'')"
        >
            <!--输入只能保留2位的正整数（一般用于货币）-->
        </el-input>


        <!--区域选择-->
        <el-cascader
                v-if="type==='areas'"
                :clearable="clearable"
                class="Areas"
                :options="areaOptions"
                v-model="viewValue"
                :style="{width:width }"
        >
        </el-cascader>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/14 20:15
     */
    import areaJson from "@/assets/json/area.json"

    export default {
        name: "InputView",
        props: {
            width: {
                type: String,
                default: "175px"
            },
            //表单控件的类型
            type: {
                type: String,
                default: "input"
            },
            //表单控件的值value
            value: {
                default: ""
            },
            //选择表单的选项(需要转换成键名是key-value的形式)
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
            //选项的key和value的属性值
            optionKey: {
                type: String,
                default: "key"
            },
            optionValue: {
                type: String,
                default: "value"
            },
            multiple: {
                type: Boolean,
                default: false
            },
            //select是否存在全选框
            allSelect: {
                type: Boolean,
                default: false
            },
            //日期开始时间
            startDate: {
                type: [String, Date],
                default: ""
            },
            //日期结束时间
            endDate: {
                type: [String, Date],
                default: ""
            },
            //日期显示值的格式
            dateFormat: {
                type: String,
                default: "yyyy-MM-dd"
            },
            //默认的日期返回值的格式
            valueFormat: {
                type: String,
                default: "yyyy-MM-dd"
            },
            placeholder: {
                type: String,
                default: "请输入"
            },
            clearable: {
                type: Boolean,
                default: true
            },
            max: {
                type: [Number, String],
                default: Infinity
            },
            min: {
                type: [Number, String],
                default: -Infinity
            },
            step: {
                type: [Number, String],
                default: 1
            },
            precision: {  //精度
                type: [Number, String],
                default: 1
            },
            controlsPosition: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                viewValue: "",
                checked: false,
                areaOptions: [],
            }
        },
        mounted() {

            if (this.type === 'areas') {
                this.areaOptions = this.getAreaList();
                this.viewValue = this.getArea(this.value);
            } else {
                this.viewValue = this.value;
            }
        },
        watch: {
            viewValue(newVal) {
                if (this.isTrue(newVal)) {
                    this.$emit("update:value", newVal);
                } else {
                    //如果值是0的话，也会是false，但是有时候数据本身就是0，这是需要的
                    if (newVal === 0) {
                        this.$emit("update:value", 0);
                    } else {
                        this.$emit("update:value", "");
                    }
                }
                if (this.allSelect) {
                    if (newVal.length === this.options.length) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                }
                if (this.type === 'daterange' || this.type === 'datetimerange') {
                    if (this.isTrue(newVal)) {
                        this.$emit("update:startDate", newVal[0]);
                        this.$emit("update:endDate", newVal[1]);
                    } else {
                        this.$emit("update:startDate", "");
                        this.$emit("update:endDate", "");
                    }
                }
                //区域选择
                if (this.type === 'areas') {
                    if (this.isTrue(newVal)) {
                        this.$emit("update:value", newVal[newVal.length - 1]);
                    } else {
                        this.$emit("update:value", "");
                    }
                }
            }
        },
        methods: {
            //选择框里面的全选按钮的操作
            selectAll() {
                let vm = this;
                //子组件通过update更改父组件中的属性值，父组件通过sync来修饰属性名
                //可以实现子组件修改父组件的值，并且不会报错
                //vm.$emit('update:value', []);
                vm.viewValue = [];
                if (vm.checked) {
                    let result = [];
                    vm.options.map((item) => {
                        result.push(item[vm.optionValue])
                    });
                    vm.viewValue = result;
                    //vm.$emit('update:value', result)
                } else {
                    vm.viewValue = [];
                    //vm.$emit('update:value', []);
                }
            },
            isTrue(o) {  //是否是true
                return !this.isFalse(o)
            },
            isFalse(o) {  //是否是false
                if (o == '' || o == undefined || o == null || o == 'null' || o == 'undefined' || o == 0 || o == false || o == NaN) return true;
                return false
            },
            //获取所有省市数据
            getAreaList() {
                let options = [];
                Object.keys(areaJson).forEach((item, index) => {
                    let obj = {};
                    obj["value"] = areaJson[item].code;
                    obj["label"] = areaJson[item].name;
                    if (areaJson[item].children) {
                        let cityList = [];
                        obj["children"] = [];
                        Object.keys(areaJson[item].children).forEach((item2, index2) => {
                            let cityObj = {};
                            cityObj["value"] = areaJson[item].children[item2].code;
                            cityObj["label"] = areaJson[item].children[item2].name;
                            if (areaJson[item].children[item2].children) {
                                let areaList = [];
                                cityObj["children"] = [];
                                Object.keys(areaJson[item].children[item2].children).forEach((item3, index3) => {
                                    let areaObj = {};
                                    areaObj["value"] = areaJson[item].children[item2].children[item3].code;
                                    areaObj["label"] = areaJson[item].children[item2].children[item3].name;
                                    areaObj["parentCode"] = areaJson[item].children[item2].code;
                                    areaObj["parentLabel"] = areaJson[item].children[item2].name;
                                    areaList.push(areaObj);
                                });
                                cityObj["children"] = areaList;
                            }
                            cityObj["parentCode"] = areaJson[item].code;
                            cityObj["parentLabel"] = areaJson[item].name;
                            cityList.push(cityObj);
                        });
                        obj["children"] = cityList;
                    }
                    options.push(obj);
                });
                return options;
            },
            //根据地址码获取具体的地址信息
            getArea(addressCode) {
                let code = addressCode;
                // let code = '130103';
                let list = this.getAreaList();
                let parentList = [];
                let temporary = [], area = [];

                //生成父列表数据
                function buildParentList(arr) {
                    arr.forEach(g => {
                        if (g.value != undefined) {
                            let pid = g['parentCode'];
                            let oid = g['value'];
                            parentList[oid] = pid;
                        }
                        if (g.children != undefined) {
                            buildParentList(g['children']);
                        }
                    })
                }

                //参数是code，按照code查询地址
                function findParent(idx) {
                    if (parentList[idx] != undefined) {
                        let pid = parentList[idx];
                        temporary.push(pid);
                        findParent(pid);
                    }
                }

                buildParentList(list);

                findParent(code);

                if (temporary.length === 0) {
                    //没有查询父级别地址,判断是否是第一级，不是就是脏数据
                    Object.keys(areaJson).indexOf(code) != -1 ? area.push(code) : area = [];
                } else {
                    //有父级别地址
                    for (let i = temporary.length - 1; i >= 0; i--) {
                        area.push(temporary[i]);
                    }
                    area.push(code);
                }
                if (area.length > 0) {
                    return area;
                }
            },
            setArea(code) {//获取地区名 
                if (!code) {
                    return;
                }
                let list = this.getAreaList();
                let parentList = [];
                let temporary = [], area = [];

                function buildParentList(arr) {
                    arr.forEach(g => {
                        if (g.value != undefined) {
                            let pid = g['parentCode'];
                            let oid = g['value'];
                            parentList[oid] = pid;
                        }
                        if (g.children != undefined) {
                            buildParentList(g['children']);
                        }
                    })
                }

                function findParent(idx) {
                    if (parentList[idx] != undefined) {
                        let pid = parentList[idx];
                        temporary.push(pid);
                        findParent(pid);
                    }
                }

                buildParentList(list);
                findParent(code); // 0 1 2 
                for (let i = temporary.length - 1; i >= 0; i--) {
                    area.push(temporary[i]);
                }
                area.push(code);
                let aName = "";
                for (let i = 0; i < list.length; i++) {
                    if (list[i].value == area[0]) {
                        aName += list[i].label;       // debugger 
                        if (area.length > 1) {
                            for (let j = 0; j < list[i].children.length; j++) {
                                if (list[i].children[j].value == area[1]) {
                                    aName += list[i].children[j].label;
                                    if (area.length > 2) {
                                        for (let k = 0; k < list[i].children[j].children.length; k++) {
                                            if (list[i].children[j].children[k].value == area[2]) {
                                                aName += list[i].children[j].children[k].label;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return aName;
            }
        }

    }

</script>

<style lang='scss' scoped>
    .InputView {
        display: inline-block;


    }
</style>
