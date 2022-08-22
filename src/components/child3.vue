<template>
    <div class="PhotoAbum">
        <header><span>{{obj1.title}}</span><br/></header>
        <main>
            <img :src="obj1.url" alt="">
        </main>
    </div>
</template>
<script lang="ts" setup>
    const obj1 = {title:'风格1',url:require('../static/tou.jpg'),}
</script>
<style scoped>
    main{
        padding-top: 10px;
    }
    img{
        width: 50px;
        height: 50px;
    }
</style>