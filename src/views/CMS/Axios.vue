<template>
    <div class="Axios" v-loading="showFlag" element-loading-text="加载中...">
        <el-button type="primary" @click="GetRequest">发送GET请求</el-button>
        <el-button type="primary" @click="PostRequest">发送POST请求</el-button>
        <div>
            <table v-show="tableFlag">
                <tr>
                    <th>Name</th>
                    <th>Url</th>
                </tr>
                <tr v-for="(item, index) in jsonArr" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.url }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, Ref } from 'vue';
const { proxy }: any = getCurrentInstance();
const requestList: Array<string> = ['http://127.0.0.1:8055/manage_system_admin/php/market/find.php', 'http://localhost:46208/Training/Demo']
// http://127.0.0.1:8055/manage_system_admin/php/market/find.php
// http://localhost:46208/Training/Demo
let jsonArr: Ref<any> = ref([]);
let showFlag: Ref<boolean> = ref(false);
let tableFlag : Ref<boolean> = ref(false);
const GetRequest = () => {
    showFlag.value = true;
    setTimeout(() => {
        proxy.$axios.get(requestList[1],{params:{msg1:'p1',msg2:'p2'}}).then((res: any) => {
            console.log(res);
            showFlag.value = false;
            tableFlag.value = true;
            jsonArr.value = res.data.JsonArrayCompanies;
        }).catch((err: any) => {
            console.log(err);
        })
    }, 2000)
}
const PostRequest = () => {
    showFlag.value = true;
    setTimeout(() => {
        proxy.$axios.get(requestList[1],{msg1:'参数3',msg2:'参数4'}).then((res: any) => {
            console.log(res);
            showFlag.value = false;
            tableFlag.value = true;
            jsonArr.value = res.data.JsonArrayCompanies;
        }).catch((err: any) => {
            console.log(err);
        })
    }, 2000)
}
</script>
<style>
</style>