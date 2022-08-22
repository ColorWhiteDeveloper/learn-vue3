<template>
    <div class="demo1">
        <input type="text" v-model="val"> <br>
        <el-button type="primary" @click="throttle">节流</el-button>
    </div>
</template>
<script lang="ts" setup>
    import {Ref, ref,watch} from 'vue';
    let val : Ref<null|string|number>= ref(null);
    function test(val1:string,val2:string):string;
    function test(val1:number,val2:number):number;
    function test(val1:string|number,val2:string|number):string|number{
        if(typeof val1 ==='string' && typeof val2==='string'){
            return val1 + val2;
        }else if(typeof val1 ==='number' && typeof val2==='number'){
            return val1 + val2;
        }else{
            return '';
        }
    }
    // console.log(test(1,2));
    // console.log(test('1',2));
    function practice():void{
        // let a = [1,2,3,4,5,6];
        // for(var i=0;i<a.length;i++){
        //     if(a[i]==2||a[i]==3){
        //         a.splice(i,1);
        //     }
        // }
        // console.log(a);
        // console.log([1,2,3,57,4,2,10].splice(3,1).join());
        let arr = [10,1,5,6];
        for(var i=0;i<arr.length;i++){
            if(arr[i]>9){
                arr.push(11);
            }
        }
        // console.log(arr);
    }
    // 答案是1,3,4,5,6
    // 答案是57;
    // 死循环 [10,1,5,6,11......]
    // practice();
    let Timer : Array<any> = ['timer1','timer2'];
    watch(val,(newVal,oldVal)=>{
        clearTimeout(Timer[0]);
        Timer[0] = setTimeout(()=>{
            if(newVal){
                console.log(newVal);
            }
        },5000)
        // console.log(newVal);
    });
    let time = 100;
    const throttle = ()=>{
        clearTimeout(Timer[1]);
        console.log('in');
        let t1 : any = 0;
        Timer[1] = setTimeout(()=>{
            let t2 : any = new Date();
            if(t2-t1>time){
             console.log('out');   
            }
        },2000)
    }
</script>
