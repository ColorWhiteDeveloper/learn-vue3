<template>
    <div class="Slot">
        <div class="item" v-for="(item, index) in showArr" :key="index">
            <PhotoAbumVue :title='item.title'>
                <img :src="item.url" alt="">
            </PhotoAbumVue>
        </div>
    </div>
</template>
<script lang="ts" setup>
import PhotoAbumVue from '../../components/PhotoAbum.vue';
const showArr = [
    {
        title: '风格1',
        url: require('../../static/tou.jpg'),
    },
    {
        title: '风格2',
        url: require('../../static/tou.jpg'),
    },
    {
        title: '风格3',
        url: require('../../static/tou.jpg'),
    },
    {
        title: '风格4',
        url: require('../../static/tou.jpg'),
    },
];
</script>
<style scoped>
.Slot{
    display: flex;
}
img {
    width: 50px;
    height: 50px;
}

.item {
    padding: 2px 10px;
}
</style>