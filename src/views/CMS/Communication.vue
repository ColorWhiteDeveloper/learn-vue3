<template>
    <div class="CompositionAPI">
        <!-- 父传子 -->
        <div class="box1">
            <child1-vue :title="sendParentVal" @SetChildVal="InitChildVal" @mytest="mytest"></child1-vue>
        </div>
        <!--子传父 -->
        <div class="box2">
            <span>这是子组件传的值：{{getChildVal}}</span><br/>
            <span>这是VueX的值:{{store.state.demo1.str}}</span>
        </div>
        <!-- vuex -->
        <div class="box3">
            <child2-vue></child2-vue>
        </div>
        <!-- 爷传孙 -->
        <div class="box4">
            <input type="text" v-model="grandChildVal">
            <button @click="sendGrandChildVal">发送值</button>
        </div>
        <!-- 孙传爷 -->
        <div class="box5">
            <span>这是孙子组件child4传过来的值</span><br>
            <input type="text" v-model="getGrandChildVal">
        </div>   
    </div>
</template>
<script lang="ts" setup>
    import child1Vue from '../../components/child1.vue';
    import child2Vue from '../../components/child2.vue';
    import { ref,nextTick,provide, onMounted, onBeforeMount } from 'vue';
    import { useStore } from 'vuex';
    const sendParentVal = '这是父组件对子组件的爱';
    let grandChildVal = ref('');
    let getGrandChildVal = ref('');
    let getChildVal = ref('');
    const InitChildVal = (reciveVal:any)=>{
        getChildVal.value =reciveVal;
    }
    function mytest():any{
        console.log('这是父组件方法');
    }
    provide('setGrandChildVal',grandChildVal);
    const sendGrandChildVal = ()=>{
        console.log(provide);
    }
    const recieveGrandChildVal = (ValIn:any)=>{
        getGrandChildVal.value = ValIn;
    }
    provide('setGrandChildVal2',recieveGrandChildVal);
    // nextTick(()=>{
    //     // 页面渲染完成后执行
    //     console.log(111);
    // });
    const store = useStore();
    console.log('这是父组件的setup');
    onBeforeMount(()=>{
        console.log('这是父组件的onBeforeMount');
    })
    onMounted(()=>{
        console.log('这是父组件的onMounted');
    })
</script>
<style scoped>
</style>   