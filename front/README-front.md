全局安装 npm install -g @vue/cli 或 yarn global add @vue/cli
查看版本/是否安装成功 vue -V

创建项目
vue create server
按键盘上下键可以选择默认（default）还是手动（Manually），如果选择default，一路回车执行下去就行了

选择配置，看个人项目需求
注意，空格键是选中与取消，A键是全选
TypeScript 支持使用 TypeScript 书写源码
Progressive Web App (PWA) Support PWA 支持。
Router 支持 vue-router 。
Vuex 支持 vuex 。
CSS Pre-processors 支持 CSS 预处理器。
Linter / Formatter 支持代码风格检查和格式化。
Unit Testing 支持单元测试。
E2E Testing 支持 E2E 测试。

css的预处理，我选择的是sass

ESLint + Prettier：都不要

配置文件存放地方
第一个是独立文件夹位置（选择），第二个是在package.json文件里

询问是否记录这一次的配置，以便下次使用，如一开始的时候会显示的vuecli3配置

npm run serve 启动项目

查看：http://localhost:8080/ 

安装normalize.css
npm install --save normalize.css
Normalize.css是一个小的CSS文件，它在HTML元素的默认样式中提供了更好的跨浏览器一致性。这是一个现代化的，HTML5就绪的，可以替代传统的CSS重置。

安装elementUI
npm i element-ui -S

安装babel-polyfill
npm i babel-polyfill -S
解决ie9和一些低版本的高级浏览器对es6新语法并不支持

安装axios
npm i axios@0.18.0 -S
发送ajax请求使用

安装vue-fragment，就是一个便签占位符，但是在页面中却不显示
npm i -s vue-fragment
import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

时间日期常用工具类
npm i  moment -S

cookies工具类
npm i  js-cookie -S

安装vuex-persistedstate
npm install --save vuex-persistedstate
vuex的数据持久化

icon图标工具包
npm i less less-loader css-loader style-loader file-loader -D
npm i font-awesome -S

screenfull 实现网页全屏
npm i screenfull@4.2.0 -S

安装echarts
npm i  echarts -S

安装mathjs：//js的计算库，可以避免精度丢失
npm i mathjs -S

安装npm install --save nprogress
路由跳转进度条

安装地区选择器（省市区）
npm install v-distpicker --save

安装高级日历组件
npm i vue-full-calendar -S
还需要安装jquery才可以使用
npm i jquery -S
需要安装moment组件
npm i moment -S

安装concurrently，可以同时执行多个脚本
npm i concurrently -S

npm install --save @fullcalendar/core @fullcalendar/daygrid
npm install @fullcalendar/core @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/list

npm i vee-validate@2.0.0-rc.25 -S

