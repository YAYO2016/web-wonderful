<template>
    <div class='CreateBook'>
        <el-row :gutter="10" class="m10">
            <el-col :span="24" align="right">
                <el-button type="primary" @click="submitBook('postForm')">新增图书</el-button>
            </el-col>
        </el-row>
        <div class="tips">
            上传电子书分为两步：上传电子书和新增电子书。首先需要上传epub电子书文件，服务器会对epub文件进行解析，解析成功后会将电子书的各字段填入表单，之后我们只需要手动点击新增电子书即可完成电子书的保存。查看<!--
            --><a href="https://www.youbaobao.xyz/admin-docs/" target="_blank">课程官网</a>获取更多开发指引。
        </div>
        <g-split></g-split>
        <el-row :gutter="10">
            <el-col :span="24" align="center">
                <UploadBooks :fileList="fileList"
                             @onSuccess="onUploadSuccess"
                             @onError="onUploadError"
                             @onRemove="onUploadRemove"
                ></UploadBooks>
            </el-col>
        </el-row>
        <g-split></g-split>
        <el-row :gutter="10">
            <el-col :span="24">
                <el-form ref="postForm" :model="postForm" label-width="120px">
                    <el-form-item prop="title" label="书名:" :rules="$rules.NotEmpty">
                        <el-input v-model="postForm.title" :maxlength="100" placeholder="书名"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="作者：" prop="author" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.author" placeholder="作者"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="出版社：" prop="title" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.publisher" placeholder="出版社"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="语言：" prop="language" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.language" placeholder="语言"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="根文件：" prop="rootFile" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.rootFile" placeholder="根文件" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="文件路径：" prop="filePath" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.filePath" placeholder="文件路径" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="解压路径：" prop="unzipPath" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.unzipPath" placeholder="解压路径" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="封面路径：" prop="cover" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.cover" placeholder="封面路径" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="文件名称：" prop="originalname" :rules="$rules.NotEmpty">
                                <el-input v-model="postForm.originalname" placeholder="文件名称" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="封面：" prop="cover" :rules="$rules.NotEmpty">
                                <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
                                    <img :src="postForm.cover" class="preview-img">
                                </a>
                                <span v-else>无</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="目录：" prop="contents" :rules="$rules.NotEmpty">
                                <div v-if="postForm.contents && postForm.contents.length > 0" class="contents-wrapper">
                                    <el-tree :data="postForm.contents" :props="{
                                        children: 'children',
                                        label: 'title'
                                    }" @node-click="handleNodeClick"></el-tree>
                                </div>
                                <span v-else>无</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2020/3/25 20:35
     */
    import UploadBooks from "./components/UploadBooks"

    export default {
        name: "CreateBook",
        components: {UploadBooks},
        data() {
            return {
                fileList: [],
                postForm: this.initPostForm(),

            }
        },
        methods: {
            initPostForm() {
                return {
                    title: "",
                    author: "",
                    publisher: "",
                    url: "",
                    contents: "",
                    fileName: "",
                    filePath: "",
                    unzipPath: "",
                    cover: "",
                    coverPath: "",
                    language: "",
                    unzipUrl: "",
                    originalname: "",
                    rootFile: "",
                }
            },
            onUploadSuccess(data) {
                let vm = this;
                vm.setData(data);
            },
            setData(data) {
                let vm = this;
                const {
                    title,
                    author,
                    publisher,
                    url,
                    contents,
                    fileName,
                    filePath,
                    unzipPath,
                    cover,
                    coverPath,
                    language,
                    unzipUrl,
                    originalname,
                    rootFile,
                } = data;
                vm.postForm = {
                    ...vm.postForm,
                    title,
                    author,
                    publisher,
                    url,
                    contents,
                    fileName,
                    filePath,
                    unzipPath,
                    cover,
                    coverPath,
                    language,
                    unzipUrl,
                    originalname,
                    rootFile,
                }
            },
            handleNodeClick(data) {
                if (data.text) {
                    window.open(data.text);
                }
            },
            //清空上传图书
            onUploadRemove() {
                let vm = this;
                vm.postForm = vm.initPostForm();
            },
            onUploadError() {

            },
            submitBook(formName) {
                let vm = this;
                if (vm.validateRules(formName, vm)) {
                    //浅拷贝Book
                    let book = {...vm.postForm};
                    delete book.contents;
                    vm.$api.createBook(book).then(res => {
                        vm.$message.success("上传图书成功");
                    })
                }
            }
        }
    }
</script>

<style lang='scss' scoped>
    .CreateBook {
        @include content-box;

        .preview-img {
            width: 200px;
            height: 270px;
        }

        .tips {
            background: #ebeff5;
            border-radius: 10px;
            line-height: 30px;
            padding: 10px;

            a {
                color: #2099f8;
                padding: 0 5px;
            }
        }
    }
</style>
