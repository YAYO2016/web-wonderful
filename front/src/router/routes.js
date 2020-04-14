/**
 * Created by yanyue on 2020/3/15 16:41
 */
const Layout = () => import('@/views/layout/Layout');
//const NoFound = () => import('@/views/error-pages/404NoFound1');
const NoFound = () => import('@/views/error-pages/404NoFound2');
/**
 * hidden: true                   如果hidden为true则在左侧菜单栏不展示
 * name:'router-name'             路由名称，必须填写
 * meta : {
    title: 'title'               对应路由在左侧菜单栏的标题名称
    icon: 'icon-class'           对应路由在左侧菜单栏的图标样式，样式使用fontawesome图标库
    roles:[xxx,xxx]              可以访问该路由的用户权限，没有该属性的话就是谁都可以访问
  }
 **/

export const constantRoutes = [
    //重定向路由必须放在第一位
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',  //*代表匹配0个或者多个路由
                component: () => import('@/views/redirect/Redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/Login'),
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/register/Register'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/Home'),
                name: 'Home',
                meta: {title: '首页', icon: 'el-icon-s-home'}
            }
        ]
    },
    //404错误页面
    {
        path: '/404',
        name: 'noFound',
        component: NoFound,
    },
];

export const asyncRoutes = [

    {
        path: '/video',
        component: Layout,
        name: 'Video',
        redirect: '/video/videoManage',
        meta: {title: '视频', icon: 'fa fa-video-camera', roles: ["editor", "admin"]},
        children: [
            {
                path: '/video/videoManage',
                component: () => import('@/views/videoManage/VideoManage'),
                name: 'VideoManage',
                meta: {title: '视频管理', icon: 'fa fa-video-camera', roles: ["editor", "admin"]}
            },
            {
                path: '/video/videoPlay',
                component: () => import('@/views/videoManage/VideoPlay'),
                name: 'VideoPlay',
                meta: {title: '视频播放', icon: 'fa fa-video-camera', roles: ["editor", "admin"]}
            }
        ]
    },
    {
        path: '/book',
        component: Layout,
        name: 'Book',
        redirect: '/book/createbook',
        meta: {title: '图书管理', icon: 'fa fa-book', roles: ["editor", "admin"]},
        children: [
            {
                path: '/book/createbook',
                component: () => import('@/views/book/CreateBook'),
                name: 'CreateBook',
                meta: {title: '上传图书', icon: 'fa fa-upload', roles: ["editor", "admin"]}
            },
            {
                path: '/book/editbook',
                component: () => import('@/views/book/EditBook'),
                hidden: true,
                name: 'EditBook',
                meta: {title: '编辑图书', icon: 'el-icon-edit', roles: ["editor", "admin"]}
            },
            {
                path: '/book/booklist',
                component: () => import('@/views/book/BookList'),
                name: 'BookList',
                meta: {title: '图书列表', icon: 'fa fa-list', roles: ["editor", "admin"]}
            },


        ]
    },
    {
        path: '/bank',
        component: Layout,
        name: 'Bank',
        redirect: '/bank/banklist',
        meta: {title: '银行', icon: 'fa fa-university', roles: ["editor", "admin"]},
        children: [
            {
                path: '/bank/banklist',
                component: () => import('@/views/bank/BankList'),
                name: 'BankList',
                meta: {title: '银行列表', icon: 'fa fa-university', roles: ["editor", "admin"]}
            },
        ]
    },
    {
        path: '/form', name: 'form',
        redirect: '/form/forminput',
        meta: {title: '表单类型', icon: 'fa fa-wpforms'},
        show: true,
        component: Layout,
        children: [
            {
                path: '/form/forminput',
                name: 'forminput',
                meta: {title: '表单输入', icon: 'fa  fa-pencil-square-o'},
                component: () => import('@/views/form/FormInput'),
            },
            {
                path: '/form/formdate',
                name: 'formdate',
                meta: {title: '日期格式输入', icon: 'fa fa-calendar'},
                component: () => import('@/views/form/FormDate'),
            },
            {
                path: '/form/formtable',
                name: 'formtable',
                meta: {title: '表格', icon: 'fa fa-table'},
                component: () => import('@/views/form/FormTable'),
            },
            {
                path: '/form/formrules',
                name: 'formrules',
                meta: {title: '表单校验', icon: 'fa fa-wpforms'},
                component: () => import('@/views/form/FormRules'),
            },
            {
                path: '/form/calendar',
                name: 'Calendar',
                meta: {title: '高级日历', icon: 'fa fa-calendar'},
                component: () => import('@/views/form/FormCalendar'),
            },
            {
                path: '/form/calendar2',
                name: 'Calendar2',
                meta: {title: '高级日历2', icon: 'fa fa-calendar'},
                component: () => import('@/views/form/FormCalendar2'),
            },
            {
                path: '/form/mycalendar',
                name: 'MyCalendar',
                meta: {title: '自定义日历', icon: 'fa fa-calendar'},
                component: () => import('@/views/form/MyCalendar'),
            },
            {
                path: '/form/tree',
                name: 'FormTree',
                meta: {title: '树形控件', icon: 'fa fa-tree'},
                component: () => import('@/views/form/FormTree'),
            },

        ]
    },
    {
        path: '/echarts', name: 'echarts',
        redirect: '/echarts/line',
        meta: {title: 'echarts图', icon: 'el-icon-s-marketing'},
        show: true,
        component: Layout,
        children: [
            {
                path: '/echarts/line',
                name: 'LineEcharts',
                meta: {title: '折线图', icon: 'el-icon-picture-outline'},
                component: () => import('@/views/echarts/LineEcharts'),
            },
            {
                path: '/echarts/radar',
                name: 'RadarEcharts',
                meta: {title: '雷达图', icon: 'el-icon-picture-outline'},
                component: () => import('@/views/echarts/RadarEcharts'),
            },
        ]
    },
    {
        path: '/user',
        component: Layout,
        name: 'User',
        redirect: '/user/userManage',
        children: [
            {
                path: '/user/userManage',
                component: () => import('@/views/userManage/UserManage'),
                name: 'UserManage',
                meta: {title: '用户管理', icon: 'el-icon-s-custom', roles: ["admin"]}
            }
        ]
    },

    // 404一定要放到最后面，不然会被之前的拦截掉
    {path: '*', redirect: '/404', hidden: true}


];
