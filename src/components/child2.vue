<template>
    <div class="child1">
        <header>这是子组件child2</header>
        <main>
            <span>这是VueX的值:{{store.state.demo1.str}}</span>
            <div class="box1">
                <child4Vue></child4Vue>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import child4Vue from "./child4.vue";
import { useStore } from "vuex";
const store = useStore();
</script>
<style scoped>
.child1{
    background-color: rgba(0,0,255,0.5);
}
</style>