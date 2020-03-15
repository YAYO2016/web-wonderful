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
npm element-ui -S

安装babel-polyfill
npm i babel-polyfill -S
解决ie9和一些低版本的高级浏览器对es6新语法并不支持

安装axios
npm i axios@0.18.0 -S
发送ajax请求使用


