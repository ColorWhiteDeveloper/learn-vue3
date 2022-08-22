<template>
    <div class="DynamicComponent">
        <component :is="ToComponent"></component>
        <button @click="changeComponent">切换组件</button>
    </div>
</template>
<script lang="ts" setup>
    import { ref,shallowRef } from 'vue';
    import child2Vue from '../../components/child2.vue';
    import child3Vue from '../../components/child3.vue';
    let ToComponent = shallowRef(child2Vue);
    const changeComponent = ():void=>{
        if(ToComponent.value.__file===child2Vue.__file){
            ToComponent.value = child3Vue;
            console.log('in');
        }else{
            console.log('out');
            ToComponent.value = child2Vue;
        }
    }
</script>