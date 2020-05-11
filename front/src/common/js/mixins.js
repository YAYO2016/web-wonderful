/**
 * Created by yanyue on 2020/4/6 11:47
 * 混入 (mixins)： 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
 */
const commonMixin = {
    data() {
        return {
            tableData: [],
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        }
    }
};

const dialogFormMixin = {
    props: {
        formData: {
            type: Object,
            default() {
                return {}
            }
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tempFormData: this.formData,
            tempShow: this.show
        }
    },
    watch: {
        tempShow(newVal,oldVal) {
            this.$emit("update:show", newVal);
        },
        tempFormData: {
            // immediate: true,  //刷新加载 立马触发一次handler
            deep: true, // 可以深度检测到 tempFormData 对象的属性值的变化
            handler(newVal, oldVal) {
                this.$emit("update:formData", newVal);
            }

        }
    }
};

export default {commonMixin, dialogFormMixin};
