<template>
    <div class="demo8">
        <div class="header">
            <div class="header-title"><span>商品列表</span></div>
            <div class="header-funs">
                <div class="funs-item" v-for="item in goods" :key="item.name">
                    <span>{{ item.name }}</span>
                    <el-input v-model="item.myval" :placeholder="item.tip" />
                </div>
                <div class="funs-btn" style="padding-left: 10px;">
                    <el-button type="primary" @click="search">搜索</el-button>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="nav">
                <span v-for="item in stateList" :key="item.name" class="nav-item">{{ item.name }}</span>
                <span class="create-item" @click="AddGoods"> + 创建商品</span>
                <div class="nav-funs">
                    <span v-if="checkedLIst.length !== 0" v-for="item in checkedFunsList" :key="item.label"
                        class="nav-funs-item" @click="checkedFuns(item)">{{
                                item.label
                        }}</span>
                </div>
            </div>
            <div class="show">
                <el-table ref="multipleTableRef" :data="setShowList(currentList)" style="width: 100%" max-height="200"
                    :header-cell-style="{ 'font-size': '10px', 'background-color': 'rgb(250, 250, 250)', 'font-weight': 'normal', 'color': 'rgb(37, 37, 37)' }"
                    @selection-change="handleSelectionChange" :row-key="getKey">
                    <el-table-column type="selection" width="50" :reserve-selection="true" />
                    <el-table-column property="id" label="商品ID" width="70" />
                    <el-table-column property="imgUrl" label="商品图片" width="80">
                        <template #default="scope">
                            <el-image style="width: 50px; height: 50px" :src="scope.row.imgUrl" fit=""></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column property="name" label="商品名称" width="80" />
                    <el-table-column property="price" label="商品价格" width="80">
                        <template #default="scope1">
                            <div class="price-area">
                                <span>{{ setToFixed(scope1.row.price) }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="saleOut" label="总销量" width="70" />
                    <el-table-column property="inventory" label="库存总量" width="80" />
                    <el-table-column property="state" label="状态" width="60">
                        <template #default="scope">
                            <div class="state-area">
                                <span
                                    style="border: 1px solid rgb(183, 235, 143);display:block;background-color: rgb(246, 255, 237);color:rgb(82, 196, 26)">{{
                                            setState(scope.row.state)
                                    }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="sortNumber" label="排序" width="50" />
                    <el-table-column label="操作" width="100">
                        <template #default="scope">
                            <div class="btn-area"
                                style="display:flex;justify-content: space-around;color: rgb(24, 144, 255);">
                                <span>编辑</span>
                                <span @click="setDelete(scope.row)">删除</span>
                                <!-- <el-popconfirm confirm-button-text="OK" cancel-button-text="No, Thanks"
                                    :icon="InfoFilled" icon-color="#626AEF" title="Are you sure to delete this?"
                                    @confirm="handleconfirm">
                                    <template #reference>
                                        <span>删除</span>
                                    </template>
                                </el-popconfirm> -->
                                <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose"
                                    :append-to-body="mytrue">
                                    <span>您确定要删除此条记录吗?</span>
                                    <template #footer>
                                        <span class="dialog-footer">
                                            <el-button @click="dialogVisible = false">取消</el-button>
                                            <!-- trueDelete(scope.row) -->
                                            <el-button type="primary" @click="trueDelete()">确定</el-button>
                                        </span>
                                    </template>
                                </el-dialog>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="bottom">
            <el-pagination small background layout="sizes,prev, pager, next" :total="showList.length"
                v-model:page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                v-model:currentPage="pageIndex" :page-sizes="[2, 5, 7, 10]" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, Ref, ref, watch } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessageBox } from 'element-plus'
const { proxy }: any = getCurrentInstance();
// 定义初始数据接口
interface IData {
    id: number;
    imgUrl: any;
    name: string;
    price: number;
    saleOut: number;
    inventory: number;
    state: number;
    sortNumber: number;
    addTime?: string;
}
// 定义商品功能接口
interface IGoods {
    name: string;
    tip: string;
    myval: string | number | null;
}
// 定义初始数据源
let dataList: Ref<IData[]> = ref([
    {
        id: 1,
        imgUrl: require('../../static/tou.jpg'),
        name: '手机1',
        price: 1299.00,
        saleOut: 0,
        inventory: 300,
        state: 1,
        sortNumber: 100,
    },
    {
        id: 2,
        imgUrl: require('../../static/tou.jpg'),
        name: '手机2',
        price: 1299.00,
        saleOut: 20,
        inventory: 280,
        state: 0,
        sortNumber: 100,
    },
    {
        id: 3,
        imgUrl: require('../../static/tou.jpg'),
        name: '手机3',
        price: 1299.00,
        saleOut: 20,
        inventory: 280,
        state: 0,
        sortNumber: 100,
    }
])
// 定义展示的数据源
let showList: Ref<IData[]> = ref([]);
// watch(showList,(newVal,oldVal)=>{
//     if(newVal.length!==oldVal.length){

