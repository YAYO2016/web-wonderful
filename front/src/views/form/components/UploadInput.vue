<template>
    <div class='UploadInput'>
        <div v-for="(item,index) in fileList">
            <el-input v-model="item.fileName" disabled style="width: 175px;"></el-input>
            <el-button-group slot="append">


                <el-upload
                        class="fl"
                        action=""
                        :multiple="false"
                        :limit="1"
                        :auto-upload="true"
                        :accept="acceptType"
                        :before-upload="(file)=>beforeUpload(file,fileList)"
                        :http-request="httpRequest"
                        :show-file-list="false">
                    <el-button type="primary" icon="el-icon-plus"
                               style="border-radius: 0"></el-button>
                </el-upload>
                <!--<el-button type="primary" icon="el-icon-plus"-->
                <!--style="border-bottom-left-radius: 0;border-top-left-radius: 0"></el-button>-->
                <el-button type="primary" icon="el-icon-minus"></el-button>
            </el-button-group>
        </div>

    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/4/13 20:37
     */

    export default {
        name: "UploadInput",
        data() {
            return {
                fileList: this.fileListInit(),
                acceptType: "*",
            }
        },
        methods: {
            fileListInit() {
                return [
                    {fileName: "",}
                ]
            },
            beforeUpload(file, fileList) {
                let vm = this;
                const isLtMax = file.size / 1024 / 1024 < vm.fileMaxSize;
                const regexFlag = /(^((?![\\/:*?“<>|`!@#$%&()]).)*$)/.test(file.name);
                if (!isLtMax) {
                    vm.$messgae.error(`上传文件不能超过${vm.fileMaxSize}MB`)
                    return;
                }
                if (!regexFlag) {
                    vm.$messgae.error("附件名称不能包含特殊字符");
                    return;
                }
                if (isLtMax && regexFlag) {
                    fileList.push({...file})
                }
                return isLtMax && regexFlag;
            },
            httpRequest(e) {
                let vm = this;
                let file = e.file;
                let formData = new FormData();
                formData.append("file", file);
                let index = e.data.fileList.length - 1;
                vm.$api.fileUpload(formData, progress => {
                    vm.showProgress(file, progress, e.data.fileList);
                }).then(res => {
                    e.data.fileList[index] = {...res.data.data, progress: 100};
                    vm.$forceUpdate();
                })
            },
        }
    }
</script>

<style lang='scss' scoped>
    .UploadInput {
        /deep/ .el-input__inner {
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        }

        .el-button {
            padding-left: 6px;
            padding-right: 6px;
        }

    }
</style>
