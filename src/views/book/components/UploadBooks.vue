<template>
    <div class='UploadBooks'>
        <el-upload
                class="image-upload"
                :action="action"
                :headers="headers"
                :multiple="false"
                :limit="1"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :on-error="onError"
                :on-remove="onRemove"
                :file-list="fileList"
                :on-exceed="onExceed"
                :disabled="disabled"
                drag
                show-file-list
                accept="application/epub+zip"
        >
            <!--drag 支持拖拽-->
            <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" v-if="fileList.length === 0">
                请将电子书拖入或 <em>点击上传</em>
            </div>
            <div class="el-upload__text" v-else>
                图书已上传
            </div>
        </el-upload>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/30 23:02
     */
    import {getToken} from "@/common/js/auth.js"

    export default {
        name: "UploadBooks",
        props: {
            fileList: {
                type: Array,
                default() {
                    return []
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                action: `${process.env.VUE_APP_API_URL}/file/uploadbook`,
            }
        },
        computed: {
            headers() {
                return {
                    Authorization: `Bearer ${getToken()}`
                }
            }
        },
        methods: {
            handlePreview() {

            },
            beforeRemove() {

            },
            onRemove() {
                let vm = this;
                vm.$message.success("电子书删除成功");
                vm.$emit("onRemove");
            },
            onExceed() {
                this.$message({
                    message: "每次只能上传一本电子书",
                    type: "warning"
                })
            },
            beforeUpload(file) {
                this.$emit("beforeUpload", file);
            },
            onError(err) {
                let errMsg = err.message && JSON.parse(err.message);
                this.$message({
                    //&& 的使用
                    //errMsg.msg存在的话就是true那就接着判断后面的，无论怎么样都返回后面的`上传失败，失败原因：${errMsg.msg}`
                    //如果errMsg.msg不存在的话就当是false 那就不用判断后面的了，肯定是false，就返回errMsg.msg
                    message: (errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || "上传失败",
                    type: "error"
                    //a&&b 的使用
                    //a存在的话就是true，那么就要判断b了，结果返回b的值
                    //a不存在的话就是false，那就不用判断了，直接返回a的值

                    //a||b 的使用
                    //a存在的话就是true，后面的不用管了肯定也是返回true了，那么就返回a
                    //a不存在的话就是false，那就要看b了，反正返回的是b的值
                });
                this.$emit("onError", err);
            },
            onSuccess(response, file) {
                let vm = this;
                let {code, message,data} = response;
                if (code === 200) {
                    vm.$message.success(message);
                    vm.$emit("onSuccess", data);
                } else {
                    vm.$message.error(message && `上传失败，失败原因：${message}` || "上传失败");
                    vm.$emit("onError", file);
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .UploadBooks {
        width: 100%;

        /deep/ .el-upload {
            width: 100%;
            .el-upload-dragger{
                width: 100%;
            }
        }
    }
</style>
