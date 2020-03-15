import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入normalize.css：Normalize的作用就是统一浏览器的初始样式
import 'normalize.css'

//安装使用elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入babel-polyfill，解决ie9和一些低版本的高级浏览器对es6新语法并不支持
import "babel-polyfill";

//导入api接口
import api from './api/index';
Vue.prototype.$api = api;


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
