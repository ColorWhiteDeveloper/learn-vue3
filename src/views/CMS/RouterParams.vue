<template>
    <div class="RotuterParams">
        <button @click="JumpTo">携带id参数去往插槽界面</button>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
const { proxy } :any = getCurrentInstance();
const JumpTo = () : void=>{
    proxy.$router.push({
        path:'/Slot',
        query:{id:1}
    })
}
</script>