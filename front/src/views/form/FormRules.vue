<template>
    <div class='FormRules'>
        <div class="first-title">1.暂存不校验，提交校验的表单</div>
        <el-form ref="personForm" :model="form" label-width="80px" style="width: 450px"
                 :validate-on-rule-change="false">
            <el-form-item prop="name" :rules="validate?$rules.NotEmpty:{}">
                <span slot="label">姓名：</span>
                <el-input v-model="form.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="年龄：" prop="age" :rules="validate?$rules.NotEmpty:{}">
                <el-input v-model="form.age" clearable></el-input>
            </el-form-item>
            <el-form-item label="爱好：" prop="favourites" :rules="validate?$rules.NotEmpty:{}">
                <el-select v-model="form.favourites" clearable placeholder="请选择爱好">
                    <el-option label="足球" value="football"></el-option>
                    <el-option label="篮球" value="basketball"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="" @click="save('personForm')">暂存</el-button>
                <el-button type="primary" @click="submit('personForm')">提交</el-button>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <table class="tableForm" border="1" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td>
                    <div slot="label">
                        <span style="color: #F56C6C;font-size: 12px">*</span>
                        姓名
                    </div>
                </td>
                <td>
                    <el-input v-model="form.name" name="name" clearable v-validate="'required'"></el-input>
                </td>
                <td>
                    <div slot="label">
                        <span style="color: #F56C6C;font-size: 12px">*</span>
                        年龄
                    </div>
                </td>
                <td>
                    <el-input v-model="form.age" clearable></el-input>
                </td>
            </tr>
        </table>
        <g-split-l></g-split-l>
        <el-button type="primary" @click="submitTableForm('tableForm')">提交</el-button>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-12 11:38
     */

    export default {
        name: "FormRules",
        data() {
            return {
                form: {
                    name: '',
                    age: '',
                    favourites: ''
                },
                validate: false
            }
        },
        methods: {
            save(formName) {
                let vm = this;
                vm.validate = false;
                vm.$refs[formName].clearValidate();
                vm.$message.success("save success");
            },
            submit(formName) {
                let vm = this;
                vm.validate = true;
                vm.$nextTick(() => {
                    if (vm.validateRules(formName, vm)) {
                        vm.$message.success("submit success");
                    }
                })

            },
            submitTableForm() {
                let vm = this;
                vm.$validator.validateAll().then((result) => {
                    if (result) {
                        console.log("pass");
                    } else {
                        vm.$message({
                            type: 'error',
                            message: "验证不通过",
                        });
                    }
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
    .FormRules {
        @include content-box;

        .tableForm {
            width: 800px;
            border: 1px solid #eee;

            tr {
                td:nth-child(odd) {
                    width: 15%;
                    color: #606266;
                    text-align: right;
                    padding-right: 10px;
                }

                td:nth-child(even) {
                    width: 30%;
                    padding: 0 10px;
                }
            }

            td {
                height: 38px;
                line-height: 38px;
                border: 1px solid #eee;
            }
        }
    }
</style>
