<template>
    <div class="demo2">
        <main>
            <div class="main-left">
                <div @click="toCheckAll(left_arr,0)">
                    <input type="checkbox" v-model="allCheckLeft"><span>全选</span><span style="padding-left:10px"
                        v-if="showList[0]">{{ getCheckedNumber(left_arr, 0) }} /</span><span style="padding-left:6px">{{
                                left_arr.length
                        }}</span>
                </div>
                <div class="item" v-for="(item, index) in left_arr" :key="index">
                    <input type="checkbox" v-model="item.flag" :disabled="item.disabled">
                    <span @click="toCheck(item,left_arr,0)">{{ item.name }}</span>
                </div>
            </div>
            <div class="main-center">
                <el-button type="primary" @click="toLeft">toLeft</el-button>
                <el-button type="primary" @click="toRight">toRight</el-button>
            </div>
            <div class="main-right">
                <div @click="toCheckAll(right_arr,1)">
                    <input type="checkbox" v-model="allCheckRight"><span>全选</span><span style="padding-left:10px"
                        v-if="showList[1]">{{ getCheckedNumber(right_arr, 1) }} /</span><span style="padding-left:6px">{{
                                right_arr.length
                        }}</span>
                </div>
                <div class="item" v-for="(item, index) in right_arr" :key="index">
                    <input type="checkbox" v-model="item.flag" :disabled="item.disabled">
                    <!-- :disabled="item.disabled" -->
                    <span @click="toCheck(item,right_arr,1)">{{ item.name }}</span>
                </div>
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { left } from '@popperjs/core';
import { Ref, ref, watch } from 'vue';
interface myArr {
    id: number;
    name: string;
    flag: boolean;
    disabled: boolean;
}
let allCheckLeft: Ref<boolean> = ref(false);
let allCheckRight: Ref<boolean> = ref(false);
let showList: Ref<boolean[]> = ref([false, false]);
let time: Array<number> = [0, 0];
const getCheckedNumber = (arr: myArr[], index: number) => {
    time[index] = 0;
    arr.forEach(item => {
        if (item.flag === true) {
            time[index]++;
        }
    })
    if (time[index] === 0) {
        showList.value[index] = false;
    } else {
        showList.value[index] = true;
        return time[index];
    }
}
const setAllCheck = (arr: myArr[],flag:boolean,index: number) => {
    arr.forEach(item => {
        if (item.disabled !== true) {
            item.flag = !flag;
        }
    })
    showList.value[index] = flag;
}
let left_arr: Ref<myArr[]> = ref([
    {
        id: 1,
        name: '参数1',
        flag: false,
        disabled: true,
    },
    {
        id: 2,
        name: '参数2',
        flag: false,
        disabled: false,
    },
    {
        id: 3,
        name: '参数3',
        flag: false,
        disabled:true,
    },
    {
        id: 4,
        name: '参数4',
        flag: false,
        disabled: true,
    },
    {
        id: 5,
        name: '参数5',
        flag: false,
        disabled: false,
    },
]);
let right_arr: Ref<myArr[]> = ref([
    {
        id: 6,
        name: '参数6',
        flag: false,
        disabled: false,
    },
    {
        id: 7,
        name: '参数7',
        flag: false,
        disabled: false,
    },
    {
        id: 8,
        name: '参数8',
        flag: false,
        disabled: true,
    },
    {
        id: 9,
        name: '参数9',
        flag: false,
        disabled: false,
    },
    {
        id: 10,
        name: '参数10',
        flag: false,
        disabled: false,
    },
]);
watch(left_arr, () => {
    getCheckedNumber(left_arr.value, 0);
    arrIsChecked(left_arr.value,0);
}, { deep: true })
watch(right_arr, () => {
    getCheckedNumber(right_arr.value, 1);
    arrIsChecked(right_arr.value,1);
}, { deep: true })
function toRight(): void {
    let result: myArr[] = [];
    allCheckLeft.value = false;
    left_arr.value.filter((item) => {
        if (item.flag === true) {
            item.flag = false;
            right_arr.value.push(item);
        } else {
            result.push(item);
        }
    })
    left_arr.value = result;
    sortArr(left_arr.value, right_arr.value);
}
function toLeft(): void {
    let result: myArr[] = [];
    allCheckRight.value = false;
    right_arr.value.filter((item) => {
        if (item.flag === true) {
            item.flag = false;
            left_arr.value.push(item);
        } else {
            result.push(item);
        }
    })
    right_arr.value = result;
    sortArr(left_arr.value, right_arr.value);
}
function sortArr(param1: myArr[], param2: myArr[]) {
    param1.sort((a: myArr, b: myArr) => {
        return a.id - b.id;
    });
    param2.sort((a: myArr, b: myArr) => {
        return a.id - b.id;
    });
}
const toCheck = (obj: myArr,arr:myArr[],flag:number) => {
    if (obj.disabled !== true) {
        obj.flag = !obj.flag;
    }
    arrIsChecked(arr,flag);
}
const arrIsChecked = (arr:myArr[],flag:number)=>{
    let time = 0;
    let err = 0;
    arr.forEach(item=>{
        if(item.flag===true){
            time++;
        }else if(item.disabled===true){
            err++;
        }
    })
    if(time===arr.length-err){
        if(flag===0){
            allCheckLeft.value = true;
        }else if(flag===1){
            allCheckRight.value = true;
        }
    }else{
        if(flag===0){
            allCheckLeft.value = false;
        }else if(flag===1){
            allCheckRight.value = false;
        }
    }
}
const toCheckAll = (arr:myArr[],index:number)=>{
    if(index===0){
        setAllCheck(arr,allCheckLeft.value,index);
    }else if(index===1){
        setAllCheck(arr,allCheckRight.value,index);
    }
}
</script>
<style scoped>
main {
    display: flex;
    text-align: left;
}

.main-left {
    flex: 2;
    display: flex;
    flex-direction: column;
}

.main-center {
    flex: 2;
}

.main-right {
    flex: 2;
}
</style>