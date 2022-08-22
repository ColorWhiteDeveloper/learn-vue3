<template>
    <div class="child1">
        <header>这是子组件child11</header>
        <main>
            <span>这是父组件传的值：{{ getProps.title }}</span><br />
            <input type="text" v-model="strChild1">
            <button @click="SendStrChildVal">发送到父组件</button>
            <button @click="SendToVueX">发送到VueX</button>
            <button @click="useParentMethod">调用父方法</button>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { emit } from "process";
import { onBeforeMount, onMounted, ref, getCurrentInstance } from "vue";
import { useStore } from "vuex";
const { proxy }: any = getCurrentInstance();
const strChild1 = ref('');
const getProps = defineProps({
    title: String,
})
const emitFun = defineEmits(['SetChildVal', 'mytest']);
const SendStrChildVal = () => {
    emitFun('SetChildVal', strChild1.value);
}
const store = useStore();
const SendToVueX = () => {
    // store.dispatch('setValStr',strChild1.value);
    store.commit('mutationStr', strChild1.value);
}
// 调用父方法
function useParentMethod() {
    emitFun("mytest");
}
console.log('这是子组件的setup');
onBeforeMount(() => {
    console.log('这是子组件的onBeforeMount');
})
onMounted(() => {
    console.log('这是子组件的onMounted');
})
</script>
<style scoped>
.child1 {
    background-color: rgba(0, 0, 255, 0.5);
}
</style>