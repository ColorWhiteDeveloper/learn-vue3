<template>
    <div class="GlobalProperty">
        <h1>{{proxy.$str}}</h1>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
const { proxy } : any = getCurrentInstance();
</script>