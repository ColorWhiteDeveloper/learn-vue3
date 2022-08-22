<template>
    <div class="demo11">
        <emotion @setEmotion="getEmotion"></emotion>
        <div class="showBox" v-html="words">

        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import emotion from '../../components/emotion.vue';
const words = ref('');
function getEmotion(val:string){
    words.value += `<span class="bqfont">${val}</span>`
}
</script>
<style scoped>
</style>