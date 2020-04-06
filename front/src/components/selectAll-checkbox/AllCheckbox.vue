<template>
    <el-checkbox v-model="checked"
                 @change='selectAll'
    >全选</el-checkbox>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/6 19:04
     */

    export default {
        name: "AllCheckbox",
        props: {
            //待选择的数据
            selectData: {
                type: Array,
                default: () => {
                    return []
                }
            },
            //可供选择的数据
            options: {
                type: Array,
                default: () => {
                    return []
                }
            },
        },
        data() {
            return {
                checked: false
            }
        },
        watch:{
            "selectData":{
                immediate:true,
                handler(newVal,oldVal){
                    if(newVal.length === this.options.length){
                        this.checked = true;
                    }else{
                        this.checked = false;
                    }
                }
            }
        },
        methods: {
            selectAll() {
                let vm = this;
                //子组件通过update更改父组件中的属性值，父组件通过sync来修饰属性名
                //可以实现子组件修改父组件的值，并且不会报错
                vm.$emit('update:selectData', []);
                if (vm.checked) {
                    let result = [];
                    vm.options.map((item) => {
                        result.push(item.value)
                    });
                    vm.$emit('update:selectData', result)
                } else {
                    vm.$emit('update:selectData', []);
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .AllCheckbox {

    }
</style>
