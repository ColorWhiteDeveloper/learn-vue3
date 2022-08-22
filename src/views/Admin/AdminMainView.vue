<template>
    <div class="AdminMainView">
        <!-- 顶部 -->
        <header>
            <div class="header-left">
                <img src="../../static/tou.jpg" alt="">
            </div>
            <div class="header-right">
                <span>15711232165646</span>
                <span style="color:blue" @click="toLogin">退出</span>
            </div>
        </header>
        <!-- 内容 -->
        <main>
            <el-row>
                <el-col :span="4">
                    <!-- 侧边栏 -->
                    <aside>
                        <span>System Admin</span>
                        <el-tree :data="asideList" :props="defaultProps" @node-click="JumpToPage" node-key="NumDataGroup"
                            :default-expanded-keys="expandArr"></el-tree>
                    </aside>
                </el-col>
                <el-col :span="20">
                    <!-- 子路由 -->
                    <div class="ChildView" v-if="isShow">
                        <!-- 界面标题 -->
                        <span class="child-title">{{ pagetTitle }}</span>
                        <!-- 界面内容展示 -->
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-row>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { Ref, ref, getCurrentInstance, onMounted, onBeforeMount, inject } from 'vue';
interface IAside {
    JE01DS070: any;
    JE01LC030: any;
    ListChild: IAside[];
    NV04AP040: Array<any>
    NumDataGroup: number
    NumFS04Status: number
    NumRank: number
    ShowText: string
    StrCF02Key: string
}
let expandArr: Ref<number[]> = ref([]);
const defaultProps = {
    label: 'ShowText',
    children: 'ListChild'
}
let isShow: Ref<boolean> = ref(false);
const { proxy }: any = getCurrentInstance();
let pagetTitle: Ref<string> = ref('');
let asideList: Ref<IAside[]> = ref([])
const initTree = () => {
    let role: any = window.sessionStorage.getItem('jsonArrayUserGroup');
    let promiseIn = new Promise((resolve, reject) => {
        if (role !== null) {
            role = JSON.parse(role);
            resolve(role[0].NG010);
        } else {
            proxy.$HelperAxios({
                url: 'http://wh011040.mysh360.com/AttrUserAccount/QueryUserGroup',
                method: "post",
                data:{
                    // notuse:0,
                }
            }).then((res: { data: { Payload: { JsonArrayUserGroup: { NumUserGroup: unknown; }[]; }; }; }) => {
                resolve(res.data.Payload.JsonArrayUserGroup[0].NumUserGroup);
            })
        }
    })
    promiseIn.then((res: any) => {
        proxy.$HelperAxios.get(`http://wh011040.mysh360.com/DataAccessWithGroup/QueryDataGroup?CurrentUserGroup=${res}`).then((res: any) => {
            asideList.value = res.data.Payload;
        })
    })
}
initTree();
const JumpToPage = (item: IAside) => {
    console.log(item);
    if(item.ShowText==='新闻资讯'){
        proxy.$router.push({path:'/AdminMainView/MessageList'});
        isShow.value = true;
    }else{
        proxy.$router.push({path:'/AdminMainView'});
        isShow.value = false;
    }
}
const toLogin = () => {
    window.localStorage.removeItem('AccessToken');
    proxy.$HelperUserAccount.handlerLogin();
}
onMounted(()=>{
    if(proxy.$route.path!=='/AdminMainView'){
        isShow.value = true;
        expandArr.value.push(50012);
    }
})
</script>
<style>
.AdminMainView header {
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 3px 3px -3px rgba(0, 0, 0, 0.3);
}

.AdminMainView .header-right span {
    padding: 0px 5px;
}

.AdminMainView header img {
    width: 30px;
    height: 30px;
}

.AdminMainView main {
    padding-top: 2px;
}

.AdminMainView main aside {
    text-align: left;
}

.AdminMainView main .el-col-4 {
    height: 83vh;
    background-color: rgb(245, 247, 250);
}

.AdminMainView main .el-tree {
    background-color: rgb(245, 247, 250);
}

.AdminMainView main .el-tree-node__content:hover {
    background-color: white;
}

.ChildView {
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.child-title {
    display: block;
    padding: 5px 0px;
}
</style>