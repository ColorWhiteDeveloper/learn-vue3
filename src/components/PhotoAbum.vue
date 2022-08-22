<template>
    <div class="PhotoAbum">
        <header><span>{{getProps.title}}</span><br/></header>
        <main><slot></slot></main>
    </div>
</template>
<script lang="ts" setup>
    const getProps = defineProps({
        title:String,
    })
</script>
<style scoped>
    main{
        padding-top: 10px;
    }
</style>