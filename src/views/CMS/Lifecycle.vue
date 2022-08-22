<template>
    <div class="Lifecycle">
        <div class="main">
            <span>这是执行结果:<label>{{msg}}</label></span>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref,getCurrentInstance, onMounted, Ref, onBeforeMount } from 'vue';
    const pagetTitle = '生命周期(Lifecycle) & 钩子函数(Hooks)';
    let msg : Ref<string> = ref('');
    const {proxy}:any = getCurrentInstance();
    const test = (index:number)=>{
        const domItem = document.querySelector('.Lifecycle');
        if(domItem===null){
            msg.value = 'this dom is undefined';
        }else{
            msg.value = 'this dom is existed';
            return index;
        }
    }
    console.log(test(0),"这是setup");
    onBeforeMount(() => {
        console.log(test(1),"这是onbeforemount");
    }),
    onMounted(()=>{
        console.log(test(2),"这是onmounted");
    });
</script>
<style scoped>
</style>