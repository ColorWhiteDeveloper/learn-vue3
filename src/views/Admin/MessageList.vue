<template>
    <div class="messagelist">
        <main>
            <div class="top">
                <el-table :data="showList" max-height="350">
                  <el-table-column label="编号" prop="DF03000" width="160"></el-table-column>
                  <el-table-column label="标题备注" prop="TitleMark"></el-table-column>
                  <el-table-column label="创建日期" prop="StrCT050"></el-table-column>
                  <el-table-column label="修改日期" prop="StrMT050"></el-table-column>
                  <el-table-column label="AL" prop="NumAL040"></el-table-column>
                  <el-table-column label="TE" prop="NumTE030"></el-table-column>
                  <el-table-column label="操作">
                    <template #default="scope">
                        <div class="change-area">
                            <span>修改</span>
                            <span>删除</span>
                        </div>
                    </template>
                  </el-table-column>
                </el-table>
            </div>
            <div class="bottom">
                <el-pagination background small layout="prev, pager, next" :total="totalNum" :page-size="pageSize"
                    v-model:current-page="pageIndex" @current-change='handlePage' />
            </div>
        </main>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onBeforeMount, Ref, ref } from 'vue';
const { proxy }: any = getCurrentInstance();
let totalNum: Ref<number> = ref(0);
let pageSize: Ref<number> = ref(20);
let pageIndex: Ref<number> = ref(1);
let showList : Ref<any[]> = ref([]);
onBeforeMount(() => {
    getData();
})
const handlePage = (val: number) => {
    pageIndex.value = val;
    getData();
}
function getData(){
    proxy.$HelperAxios({
        method: 'post',
        url: proxy.proxy.$ConfigBiz.jsonFuncOption().API_Local.strURL + '/DataAccessWithGroup/QueryPagingList',
        data: {
            CurrentDataGroup: 50012,
            PageIndex: pageIndex.value,
            PageSize: pageSize.value,
        }
    }).then((res: any) => {
        console.log(res);
        totalNum.value = res.data.Payload.NumRowQuantity;
        showList.value = res.data.Payload.DataList;
    })
}
</script>
<style>
</style>