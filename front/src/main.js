import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入normalize.css：Normalize的作用就是统一浏览器的初始样式
//import 'normalize.css'
import "@/common/style/reset.scss"

//安装使用elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//设置elementUI的全局size
Vue.prototype.$ELEMENT = {size: 'small'};

//导入babel-polyfill，解决ie9和一些低版本的高级浏览器对es6新语法并不支持
import "babel-polyfill";

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
