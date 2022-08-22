<template>
    <div class="KeepAlive">
        <!--v-html -->
        <div class="box1">
            <!-- 直接引用变量item -->
            <span class="box1-1">{{ item }}</span>
            <span class="box1-2" v-html="item"></span>
        </div>
        <!-- keepalive -->
        <div class="box2">
            <div class="main">
                <span>这是keep-alive例子:</span>
                <router-link to="/KeepAlive/KeepInput">input</router-link>
                <router-link to="/KeepAlive/KeepImage">image</router-link>
            </div>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component"></component>
                </keep-alive>
            </router-view>
            <router-view v-slot="{ Component }">
                <component :is="Component"></component>
            </router-view>
        </div>
    </div>
</template>
<script lang="ts" setup>
const url = require('../../static/tou.jpg');
const item = `<img src=${url} style='width:200px;height:200px'>`;
</script>
<style scoped>
.box1{
    display: flex;
}
.box1-1 {
    flex: 1;
}

.box1-2 {
    flex: 1;
}
.main a {
    padding: 0 10px;
}
</style>