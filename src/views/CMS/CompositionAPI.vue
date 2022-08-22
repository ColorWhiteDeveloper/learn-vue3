<template>
    <div class="CompositionAPI">
        <div class="box1">
            <div class="show-area">
                <span>初始金额:<label style="padding-left: 5px;">{{money}}</label></span>
            </div>
            <div class="change-area">
                <span>变化金额:</span>
                <input type="text" v-model="money" style="margin-left:5px">
                <button @click="moneyAdd" style="background-color: rgb(49, 109, 248);color: white; border: none;margin-left: 5px;border-radius: 2px;">执行一个函数(金额+1)</button>
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
    </div>
</template>
<script lang="ts" setup>
     import { Ref, ref } from 'vue';
    let money:Ref<number> = ref(100);
    const tableArr = [
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
    ]
    const moneyAdd = ()=>{
        money.value++;
    }
</script>