//     }
// },{deep:true})
const mytrue = true;
// 定义当前页展示
let currentList: Ref<IData[]> = ref([]);
// 定义定义页面商品字符串
const goods: Ref<IGoods[]> = ref([
    {
        name: '商品名称:',
        tip: '请输入商品名称',
        myval: null,
    },
    {
        name: '商品编码:',
        tip: '请输入商品编码',
        myval: null,
    },
    {
        name: '商品分类:',
        tip: '请输入商品分类',
        myval: null,
    }
])
watch(goods,(newVal,oldVal)=>{
    newVal.forEach(item=>{
        if(item.myval==''){
            item.myval = null;
        }
    })
},{deep:true});
// 定义选中列表
let checkedLIst: Ref<IData[]> = ref([]);
// 定义状态列表
const stateList = [
    {
        name: '全部',
        state: 2,
    },
    {
        name: '出售中',
        state: 1,
    },
    {
        name: '已下架',
        state: -1,
    },
    {
        name: '已售罄',
        state: 0,
    }
]
// 定义选中操作
const checkedFunsList = [
    {
        id: 1,
        label: '上架',
    },
    {
        id: 2,
        label: '下架',
    },
    {
        id: 3,
        label: '删除',
    }
]
// 定义pagesize
let pageSize: Ref<number> = ref(2);
// 定义pageindex
let pageIndex: Ref<number> = ref(1);
const handleSelectionChange = (val: IData[]) => {
    checkedLIst.value = [];
    val.forEach(item => {
        checkedLIst.value.push(item);
    })
}
// 设置状态
const setState = (val: number) => {
    if (val === 1) {
        return '上架';
    } else if (val === -1) {
        return '下架';
    } else if (val === 0) {
        return '售罄';
    }
}
// 取小数
const setToFixed = (val: number) => {
    return val.toFixed(2);
}
// 设置展示条数
const setShowList = (arr: IData[]) => {
    arr = showList.value.slice((pageIndex.value - 1) * pageSize.value, pageIndex.value * pageSize.value);
    return arr;
}
// 当前页改变
const handleCurrentChange = (val: number) => {
}
// pagesize改变
const handleSizeChange = (val: number) => {
    pageSize.value = val;
}
// 设置展示nav操作
const isShowFuns = () => {

}
// 这是行key
const getKey = (row: any) => {
    return row.id;
}
// 搜索入口
const search = () => {
    let time = 0;
    goods.value.forEach((item, index) => {
        if (item.myval !== null) {
            exeSearach(index, item.myval);
        }else{
            time++;
        }
    })
    if(time===goods.value.length){
        showList.value = JSON.parse(JSON.stringify(dataList.value));
    }
}
// 筛选搜索
const exeSearach = (index: number, desc: string | number | null) => {
    showList.value = [];
    if (index === 0) {
        myname(desc);
    } else if (index === 1) {
        myid(desc);
    } else if (index === 2) {
        myname(desc);
    }
}
// 名称搜索
function myname(desc: string | number|string|null) {
    dataList.value.forEach(item => {
        if (item.name.indexOf(<string>desc) > -1) {
            showList.value.push(item);
        }
    })
}
// id搜索
function myid(desc: string | number|null) {
    dataList.value.forEach(item => {
        if (item.id == desc) {
            showList.value.push(item);
        }
    })
}
// 创建新的商品
function AddGoods() {
    if (dataList.value.length !== 0) {
        dataList.value.sort((a, b) => a.id - b.id);
        dataList.value.push({
            id: dataList.value[dataList.value.length - 1].id + 1,
            imgUrl: require('../../static/tou.jpg'),
            name: '手机' + (dataList.value[dataList.value.length - 1].id + 1),
            price: 1299.00,
            saleOut: 20,
            inventory: 280,
            state: 0,
            sortNumber: 100,
        });
    }else{
        dataList.value.push({
            id: 1,
            imgUrl: require('../../static/tou.jpg'),
            name: '手机1',
            price: 1299.00,
            saleOut: 20,
            inventory: 280,
            state: 0,
            sortNumber: 100,
        });
    }
    showList.value = JSON.parse(JSON.stringify(dataList.value));
    search();
}
// nav-funs入口
function checkedFuns(val: { id: number, label: string }) {
    if (val.id === 1) {
        updateState();
    } else if (val.id === 2) {
        updateMystate();
    } else if (val.id === 3) {
        mydelete();
    }
}
// nav-funs-上架
function updateState() {
    checkedLIst.value.forEach(item => {
        dataList.value.forEach(child => {
            if (child.id === item.id && child.state !== 1) {
                child.state = 1;
            }
        })
    })
    showList.value = JSON.parse(JSON.stringify(dataList.value));
    search();
}
// nav-funs-下架
function updateMystate() {
    checkedLIst.value.forEach(item => {
        dataList.value.forEach(child => {
            if (child.id === item.id && child.state !== -1) {
                child.state = -1;
            }
        })
    })
    showList.value = JSON.parse(JSON.stringify(dataList.value));
    search();
}
// nav-funs-删除
function mydelete() {
    if (dataList.value.length !== 0) {
        for (let i = 0; i < dataList.value.length; i++) {
            for (let j = 0; j < checkedLIst.value.length; j++) {
                if (dataList.value[i].id === checkedLIst.value[j].id) {
                    dataList.value.splice(i, 1);
                    if (dataList.value.length !== 0) {
                        i = 0; j = 0;
                    } else {
                        break;
                    }
                }
            }
        }
        checkedLIst.value = [];
        showList.value = JSON.parse(JSON.stringify(dataList.value));
        search();
    }
}
let deleteNode: IData[] = [];
function setDelete(val: IData) {
    deleteNode = [];
    deleteNode.push(val);
    dialogVisible.value = true;
}
function trueDelete() {
    for (let i = 0; i < dataList.value.length; i++) {
        if (dataList.value[i].id === deleteNode[0].id) {
            dataList.value.splice(i, 1);
            break;
        }
    }
    showList.value = JSON.parse(JSON.stringify(dataList.value));
    search();
    dialogVisible.value = false;
}
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
onMounted(() => {
    showList.value = JSON.parse(JSON.stringify(dataList.value));
})
</script>
<style>
.demo8 .header {
    text-align: left;
}

