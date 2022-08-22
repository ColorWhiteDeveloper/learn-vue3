<template>
    <div class="PracticeMainView">
        <main>
            <el-row class="main">
              <el-col :span="6" class="main-left">
                <header>
                    <span>Practice Demo</span>
                </header>
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"/>
              </el-col>
              <el-col :span="18" class="main-right">
                <header v-if="toShow()">
                    <h1>{{pagetTitle}}</h1>
                </header>
                <router-view></router-view>
              </el-col>
            </el-row>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { ref,getCurrentInstance, nextTick } from "vue";
// 定义树形数据接口规范
interface Tree{
    id:number;
    label:string;
    toUrl:string;
    children?:Tree[];
}
const { proxy }:any = getCurrentInstance();
const treeData:Tree[] = [
    {
        id:1,
        label:'TS函数重载',
        toUrl:'/demo1',
    },
    {
        id:2,
        label:'穿梭框',
        toUrl:'/demo2',
    },
    {
        id:3,
        label:'小卡片间距',
        toUrl:'/demo3',
    },
    {
        id:4,
        label:'递归',
        toUrl:'/demo4',
    },
    {
        id:5,
        label:'分页器',
        toUrl:'/demo5',
    },
    {
        id:6,
        label:'对话框',
        toUrl:'/demo6',
    },
    {
        id:7,
        label:'穿梭框考核',
        toUrl:'/demo7',
    },
    {
        id:8,
        label:'分页plus考核',
        toUrl:'/demo8',
    },
    {
        id:9,
        label:'Vue知识点测试',
        toUrl:'/demo9',
    },
    {
        id:10,
        label:'element Upload',
        toUrl:'/demo10',
    },
    {
        id:11,
        label:'表情组件',
        toUrl:'/demo11',
    }
];
let pagetTitle = ref('');
const defaultProps = {
    id:'id',
    label:'label',
    toUrl:'toUrl',
    children:'children',
}
// 跳转页面
const handleNodeClick = (treeData:Tree)=>{
    if(treeData.toUrl!==''){
        if(treeData.toUrl!=='/DynamicRouting'){ 
            proxy.$router.push({path:treeData.toUrl});
        }else{
            proxy.$router.addRoute({
                path:treeData.toUrl,
                name:'DynamicRouting',
                component:()=> import('@/views/CMS/DynamicRouting.vue'),
            });
            proxy.$router.push({path:treeData.toUrl});
        }
    }
}
// 控制显示网页标题
const toShow = ():boolean=>{
    if(proxy.$route.path==='/'){
        return false;
    }else{
        pagetTitle.value = getPageTitle(proxy.$route.path);
        return true;
    }
}
// 判断当前路由是否是'/'
const getPageTitle = (url:string):string=>{
    let tempArr:Array<any> = [];
    let result =  treeData.filter(item=>{
        if(item.children===undefined && item.toUrl === url){
            return item;
        }else if(item.children!==undefined){
            item.children.filter(child=>{
                if(child.toUrl === url){
                    tempArr.push(child);
                    return child;
                }
            })
        }
    })
    // console.log(result,tempArr,pagetTitle.value);
    if(result.length!==0 && tempArr.length===0){
        return result[0].label;
    }else if(result.length===0 && tempArr.length!==0){
        return tempArr[0].label;
    }else{
        return pagetTitle.value;
    }
}
</script>
<style>
.PracticeMainView .main{
    padding-top: 10px;
}
.PracticeMainView .el-tree .el-tree-node__content{
    font-weight: lighter;
    height: 30px;
}
.PracticeMainView .el-tree-node__content .el-tree-node__label{
    font-size: 10px;
}
/* .PracticeMainView .el-tree-node__content .el-icon{
    display: none;
} */
.PracticeMainView .main-left header{
    text-align: left;
    padding-left: 24px;
}
.PracticeMainView .main-right header{
    text-align: left;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgb(247, 245, 247);
}
</style>