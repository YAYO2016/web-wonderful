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
        <el-checkbox-group
                class="CheckBox"
                v-if="type==='checkbox'"
                v-model="viewValue"
                :placeholder="placeholder"
                :style="{width: width}">
            <el-checkbox v-for="(option,index) in options"
                         :key="index"
                         :label="option[optionValue]"
            > {{option[optionKey]}}
            </el-checkbox>
        </el-checkbox-group>

        <!--日期类-->
        <el-date-picker
                v-if="type==='date'||type==='daterange'"
                v-model="viewValue"
                :type="type"
                :clearable="clearable"
                :placeholder="placeholder"
                :format="dateFormat"
                :value-format="valueFormat"
                :style="{width: width}"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
        >
        </el-date-picker>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/14 20:15
     */

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
                type: String,
                default: ""
            },
            //日期结束时间
            endDate: {
                type: String,
                default: ""
            },
            //日期显示值的格式
            dateFormat: {
                type: String,
                default: "yyyy-MM-dd"
            },
            //日期返回值的格式
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
            }
        },
        data() {
            return {
                viewValue: "",
                checked: false,
            }
        },
        mounted() {
            this.viewValue = this.value;
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
                if (this.type === 'daterange') {
                    if (this.isTrue(newVal)) {
                        this.$emit("update:startDate", newVal[0]);
                        this.$emit("update:endDate", newVal[1]);
                    } else {
                        this.$emit("update:startDate", "");
                        this.$emit("update:endDate", "");
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
        }
    }
</script>

<style lang='scss' scoped>
    .InputView {
        display: inline-block;


    }
</style>
