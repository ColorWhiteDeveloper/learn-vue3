<template>
    <div class="demo6">
        <el-button text @click="dialogVisible = true">click to open the Dialog</el-button>
        <el-divider />
        <el-dialog v-model="dialogVisible" title="对话框" width="30%" :before-close="handleClose">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
        <span>{{getComputed}}</span>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const testComputed = ref(30),getComputed=ref();
getComputed.value =  computed(()=>{
    return testComputed.value*10;
})
const obj = ref({
    name:'李四',
    age:16,
    sex:'男',
})
watch(()=>obj.value,(newVal,oldVal)=>{
    console.log('in');
    console.log(newVal,oldVal);
},{deep:true})
// obj.value.name = '张三';
// console.log(obj.value);
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
let jsonArrayCompanies = [
    {
        id: 3,
        name: "Google",
        url: "http://www.google.com",
    },
    {
        id: 10,
        name: "Baidu",
        url: "http://www.baidu.com",
    },
    {
        id: 2,
        name: "Tencent",
        url: "http://www.tencent.com",
    },
    {
        id: 6,
        name: "ByteDance",
        url: "http://www.bytedance.com",
    },
    {
        id: 8,
        name: "Microsoft",
        url: "http://www.microsoft.com",
    },
]
// jsonArrayCompanies.sort((a, b) => {
//     console.log(a.id,b.id);
//     return a.id - b.id;
// })
// for(let i=0;i<jsonArrayCompanies.length-1;i++){
//     for(let j=0;j<jsonArrayCompanies.length-1-i;j++){
//         if(jsonArrayCompanies[j].id>jsonArrayCompanies[j+1].id){
//             let temp = jsonArrayCompanies[j].id;
//             jsonArrayCompanies[j].id = jsonArrayCompanies[j+1].id;
//             jsonArrayCompanies[j+1].id = temp;
//         }
//     }
// }

// jsonArrayCompanies.sort((a, b) => {
//     return b.id - a.id;
// })

/*
    [3,10,2,6,8]
    i<4;
    i=0;   j<4 ; j=0;[3,10,2,6,8];  j=1,[3,2,10,6,8]; j=2,[3,2,6,10,8];  j=3,[3,2,6,8,10];
    i=1;   j<2 ; j=0;[2,3,6,8,10];
*/
// for(let i=0;i<jsonArrayCompanies.length-1;i++){
//     for(let j=0;j<jsonArrayCompanies.length-1-i;j++){ 
//         if(jsonArrayCompanies[j].id>jsonArrayCompanies[j+1].id){
//             let temp = jsonArrayCompanies[j].id;
//             jsonArrayCompanies[j].id = jsonArrayCompanies[j+1].id;
//             jsonArrayCompanies[j+1].id = temp;
//             console.log(jsonArrayCompanies);
//         }
        
//     }
// }
</script>
<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>