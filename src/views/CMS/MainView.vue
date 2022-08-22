<template>
    <div class="MainView">
        <header>
            <el-row class="header">
                <el-col :span="7" class="ImgContainer">
                    <img src="../../static/tou.jpg" alt="">
                </el-col>
            </el-row>
        </header>
        <main>
            <el-row class="main">
                <el-col :span="8" class="main-left">
                    <header>
                        <span>Vue Think Tank(VTT)</span>
                    </header>
                    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" />
                </el-col>
                <el-col :span="16" class="main-right">
                    <header v-if="toShow()">
                        <span>{{ pagetTitle }}</span>
                    </header>
                    <router-view></router-view>
                </el-col>
            </el-row>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, nextTick } from "vue";
// 定义树形数据接口规范
interface Tree {
    id: number;
    label: string;
    toUrl: string;
    children?: Tree[];
}
const { proxy }: any = getCurrentInstance();
const treeData: Tree[] = [
    {
        id: 1,
        label: 'Explantion Message',
        toUrl: '',
    },
    {
        id: 2,
        label: '动态组件',
        toUrl: '/DynamicComponent',
    },
    {
        id: 3,
        label: '插槽(Slot)',
        toUrl: '/Slot',
    },
    {
        id: 4,
        label: 'Vue Router',
        toUrl: '',
        children: [
            {
                id: 41,
                label: '路由传值',
                toUrl: '/RouterParams',
            },
            {
                id: 42,
                label: '动态路由',
                toUrl: '/DynamicRouting',
            },
        ]
    },
    {
        id: 5,
        label: 'API / Lifecycle & Related Hooks',
        toUrl: '',
        children: [
            {
                id: 12,
                label: '组合式应用程序接口(Composition API)',
                toUrl: '/CompositionAPI',
            },
            {
                id: 13,
                label: '生命周期(Lifecycle) & 钩子函数(Hooks)',
                toUrl: '/Lifecycle',
            },
            {
                id: 13,
                label: 'Script by Setup',
                toUrl: '/ScriptSetup',
            },
            {
                id: 14,
                label: 'keep-alive',
                toUrl: '/KeepAlive',
            },
        ]
    },
    {
        id: 6,
        label: '指令(Directive)',
        toUrl: '',
    },
    {
        id: 7,
        label: '全局属性(Global Properties)',
        toUrl: '/GlobalProperty',
    },
    {
        id: 8,
        label: 'Third-part UI Libraries',
        toUrl: '',
    },
    {
        id: 9,
        label: '组件间通信',
        toUrl: '/Communication',
    },
    {
        id: 10,
        label: 'Promise 对象',
        toUrl: '/Promise',
    },
    {
        id: 11,
        label: '接口请求 / 异步(Async)',
        toUrl: '',
        children: [
            {
                id: 111,
                label: 'Axios',
                toUrl: '/Axios',
            },
        ]
    },
];
let pagetTitle = ref('');
const defaultProps = {
    id: 'id',
    label: 'label',
    toUrl: 'toUrl',
    children: 'children',
}
// 跳转页面
const handleNodeClick = (treeData: Tree) => {
    if (treeData.toUrl !== '') {
        if (treeData.toUrl !== '/DynamicRouting') {
            proxy.$router.push({ path: treeData.toUrl });
        } else {
            proxy.$router.addRoute({
                path: treeData.toUrl,
                name: 'DynamicRouting',
                component: () => import('@/views/CMS/DynamicRouting.vue'),
            });
            proxy.$router.push({ path: treeData.toUrl });
        }
    }
}
// 控制显示网页标题
const toShow = (): boolean => {
    if (proxy.$route.path === '/') {
        return false;
    } else {
        pagetTitle.value = getPageTitle(proxy.$route.path);
        return true;
    }
}
// 判断当前路由是否是'/'
const getPageTitle = (url: string): string => {
    let tempArr: Array<any> = [];
    let result = treeData.filter(item => {
        if (item.children === undefined && item.toUrl === url) {
            return item;
        } else if (item.children !== undefined) {
            item.children.filter(child => {
                if (child.toUrl === url) {
                    tempArr.push(child);
                    return child;
                }
            })
        }
    })
    // console.log(result,tempArr,pagetTitle.value);
    if (result.length !== 0 && tempArr.length === 0) {
        return result[0].label;
    } else if (result.length === 0 && tempArr.length !== 0) {
        return tempArr[0].label;
    } else {
        return pagetTitle.value;
    }
}
</script>
<style>
.MainView .header {
    border-bottom: 1px solid rgb(247, 245, 247);
}

.MainView .header img {
    flex: 0;
    width: 30px;
    height: 30px;
}

.MainView .header .ImgContainer {
    height: 30px;
    text-align: left;
    margin-left: 24px;
    box-shadow: 0px 3px 2px -1px rgb(232, 230, 234);
}

.MainView .main {
    padding-top: 10px;
}

.MainView .el-tree .el-tree-node__content {
    font-weight: lighter;
    height: 30px;
}

.MainView .el-tree-node__content .el-tree-node__label {
    font-size: 10px;
}

/* .MainView .el-tree-node__content .el-icon{
    display: none;
} */
.MainView .main-left header {
    text-align: left;
    padding-left: 24px;
}

.MainView .main-right header {
    text-align: left;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgb(247, 245, 247);
}
</style>