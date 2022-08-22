<template>
    <div class="demo7">
        <div class="left">
            <div class="header" @click="setAllChecked(allCheckList, leftList, 0)">
                <div class="header-left">
                    <input type="checkbox" v-model="allCheckList[0]"><span>全选</span>
                </div>
                <div class="header-right">
                    <span style="padding-left:10px">{{ getCheked(leftList) }}/{{ leftList.length }}</span>
                </div>
            </div>
            <div class="main">
                <div :class="['item',item.disabled?'nostyle':'hasStyle']" v-for="item in leftList" :key="item.id" @click="setChecked(item, leftList, 0)"
                    v-if="leftList.length !== 0">
                    <input type="checkbox" v-model="item.checked" :disabled="setNotAllowed(item)" >
                    <span style="padding-left:5px">{{ item.label }}</span>
                </div>
                <span v-else style="display: block;text-align:center">No Data</span>
            </div>
        </div>
        <div class="center">
            <button class="btn1" @click="toLeft" :disabled="getCheked(rightList)===0?true:false">{{ btnList[0] }}</button>
            <button class="btn1" @click="toRight">{{ btnList[1] }}</button>
        </div>
        <div class="right">
            <div class="header" @click="setAllChecked(allCheckList, rightList, 1)">
                <input type="checkbox" v-model="allCheckList[1]"><span>全选</span><span style="padding-left:10px">{{
                        getCheked(rightList)
                }}/{{ rightList.length }}</span>
            </div>
            <div class="main">
                <div :class="['item',item.disabled?'nostyle':'hasStyle']" v-for="item in rightList" :key="item.id" @click="setChecked(item, rightList, 1)"
                    v-if="rightList.length !== 0">
                    <input type="checkbox" v-model="item.checked" :disabled="setNotAllowed(item)">
                    <span style="padding-left:5px">{{ item.label }}</span>
                </div>
                <span v-else style="display: block;text-align:center">No Data</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Ref, ref, watch } from 'vue';
interface IList {
    id: number;
    label: string;
    checked: boolean;
    disabled: boolean;
}
const btnList = ['<', '>']
let allCheckList: Ref<boolean[]> = ref([false, false]);
let leftList: Ref<IList[]> = ref([
    {
        id: 1,
        label: '选项1',
        checked: false,
        disabled: false,
    },
    {
        id: 2,
        label: '选项2',
        checked: false,
        disabled: false,
    },
    {
        id: 3,
        label: '选项3',
        checked: false,
        disabled: false,
    },
    {
        id: 4,
        label: '选项4',
        checked: false,
        disabled: false,
    },
    {
        id: 5,
        label: '选项5',
        checked: false,
        disabled: false,
    }
])
let rightList: Ref<IList[]> = ref([
    {
        id: 6,
        label: '选项6',
        checked: false,
        disabled: false,
    },
    {
        id: 7,
        label: '选项7',
        checked: false,
        disabled: false,
    },
    {
        id: 8,
        label: '选项8',
        checked: false,
        disabled: false,
    },
    {
        id: 9,
        label: '选项9',
        checked: false,
        disabled: false,
    },
    {
        id: 10,
        label: '选项10',
        checked: false,
        disabled: false,
    }
])
function setChecked(item: IList, arr: IList[], index: number) {
    if (item.disabled !== true) {
        if (item.checked === true) {
            item.checked = false;
        } else {
            item.checked = true;
        }
    }
    let time = 0;
    let err = 0;
    arr.forEach(el => {
        if (el.disabled !== true) {
            if (el.checked === true) {
                time++;
            }
        } else {
            err++;
        }
    })
    if (time === arr.length-err) {
        allCheckList.value[index] = true;
    } else {
        allCheckList.value[index] = false;
    }
}
function toLeft() {
    let result: IList[] = [];
    allCheckList.value[1] = false;
    rightList.value.filter((item) => {
        if (item.checked === true) {
            item.checked = false;
            leftList.value.push(item);
        } else {
            result.push(item);
        }
    })
    rightList.value = result;
    let time = 0;
    leftList.value.forEach(item=>{
        if(item.checked===true){
            time++;
        }
    })
    if(time===leftList.value.length){
        allCheckList.value[0]=true;
    }else{
        allCheckList.value[0]=false;
    }
    sortArr(leftList.value, rightList.value);
}
function toRight() {
    let result: IList[] = [];
    allCheckList.value[0] = false;
    leftList.value.filter((item) => {
        if (item.checked === true) {
            item.checked = false;
            rightList.value.push(item);
        } else {
            result.push(item);
        }
    })
    leftList.value = result;
    let time = 0;
    rightList.value.forEach(item=>{
        if(item.checked===true){
            time++;
        }
    })
    if(time===rightList.value.length){
        allCheckList.value[1]=true; 
    }else{
        allCheckList.value[1]=false;
    }
    sortArr(leftList.value, rightList.value);
}
function sortArr(param1: IList[], param2: IList[]) {
    param1.sort((a: IList, b: IList) => {
        return a.id - b.id;
    });
    param2.sort((a: IList, b: IList) => {
        return a.id - b.id;
    });
}
function setAllChecked(all: boolean[], arr: IList[], index: number) {
    if (all[index] === true) {
        all[index] = false;
        arr.forEach(item => {
            if (item.disabled !== true) {
                item.checked = false;
            }
        })
    } else {
        all[index] = true;
        arr.forEach(item => {
            if (item.disabled !== true) {
                item.checked = true;
            }
        })
    }
}
function getCheked(arr: IList[]) {
    let time = 0;
    arr.forEach(item => {
        if (item.checked === true) {
            time++;
        }
    })
    return time;
}
function setNotAllowed(item:IList){
    if(item.id%3!==0){
        item.disabled = false;
    }else{
        item.disabled = true;
    }
    return item.disabled;
}
</script>
<style scoped>
.demo7 {
    display: flex;
}

.left {
    text-align: left;
}

.center {
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    height: 30px;
    width: 50px;
    font-size: 20px;
}

.btn1 {
    background-color: rgb(64, 158, 255);
    border: none;
    color: white;
    border-radius: 5px;
}
.btn1:hover{
    background-color: rgb(160, 207, 255);
}
.right {
    text-align: left;
}

.header {
    background-color: rgb(245, 247, 250);
    width: 175px;
    padding: 5px 5px;
    display: flex;
    justify-content: space-between;
}

.item {
    color: rgb(96, 98, 102);
    padding: 2px 5px;
}

.hasStyle:hover {
    color: rgb(99, 176, 255)
}
.nostyle:hover{
    cursor: not-allowed;
}
</style>