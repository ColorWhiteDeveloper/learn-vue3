<template>
    <div class="child4">
        <header>这是孙子组件child4</header>
        <main>
            <div class="box1">
                <span>这是从爷组件获取到的值：{{setGrandChildVal}}</span><br />
                <button @click="getGrandParentVal">获取爷组件传得值</button>
            </div>
            <div class="box2">
                <span>发送孙子组件的值</span><br>
                <input type="text" v-model="grandChild">
                <button @click="sendToGrandParent">发送到爷组件</button>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { inject, ref } from 'vue';
const setGrandChildVal = inject('setGrandChildVal');
let grandChild = ref('张三');
const setGrandChildVal2:any = inject('setGrandChildVal2');
// setGrandChildVal2(grandChild.value);
const getGrandParentVal = ()=>{
    console.log(setGrandChildVal);
}
const sendToGrandParent = ()=>{
        console.log('start');
        setGrandChildVal2(grandChild.value);
        console.log('end');
}
</script>