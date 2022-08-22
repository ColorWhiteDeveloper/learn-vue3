<template>
    <div class="demo4">
    </div>
</template>
<script lang="ts" setup>
let root : Array<any> =[1,null,2,3];
const inorderTraversal = (root:Array<any>)=>{
    if(root.length===0 || root.length===1){
        return root;
    }else{
        let res = [];
        for(let i=0;i<root.length;i=i+2){
            if(root[i+1]===null){
                res.push(root[i]);
            }else if(root[i+1]!==null){
                if(root[i+1]){
                    res.push(root[i+1]);
                }
                res.push(root[i]);
            }
        }
        return res;
    }
};
console.log(inorderTraversal(root));
// import { getCurrentInstance } from 'vue';
// interface ITree {
//     label: string;
//     tourl?: string;
//     children?: ITree[];
// }
// let treeArr: ITree[] = [
//     {
//         label: '叶子1',
//         children: [
//             {
//                 label: '叶子1-1',
//                 children: [
//                     {
//                         label: '叶子1-1-2',
//                     }
//                 ],
//             },
//             {
//                 label: '叶子1-2',
//                 children: [
//                     {
//                         label: '叶子1-2-2',
//                         tourl: '/demo4'
//                     }
//                 ],
//             },
//         ],
//     },
//     {
//         label: '叶子2',
//         children: [],
//     },
//     {
//         label: '叶子3',
//         tourl: '',
//         children: [],
//     },
// ];

// let i = 0;
// let j = 0;
// const { proxy }: any = getCurrentInstance();
// function setPageTitle(item: ITree, list: ITree[]):ITree|ITree[];
// function setPageTitle(item: ITree, list: ITree[]){
//     // console.log(item, list);
//     if(item.tourl!==undefined && item.tourl !== ''){
//         if(proxy.$route.path===item.tourl){
//             console.log('找到路由');
//             console.log(item.label);
//             return ;
//         }
//     }else if(item.children !== undefined && item.children.length!==0){
//         console.log('查找子孩子')
//         return setPageTitle(item.children[j],list);
//     }else if(i===list.length-1){
//         console.log('递归结束');
//         return ;
//     }else{
//         i++;
//         console.log('---开始递归-----');
//         return setPageTitle(list[i],list);
//     }
// }
// setPageTitle(treeArr[i], treeArr);
</script>
<style>
</style>