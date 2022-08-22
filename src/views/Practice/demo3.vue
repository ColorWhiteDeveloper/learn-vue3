<template>
    <div class="demo3">
        <main>
            <el-space wrap :size="size" spacer="|">
                <el-card v-for="item in cardList" :key="item.id" style="width:250px">
                    <template #header>
                        <div class="card-header">
                            <span>Card Name :</span><br>
                            <span>{{ item.name }}</span>
                        </div>
                    </template>
                    <div>
                        {{ 'Card Item' + item.id }}
                    </div>
                </el-card>
            </el-space>
        </main>
    </div>
</template>
<script lang="ts" setup>
import {ref,inject} from 'vue'
interface ICard {
    id: number;
    name: string;
}
let size = ref(50);
const cardList: ICard[] = [
    {
        id: 1,
        name: 'item1',
    },
    {
        id: 2,
        name: 'item2',
    },
    {
        id: 3,
        name: 'item3',
    },
    {
        id: 4,
        name: 'item4',
    },
]
</script>
<style>
</style>