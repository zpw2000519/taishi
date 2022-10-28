<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="(subItem,index) in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default { // setup是api的入口，会自动执行，所有常量方法都要放到setup里面并且所有的常量和方法都要return出去
    setup() {
        const items = [
            {
                icon: "el-icon-lx-home",
                index: "/home",
                title: "系统首页",
            },
            {
                icon: "el-icon-lx-cascades",
                index: "/table",
                title: "可视化方案管理",
                subs: [
                    {
                        index: "/table0",
                        title: "可视化管理首页",
                    },
                    // {
                    //     index: "/table3",
                    //     title: "可视化管理查看页面",
                    // },
                    {
                        index: "/table1",
                        title: "数据源管理",
                    },
                    {
                        index: "/table2",
                        title: "数据项管理",
                    },
                    {
                        index: "/table4",
                        title: "可视化数据项",
                    },
                    {
                        index: "/test",
                        title: "测试",
                    },
                    {
                        index: "/echartsgraph",
                        title: "echarts图",
                    },
                ],
            },
            {
                icon: "el-icon-s-custom",
                index: "/user",
                title: "用户管理",
                subs: [
                    {
                        index: "/UserSearch",
                        title: "用户查询",
                    },
                    {
                        index: "/UserPermissionManagement",
                        title: "用户权限管理",
                    },
                    {
                        index: "/UserEdit",
                        title: "用户信息编辑",
                    },
                ],
            },
        ];

        const route = useRoute();

        const onRoutes = computed(() => {
            return route.path;
        });

        const store = useStore();
        const collapse = computed(() => store.state.collapse);

        return {
            items,
            onRoutes,
            collapse,
        };
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
