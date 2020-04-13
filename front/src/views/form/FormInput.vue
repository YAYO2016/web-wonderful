<template>
    <div class='FormInput'>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="输入建议：" class="fl">
                <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="form.name"
                        clearable
                        :fetch-suggestions="(queryString, cb)=>{querySearch(queryString, cb)}"
                        placeholder="请输入内容,可模糊查询"
                        @clear="()=>{
                            form.name = '';
                            form.code = '';
                        }"
                        @select="(item)=>{
                            if(item.name === '查无数据'){
                                return;
                            }
                            form.name = item.name;
                            form.code = item.code;
                        }"
                >
                    <!--loadAll 这里的loadAll可以通过接口去获取数据-->
                    <template slot-scope="{ item }">
                        <div class="name" disabled :style="item.name==='查无数据'?'text-align:center':''">{{ item.name }}
                        </div>
                        <span class="addr">{{ item.code }}</span>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item label="输入建议（加长宽度）：" class="fl" label-width="200px">
                <!--autocomplete-popper 样式强制修改了下拉框的宽度-->
                <el-autocomplete
                        popper-class="autocomplete-popper my-autocomplete"
                        v-model="form.name"
                        clearable
                        :fetch-suggestions="(queryString, cb)=>{querySearch(queryString, cb)}"
                        placeholder="请输入内容"
                        @select="(item)=>{
                            form.name = item.name;
                            form.code = item.code;
                        }"
                >
                    <!--loadAll 这里的loadAll可以通过接口去获取数据-->
                    <template slot-scope="{ item }">
                        <div class="name">{{ item.name }}</div>
                        <span class="addr">{{ item.code }}</span>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="多选（全选）：" label-width="150px">
                <el-select v-model="form.multiSelectData" placeholder="请选择"
                           multiple
                           clearable
                           collapse-tags
                >
                    <!--
                        collapse-tags	多选时是否将选中值按文字的形式展示
                    -->
                    <g-all-checkbox :selectData.sync="form.multiSelectData" :options="optionsList"></g-all-checkbox>
                    <!--<el-checkbox v-model="form.checked" @change='selectAll(form.multiSelectData,optionsList)'>全选</el-checkbox>-->
                    <el-option
                            v-for="item in optionsList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <!--obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符-->
            <!--obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字-->
            <!--obj.value = obj.value.replace(/\.{2,}/g,""); //只保留第一个, 清除多余的-->
            <!--obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");-->
            <!--obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); //只能输入两个小数-->
            <el-form-item label="输入数字：" class="fl">
                <el-input style="width:250px"
                          type="number"
                          clearable
                          oninput="value=/^\d*(?:\.\d{0,})?$/.test(value)?value:''"
                          v-model="form.number"
                          placeholder="请输入数字">
                    <!--oninput="value=value.replace(/[^\d.]/g,'')"-->
                </el-input>
            </el-form-item>
            <el-form-item label="输入数字：" class="fl">
                <el-input style="width:250px"
                          type="number"
                          oninput="value=value.replace(/\D|^0/g,'')"
                          v-model="form.numberMore"
                          placeholder="请输入数字（大于0）">

                </el-input>
            </el-form-item>
            <el-form-item label="输入金额：" class="fl">
                <el-input style="width:250px"
                          type="number"
                          oninput="value=value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                          v-model="form.money"
                          placeholder="请输入金额(小数点只能2位)">

                </el-input>
            </el-form-item>
            <el-form-item label="计数器：" class="fl">
                <el-input-number
                        type="number"
                        v-model="form.number"
                        placeholder="请输入">
                </el-input-number>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="数字1：" class="fl">
                <el-input style="width:250px"
                          oninput="value=value.replace(/[^\d.]/g,'')"
                          v-model="form.sum1"
                          placeholder="请输入数字">

                </el-input>
            </el-form-item>
            <el-form-item label="" class="fl" label-width="20px">
                <el-select v-model="form.calcUse" style="width: 80px">
                    <el-option label="+" value="add"></el-option>
                    <el-option label="-" value="subtract"></el-option>
                    <el-option label="*" value="multiply"></el-option>
                    <el-option label="/" value="divide"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数字2：" class="fl">
                <el-input style="width:250px"
                          oninput="value=value.replace(/[^\d.]/g,'')"
                          v-model="form.sum2"
                          placeholder="请输入数字">
                </el-input>
            </el-form-item>
            <el-form-item label="" class="fl">
                <el-button type="primary" @click="calc">计算(防止精度丢失的mathjs)</el-button>
            </el-form-item>
            <el-form-item label="结果：" class="fl">
                <el-input style="width:250px"
                          readonly
                          v-model="form.result"
                          placeholder="">
                </el-input>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <!--上传文件-->
            <el-form-item label="文件上传：" class="fl">
                <!--https://jsonplaceholder.typicode.com/posts/-->
                <g-upload-file
                        :file-list="form.fileList"
                ></g-upload-file>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="地区选择：" class="fl area-select">
                <!--<v-distpicker :province="form.province" :city="form.city" :area="form.area" size="mini"></v-distpicker>-->
                <!--g-areaSelect 自定义地区组件的使用-->
                <g-areaSelect :area="form.area" @change="(val)=>{form.area=val}" :width="'220px'"></g-areaSelect>
            </el-form-item>
            <div class="clearfix"></div>
            <el-divider></el-divider>
            <el-form-item label="评分：" class="fl">
                <!--
                    max最大分值
                    low-threshold 低分和中等分数的界限值，值本身被划分在低分中
                    high-threshold 高分和中等分数的界限值，值本身被划分在高分中
                    -->
                <el-rate class="mt5" v-model="form.rate" :max="9" :low-threshold="3" :high-threshold="6"
                         :colors="['#f56c6c', '#e6a23c', '#5cbb7a']"
                ></el-rate>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="switch开关：" class="fl">
                <el-switch
                        class="switchStyle"
                        v-model="form.switch"
                        active-color="#13ce66"
                        active-text="是"
                        inactive-color="#ff4949"
                        inactive-text="否"
                        :active-value="1"
                        :inactive-value="0"
                        active-icon-class="el-icon-check"
                >
                    <!--
                        active-icon-class switch 打开时所显示图标的类名，设置此项会忽略 active-text
                    -->
                </el-switch>
                <g-split-v :width="'60px'"></g-split-v>
                <el-switch
                        v-model="form.switch"
                        active-color="#13ce66"
                        active-text="是"
                        inactive-color="#ff4949"
                        inactive-text="否"
                        :active-value="1"
                        :inactive-value="0"
                        active-icon-class="el-icon-check"
                >
                    <!--
                        active-icon-class switch 打开时所显示图标的类名，设置此项会忽略 active-text
                    -->
                </el-switch>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="进度条:">
                <div>
                    <i v-for="i in 5"
                       :class="`iconfont ${i<=form.processRate?'icon-changfangxing-fill':'icon-changfangxing-empty'}`">
                    </i>
                    <!--<i class="iconfont icon-changfangxing-empty"></i>-->
                </div>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="步骤条:">
                <g-steps
                        :allsteps="allsteps"
                ></g-steps>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-16 19:29
     */

    export default {
        name: "FormInput",
        mounted() {
            let vm = this;
            vm.restaurants = vm.loadAll();
        },
        data() {
            return {
                form: {
                    name: '',
                    multiSelectData: [],
                    code: '',
                    number: '',
                    numberMore: '',
                    money: '',
                    sum1: '',
                    calcUse: 'add',
                    sum2: '',
                    result: '',
                    fileList: [
                        //{
                        //    name: 'food.jpeg',
                        //    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        //}, {
                        //    name: 'food2.jpeg',
                        //    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                        //}
                    ],
                    area: '150524',  //地区码
                    rate: 3,
                    switch: 0,
                    checked: false,
                    processRate: 4,
                },
                videoUploadPercent: 0,
                videoFlag: false,
                restaurants: [],

                optionsList: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                //步骤条数据
                allsteps: [
                    {title: "会议创建", desc: ""},
                    {title: "信息护卫", desc: ""},
                    {title: "会议召开", desc: "", active:true},
                    {title: "资料归档", desc: ""},
                    {title: "后续事项跟进", desc: ""},
                    {title: "完成", desc: ""},
                ]
            }
        },
        methods: {
            createFilter(queryString) {
                return (restaurant) => {
                    console.log(queryString);
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //后台加载数据
            loadAll() {
                return [
                    {"name": "三全鲜食（北新泾店）", "code": "长宁区新渔路144号"},
                    {"name": "Hot honey 首尔炸鸡（仙霞路）", "code": "上海市长宁区淞虹路661号"},
                    {"name": "新旺角茶餐厅", "code": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
                    {"name": "泷千家(天山西路店)", "code": "天山西路438号"},
                    {"name": "胖仙女纸杯蛋糕（上海凌空店）", "code": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
                    {"name": "贡茶", "code": "上海市长宁区金钟路633号"},
                    {"name": "豪大大香鸡排超级奶爸", "code": "上海市嘉定区曹安公路曹安路1685号"},
                    {"name": "茶芝兰（奶茶，手抓饼）", "code": "上海市普陀区同普路1435号"},
                    {"name": "十二泷町", "code": "上海市北翟路1444弄81号B幢-107"},
                    {"name": "星移浓缩咖啡", "code": "上海市嘉定区新郁路817号"},
                    {"name": "阿姨奶茶/豪大大", "code": "嘉定区曹安路1611号"},
                    {"name": "新麦甜四季甜品炸鸡", "code": "嘉定区曹安公路2383弄55号"},
                    {"name": "Monica摩托主题咖啡店", "code": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"},
                    {"name": "浮生若茶（凌空soho店）", "code": "上海长宁区金钟路968号9号楼地下一层"},
                    {"name": "NONO JUICE  鲜榨果汁", "code": "上海市长宁区天山西路119号"},
                    {"name": "CoCo都可(北新泾店）", "code": "上海市长宁区仙霞西路"},
                    {"name": "快乐柠檬（神州智慧店）", "code": "上海市长宁区天山西路567号1层R117号店铺"},
                    {"name": "Merci Paul cafe", "code": "上海市普陀区光复西路丹巴路28弄6号楼819"},
                    {"name": "猫山王（西郊百联店）", "code": "上海市长宁区仙霞西路88号第一层G05-F01-1-306"},
                    {"name": "枪会山", "code": "上海市普陀区棕榈路"},
                    {"name": "纵食", "code": "元丰天山花园(东门) 双流路267号"},
                    {"name": "钱记", "code": "上海市长宁区天山西路"},
                    {"name": "壹杯加", "code": "上海市长宁区通协路"},
                    {"name": "唦哇嘀咖", "code": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"},
                    {"name": "爱茜茜里(西郊百联)", "code": "长宁区仙霞西路88号1305室"},
                    {"name": "爱茜茜里(近铁广场)", "code": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"},
                    {"name": "鲜果榨汁（金沙江路和美广店）", "code": "普陀区金沙江路2239号金沙和美广场B1-10-6"},
                    {"name": "开心丽果（缤谷店）", "code": "上海市长宁区威宁路天山路341号"},
                    {"name": "超级鸡车（丰庄路店）", "code": "上海市嘉定区丰庄路240号"},
                    {"name": "妙生活果园（北新泾店）", "code": "长宁区新渔路144号"},
                    {"name": "香宜度麻辣香锅", "code": "长宁区淞虹路148号"},
                    {"name": "凡仔汉堡（老真北路店）", "code": "上海市普陀区老真北路160号"},
                    {"name": "港式小铺", "code": "上海市长宁区金钟路968号15楼15-105室"},
                    {"name": "蜀香源麻辣香锅（剑河路店）", "code": "剑河路443-1"},
                    {"name": "北京饺子馆", "code": "长宁区北新泾街道天山西路490-1号"},
                    {"name": "饭典*新简餐（凌空SOHO店）", "code": "上海市长宁区金钟路968号9号楼地下一层9-83室"},
                    {"name": "焦耳·川式快餐（金钟路店）", "code": "上海市金钟路633号地下一层甲部"},
                    {"name": "动力鸡车", "code": "长宁区仙霞西路299弄3号101B"},
                    {"name": "浏阳蒸菜", "code": "天山西路430号"},
                    {"name": "四海游龙（天山西路店）", "code": "上海市长宁区天山西路"},
                    {"name": "樱花食堂（凌空店）", "code": "上海市长宁区金钟路968号15楼15-105室"},
                    {"name": "壹分米客家传统调制米粉(天山店)", "code": "天山西路428号"},
                    {"name": "福荣祥烧腊（平溪路店）", "code": "上海市长宁区协和路福泉路255弄57-73号"},
                    {"name": "速记黄焖鸡米饭", "code": "上海市长宁区北新泾街道金钟路180号1层01号摊位"},
                    {"name": "红辣椒麻辣烫", "code": "上海市长宁区天山西路492号"},
                    {"name": "(小杨生煎)西郊百联餐厅", "code": "长宁区仙霞西路88号百联2楼"},
                    {"name": "阳阳麻辣烫", "code": "天山西路389号"},
                    {"name": "南拳妈妈龙虾盖浇饭", "code": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
                ];
            },
            querySearch(queryString, cb) {
                let vm = this;
                let restaurants = vm.restaurants;
                let results = queryString ? restaurants.filter(vm.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results.length > 0 ? results : [{name: "查无数据"}]);
            },
            //计算
            calc() {
                let vm = this;
                switch (vm.form.calcUse) {
                    case "add":
                        //return vm.form.result = vm.$mathjs.add(vm.form.sum1, vm.form.sum2);  //加
                        return vm.form.result = vm.$mathjs.number(vm.$mathjs.evaluate(`${vm.form.sum1}+${vm.form.sum2}`));
                    case "subtract":
                        //return vm.form .result = vm.$mathjs.subtract(vm.form.sum1, vm.form.sum2); //减
                        return vm.form.result = vm.$mathjs.number(vm.$mathjs.evaluate(`${vm.form.sum1}-${vm.form.sum2}`));
                    case "multiply":
                        //return vm.form.result = vm.$mathjs.multiply(vm.form.sum1, vm.form.sum2); //乘
                        return vm.form.result = vm.$mathjs.number(vm.$mathjs.evaluate(`${vm.form.sum1}*${vm.form.sum2}`));
                    case "divide":
                        //return vm.form.result = vm.$mathjs.divide(vm.form.sum1, vm.form.sum2);  //除
                        return vm.form.result = vm.$mathjs.number(vm.$mathjs.evaluate(`${vm.form.sum1}/${vm.form.sum2}`));
                }
            },
            beforeUpload(file, fileList) {
                let vm = this;
                fileList.push({...file});
            },
            //上传文件
            uploadFile(file, fileList) {
                let vm = this;
                let FormData = new FormData();
                FormData.append('file', file);
                vm.$api.uploadFile(FormData, progress => {
                    vm.showProgress(file, progress, fileList);
                })
            },
            showProgress(file, progress, fileList) {
                let vm = this;
                vm.$set(fileList.filter(_file => _file.uid === file.uid)[0], "progress", progress);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            process(event, file, fileList) {
                this.videoFlag = true;
                //console.log(file.percentage);
                this.videoUploadPercent = parseFloat(file.percentage).toFixed(0);
            },
            check(value) {
                let vm = this;
                console.log(value);
                console.log(vm.$util.TypeFn.checkStr(value, 'money'));
                if (vm.$util.TypeFn.checkStr(value, 'money')) {
                    return value;
                } else {
                    return "";
                }
            },
        }
    }
</script>

<style lang='scss' scoped>
    .FormInput {
        @include content-box;

        .area-select {
            .divwrap {
                height: 400px;
                overflow-y: auto;
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
            }

            .divwrap > > > .distpicker-address-wrapper {
                color: #999;
            }

            .divwrap > > > .address-header {
                position: fixed;
                bottom: 400px;
                width: 100%;
                background: #000;
                color: #fff;
            }

            .divwrap > > > .address-header ul li {
                flex-grow: 1;
                text-align: center;
            }

            .divwrap > > > .address-header .active {
                color: #fff;
                border-bottom: #666 solid 8px
            }

            .divwrap > > > .address-container .active {
                color: #000;
            }
        }

    }
</style>
