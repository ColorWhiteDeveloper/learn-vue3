<template>
    <div class="KeepInput">
        <span>with keep-alive <label>进入次数：{{inTime}}, 退出次数:{{outTime}}</label></span>
    </div>
</template>
<script lang="ts" setup>
    import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from "vue";
    let inTime = ref(0),outTime = ref(0);
    onActivated(()=>{
        inTime.value++;
    });
    onDeactivated(()=>{
        outTime.value++;
    });
</script>
<style scoped>

</style>