import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/home'
    }, 
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/table0",
                name: "table0",
                meta: {
                    title: '可视化管理首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Table0.vue")
            },
            {
                path: "/home",
                name: "home",
                meta: {
                    title: '系统首页'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table1",
                name: "table1",
                meta: {
                    title: '数据源管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/Table1.vue")
            }, {
                path: "/table2",
                name: "table2",
                meta: {
                    title: '数据项管理'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/Table2.vue")
            }, {
                path: "/tree",
                name: "stream",
                meta: {
                    title: '信息流模型管理'
                },
                component: () => import ( /* webpackChunkName: "stream" */ "../views/tree.vue")
            }, {
                path: "/tree add",
                name: "tree add",
                meta: {
                    title: '数据源查看树'
                },
                component: () => import ( /* webpackChunkName: "stream" */ "../views/tree add.vue")
            },{
                path: "/tree4",
                name: "tree4",
                meta: {
                    title: '可视化数据项查看树'
                },
                component: () => import ( /* webpackChunkName: "stream" */ "../views/tree4.vue")
            }, {
                path: "/UserSearch",
                name: "Search",
                meta: {
                    title: '用户查询'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/UserSearch.vue")
            }, {
                path: "/UserPermissionManagement",
                name: "Permission",
                meta: {
                    title: '用户权限管理',
                    permission: true
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/UserPermissionManagement.vue")
            }, {
                path: "/UserEdit",
                name: "edit",
                meta: {
                    title: '用户信息编辑',
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/UserEdit.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'tab标签'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/Tabs.vue")
            }, {
                path: "/upload",
                name: "upload",
                meta: {
                    title: '上传插件'
                },
                component: () => import ( /* webpackChunkName: "upload" */ "../views/Upload.vue")
            },  {
                path: '/404',
                name: '404',
                meta: {
                    title: '找不到页面'
                },
                component: () => import (/* webpackChunkName: "404" */ '../views/404.vue')
            }, {
                path: '/403',
                name: '403',
                meta: {
                    title: '没有权限'
                },
                component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/User.vue')
            }, {
                path: '/table3',
                name: 'table3',
                meta: {
                    title: '可视化查看'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/Table3.vue')
            }, {
                path: '/table4',
                name: 'table4',
                meta: {
                    title: '可视化数据项'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/Table4.vue')
            }, 
            {
                path: '/test',
                name: 'test',
                meta: {
                    title: '测试'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/test.vue')
            },
            {
                path: '/echartsgraph',
                name: 'echartsgraph',
                meta: {
                    title: '图'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/echartsgraph.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/Login.vue")
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin'
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router;