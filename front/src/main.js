import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入normalize.css：Normalize的作用就是统一浏览器的初始样式
//import 'normalize.css'
import "@/common/style/reset.css"
//引入外部iconfont
import "@/common/iconfont/iconfont.css"

//导入全局的路由守卫
import "./permission.js";

//安装使用elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//修改elementUI的默认样式
// import './element-var.scss';
Vue.use(ElementUI);
//设置elementUI的全局size
Vue.prototype.$ELEMENT = {size: 'mini'};

//导入babel-polyfill，解决ie9和一些低版本的高级浏览器对es6新语法并不支持
import "babel-polyfill";

//地区组件（省市区）
//import VDistpicker from 'v-distpicker'
//Vue.component('v-distpicker', VDistpicker)


//导入api接口
import api from './api/index';
Vue.prototype.$api = api;

//import Fragment from 'vue-fragment';
//Vue.use(Fragment.Plugin);

//导入工具类util
import util from './common/js/util';
Vue.prototype.$util = util;

//在Vue对象上全局注册一些自定义方法
import backbase from './common/js/backbase';
Vue.use(backbase);

//导入自定义校验数据
import rules from './common/js/rules';
Vue.prototype.$rules = rules;

//导入font-awesome
import 'font-awesome/css/font-awesome.min.css'

//引入全局的moment
import moment from 'moment'
//使用中文moment
import 'moment/locale/zh-cn'
Object.defineProperty(Vue.prototype, '$moment', { value: moment });
//使用this.$moment().format('HH:mm')

//注意，这里没有意义，因为mixins是在组件创建之前就需要的，这里作为全局变量传入，一开始是获取不到的
//import mixins from './common/js/mixins';
//Vue.mixin(Mixin);
//Vue.prototype.$mixins = mixins;

//js的计算库，可以避免精度丢失
import { create, all } from 'mathjs';
const mathjs = create(all);
mathjs.config({
  number: 'BigNumber',
  // 'number' (default),
  precision: 20
  //BigNumbers的最大有效位数
});

//引入全局过滤器
import * as filters from './common/js/filter.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//全局使用自定义的UI的组件
import GUI from './components/plugins';
Vue.use(GUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
