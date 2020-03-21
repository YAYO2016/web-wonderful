<template>
    <div class='UploadFile'>
        <div v-if="fileList.length === 0">
            <el-upload
                    class="upload-demo"
                    action=""
                    :auto-upload="true"
                    :accept="acceptType"
                    :before-upload="(file)=>beforeUpload(file,fileList)"
                    :http-request="httpRequest"
                    :show-file-list="false"
                    :data="{fileList}">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">{{fileUploadText}}}，且不超过{{fileMaxSize}}M</div>
            </el-upload>
        </div>
        <div v-else>
            <ul>
                <li v-for="(item,index) in fileList" :key="index">
                    <div>
                        <span class="num">{{index+1}}.</span>
                        <span class="file-name">{{item.fileName}}</span>
                        <span class="progress">
                            <el-progress
                                    v-if="item.progress"
                                    :percentage="item.progress"
                                    style="width: 200px;display: inline-block"
                            >
                            </el-progress>
                        </span>
                        <span class="buttons">
                            <el-button>下载</el-button>
                            <el-button>删除</el-button>
                        </span>
                        <span class="finish-time">
                            上传完成 上传于{{item.uploadTime}}
                        </span>
                    </div>
                </li>
                <el-upload
                        class="uploaded-demo"
                        action=""
                        :auto-upload="true"
                        :accept="acceptType"
                        :before-upload="(file)=>beforeUpload(file,fileList)"
                        :http-request="httpRequest"
                        :show-file-list="false"
                        :data="{fileList}">
                    <el-button size="small" type="primary">继续添加</el-button>
                    <div slot="tip" class="el-upload__tip">{{fileUploadText}}}，且不超过{{fileMaxSize}}M</div>
                </el-upload>
            </ul>
        </div>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-25 17:30
     */

    export default {
        name: "UploadFile",
        data() {
            return {}
        },
        props: {
            fileList: {
                type: Array,
                default: []
            },
            acceptType: {
                type: String,
                default: "*"
            },
            fileMaxSize: {
                type: Number,
                default: 50
            },
            fileUploadText: {
                type: String,
                default: "支持PDF\\HRML\\WORD\\EXCEL等格式"
            }
        },
        methods: {
            beforeUpload(file, fileList) {
               let vm = this;
               const isLtMax = file.size/1024/1024 <vm.fileMaxSize;
               const regexFlag = /(^((?![\\/:*?“<>|`!@#$%&()]).)*$)/.test(file.name);
               if(!isLtMax){
                   vm.$messgae.error(`上传文件不能超过${vm.fileMaxSize}MB`)
                   return ;
               }
               if(!regexFlag){
                   vm.$messgae.error("附件名称不能包含特殊字符");
                   return ;
               }
               if(isLtMax && regexFlag){
                   fileList.push({...file})
               }
               return isLtMax && regexFlag;
            },
            httpRequest(e) {
                let vm = this;
                let file = e.file;
                let formData = new FormData();
                formData.append("file",file);
                let index = e.data.fileList.length -1;
                vm.$api.uploadFileApi(formData,progress=>{
                    vm.showProgress(file,progress,e.data.fileList);
                }).then(res=>{
                    e.data.fileList[index] = {...res.data.data,progress:100};
                    vm.$forceUpdate();
                })
            }
        }

    }
</script>

<style lang='scss' scoped>
    .UploadFile {

    }
</style>
