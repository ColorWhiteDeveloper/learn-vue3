<template>
    <div class="demo5">
        <div>
            <input type="text" v-model="pageSize">
            <input type="text" v-model="totalNum">
            <button @click="setPagination">确定</button>
        </div>
        <div class="pagination" v-if="show">
            <span class="page-btn-default" @click="pre">{{ btnList[0] }}</span>
            <div class="page-area">
                <div v-for="item in pageList" :key="item.value"
                    :class="['page-btn-default', item.checked ? 'page-btn' : '']" style="border-radius:50%"
                    @click="toPage(item, pageList)">
                    <div v-if="pageIndex < 5 && pageIndex >= 1">
                        <span v-if="item.value < 7">{{ item.value }}</span>
                        <span v-if="item.value === pageList.length - 1" @click.stop="add(pageIndex)">...</span>
                        <span v-if="item.value === pageList.length">{{ item.value }}</span>
                    </div>
                    <div v-if="pageIndex > 4 && pageIndex < pageList.length - 3">
                        <span v-if="item.value === 1">{{ item.value }}</span>
                        <span v-if="item.value === pageIndex - 3" @click.stop="reduce(pageIndex)">...</span>
                        <span v-if="item.value > pageIndex - 3 && item.value < pageIndex + 3">{{ item.value }}</span>
                        <span v-if="item.value === pageIndex + 3" @click.stop="add(pageIndex)">...</span>
                        <span v-if="item.value === pageList.length">{{ item.value }}</span>
                    </div>
                    <div v-if="pageIndex > pageList.length - 4">
                        <span v-if="item.value === 1">{{ item.value }}</span>
                        <span v-if="item.value === 2" @click.stop="reduce(pageIndex)">...</span>
                        <span v-if="item.value > pageList.length - 6 && item.value <= pageList.length">{{ item.value
                        }}</span>
                    </div>
                </div>
            </div>
            <span class="page-btn-default" @click="next()">{{ btnList[1] }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
interface IPage {
    value: number;
    checked: boolean;
}
let show: Ref<boolean> = ref(false);
let pageSize: Ref<number> = ref(0);
let totalNum: Ref<number> = ref(0);
const btnList: Array<string> = ['<', '>'];
let pageIndex: Ref<number> = ref(1);
let pageList: Ref<IPage[]> = ref([
    // {
    //     value: 1,
    //     checked: true,
    // },
    // {
    //     value: 2,
    //     checked: false,
    // },
    // {
    //     value: 3,
    //     checked: false,
    // },
    // {
    //     value: 4,
    //     checked: false,
    // },
    // {
    //     value: 5,
    //     checked: false,
    // },
    // {
    //     value: 6,
    //     checked: false,
    // },
    // {
    //     value: 7,
    //     checked: false,
    // },
    // {
    //     value: 8,
    //     checked: false,
    // },
    // {
    //     value: 9,
    //     checked: false,
    // },
    // {
    //     value: 10,
    //     checked: false,
    // },
    // {
    //     value: 11,
    //     checked: false,
    // },
    // {
    //     value: 12,
    //     checked: false,
    // },
    // {
    //     value: 13,
    //     checked: false,
    // },
    // {
    //     value: 14,
    //     checked: false,
    // },
    // {
    //     value: 15,
    //     checked: false,
    // },
    // {
    //     value: 16,
    //     checked: false,
    // },
    // {
    //     value: 17,
    //     checked: false,
    // },
    // {
    //     value: 18,
    //     checked: false,
    // },
    // {
    //     value: 19,
    //     checked: false,
    // },
    // {
    //     value: 20,
    //     checked: false,
    // },
]);
const next = () => {
    let res: number = -1;
    pageList.value.forEach((item, index) => {
        if (item.checked === true) {
            res = index + 1;
            item.checked = false;
        }
    })
    if (res >= pageList.value.length) {
        res = 0;
    }
    pageIndex.value = pageList.value[res].value;
    // console.log(pageIndex.value);
    pageList.value[res].checked = true;
}
const pre = () => {
    let res: number = -1;
    pageList.value.forEach((item, index) => {
        if (item.checked === true) {
            res = index - 1;
            item.checked = false;
        }
    })
    if (res < 0) {
        res = pageList.value.length - 1;
    }
    pageIndex.value = pageList.value[res].value;
    pageList.value[res].checked = true;
}
const toPage = (val: IPage, arr: IPage[]) => {
    // console.log('toPage');
    arr.forEach(item => {
        if (item.checked === true) {
            item.checked = false;
        }
    })
    val.checked = true;
    pageIndex.value = val.value;
}
const reduce = (index: number) => {
    let res: number = 0;
    pageList.value.forEach(item => {
        if (item.value === index) {
            item.checked = false;
            res = index - 3;
        }
    })
    pageIndex.value = pageList.value[res].value;
    pageList.value[res].checked = true;
}
const add = (index: number) => {
    // console.log('add');
    let res: number = 0;
    pageList.value.forEach(item => {
        if (item.value === index) {
            item.checked = false;
            res = index + 1;
        }
    })
    pageIndex.value = pageList.value[res].value;
    // console.log(pageIndex.value);
    pageList.value[res].checked = true;
}
const setPagination = () => {
    pageList.value =[];
    let startPromise = new Promise((resolve, reject) => {
        for (let i = 0; i < Math.ceil(totalNum.value / pageSize.value); i++) {
            pageList.value.push(
                {
                    value:i+1,
                    checked:false,
                }
            )
            if(i==Math.ceil(totalNum.value / pageSize.value)-1){
                resolve(pageList.value);
            }
        }
    })
    startPromise.then((res: any)=>{
        let time = 0;
        res.forEach((item:IPage)=>{
            if(item.checked===true){
                time++;
            }
        })
        if(time===0){
            res[0].checked = true;
        }
        show.value = true;
    })
}
</script>
<style scoped>
.pagination {
    text-align: left;
    display: flex;
}

.demo5 span {
    display: block;
    text-align: center;
    height: 30px;
    width: 30px;
    line-height: 30px;
    border-radius: 50%;
}

.demo5 .page-area {
    display: flex;
}

.demo5 .page-btn {
    background-color: rgb(64, 158, 255);
    color: white;
}

.page-btn-default {
    color: rgb(96, 98, 102);
    background-color: rgb(240, 242, 245);
}
</style>