.demo8 .header .header-title {
    padding-top: 10px;
    padding-bottom: 10px;
}

.demo8 .header .header-funs {
    display: flex;
    padding-bottom: 10px;
}

.demo8 .funs-item {
    display: flex;
    padding-left: 10px;
    flex: 2;
    height: 30px;
    align-items: center;
}

.demo8 .funs-btn {
    flex: 1;
    display: flex;
    align-items: center;
}

.demo8 .funs-btn .el-button {
    height: 24px;
}

.demo8 .funs-item span {
    font-size: 12px;
    flex: 3;
}

.demo8 .funs-item .el-input {
    flex: 8;
    height: 22px;
}

.demo8 .el-table .cell {
    text-align: center;
    font-size: 10px;
    /* padding: 0; */
}

.demo8 .nav-item {
    border: 1px solid rgb(217, 217, 217);
    padding: 5px 10px;
    border-radius: 2px;
}

.demo8 .nav {
    padding-bottom: 20px;
    display: flex;
    text-align: left;
    font-size: 10px;
    color: rgb(89, 89, 89);
}

.demo8 .nav .nav-funs {
    display: flex;
    margin-left: 20px;
}

.demo8 .nav .nav-funs-item {
    border: 1px solid rgb(217, 217, 217);
    padding: 5px 10px;
    border-radius: 2px;
}

.demo8 .create-item {
    background-color: rgb(64, 169, 255);
    color: white;
    margin-left: 20px;
    padding: 6px 10px;
    border-radius: 2px;
}

.demo8 .nav .nav-item:hover,
.demo8 .nav .nav-funs-item:hover {
    border: 1px solid rgb(24, 144, 255);
    color: rgb(24, 144, 255);
    font-size: 10px;
}

.demo8 .el-table__row .el-table__cell {
    padding: 2;
}
</style>