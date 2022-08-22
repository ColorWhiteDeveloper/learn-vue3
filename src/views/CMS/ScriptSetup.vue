<template>
    <div class="CompositionAPI">
        <div class="box1">
            <div class="show-area">
                <span>初始金额:<label style="padding-left: 5px;">{{money}}</label></span>
            </div>
            <div class="change-area">
                <span>变化金额:</span>
                <input type="text" v-model="money" style="margin-left:5px">
                <button @click="moneyAdd"
                    style="background-color: rgb(49, 109, 248);color: white; border: none;margin-left: 5px;border-radius: 2px;">执行一个函数(金额+1)</button>
            </div>
        </div>
        <div class="box2">
            <table>
                <tr>
                    <th>编号</th>
                    <th>Name</th>
                    <th>Url</th>
                </tr>
                <tr v-for="(item,index) in tableArr" :key="index">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.url}}</td>
                </tr>
            </table>
        </div>
        <button @click="arrAdd">表格添加</button>
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    const pagetTitle = 'Script by Setup';
    let money = ref(100);
    const tableArr = ref([
        {
            id:1,
            name:'Google',
            url:'http://www.google.com'
        },
        {
            id:2,
            name:'Google',
            url:'http://www.google.com'
        },
        {
            id:3,
            name:'Google',
            url:'http://www.google.com'
        },
        {
            id:4,
            name:'Google',
            url:'http://www.google.com'
        },
        {
            id:5,
            name:'Google',
            url:'http://www.google.com'
        },
    ])
    const moneyAdd = ()=>{
        money.value++;
    }
    const arrAdd = ()=>{
        tableArr.value.push({
            id:6,
            name:'Wanxi',
            url:'http://www.Wanxi.com'
        })
    }
</script>
<style scoped>
    main{
        display: flex;
        padding-top: 5px;
    }
    .main-left{
      flex: 1;
    }
    .main-right{
        flex: 3;
        background-color: white;
        text-align: left;
    }
    .header{
        padding: 5px 10px;
        font-weight: bold;
        border-bottom: 2px solid #f2f2f2;
    }
    .main{
        padding: 10px;
    }
    label{
        color: rgba(0, 0, 255,0.7);
    }
    th{
        font-weight: normal;
        padding: 5px 10px;
        border: 1px solid rgb(233, 233, 233);
    }
    table{
        border-collapse: collapse;
        text-align: center;
    }
    td{
        border: 1px solid rgb(233, 233, 233);
        padding: 5px 10px;
    }
    .box2{
        margin-top: 30px;
    }
    .change-area{
        margin-top: 10px;
    }
</style>   