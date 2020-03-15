/**
 * Created by yanyue on 2020/3/15 16:41
 */
const Layout = () => import('@/views/layout/Layout');
const NoFound = () => import('@/views/error-pages/404NoFound');
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
    {
        path: '/login',
        component: () => import('@/views/login/Login'),
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
        children: [
            {
                path: '/video/videoManage',
                component: () => import('@/views/videoManage/VideoManage'),
                name: 'VideoManage',
                meta: {title: '视频管理', icon: 'fa fa-video-camera',roles:["editor","admin"]}
            }
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
                meta: {title: '用户管理', icon: 'el-icon-s-custom',roles:["admin"]}
            }
        ]
    },

    // 404一定要放到最后面，不然会被之前的拦截掉
    { path: '*', redirect: '/404', hidden: true }


];
