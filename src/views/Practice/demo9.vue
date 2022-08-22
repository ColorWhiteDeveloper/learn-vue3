<template>
    <div class="demo9">
        <!-- 防抖 -->
        <input type="text" v-model="debounce">
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, Ref, ref, watch, customRef } from 'vue';
const { proxy }: any = getCurrentInstance();
let debounce: Ref<string> = ref('');
function Debounce(fnIn: Function, delayTime: number) {
    let timer: any = null;
    return (...args: any) => {
        // console.log(args,2);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fnIn.apply(fnIn, args);
        }, delayTime);
    }
}
const handleSearch = Debounce((valIn: string) => {
    console.log(valIn,1);
}, 1000)
watch(() => debounce.value, (newVal, oldVal) => {
    handleSearch(newVal);
})
</script> 