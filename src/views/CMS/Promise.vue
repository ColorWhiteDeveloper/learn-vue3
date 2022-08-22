<template>
    <div class="Promise">
        <span>这是promise对象界面</span>
        <main>
            <button @click="Chain">链式编程</button>
            <button @click="MoreThanOnePromise">多个promise</button>
            <button @click="Unifiedobject">统一返回promise对象</button>
        </main>
    </div>
</template>
<script lang="ts" setup>
// 链式编程
const Chain = () => {
    let flag: boolean = true;
    const Test = (val: boolean) => {
        return new Promise((resolve, reject) => {
            if (val) {
                setTimeout(() => {
                    resolve('这是第一步');
                }, 2000);
            } else {
                reject('这是错误的参数');
            }
        });
    }
    Test(flag).then(res => {
        console.log(res, 1);
        let str: string = '这是第二步';
        return str;
    }).then(res => {
        console.log(res, 2)
    })
        .catch(err => {
            console.log(err);
        })
}
// 多个promise
const MoreThanOnePromise = () => {
    let flag: boolean = true;
    const Test1 = (val: boolean) => {
        return new Promise<string>((resolve, reject) => {
            if (val) {
                setTimeout(() => {
                    resolve('这是测试函数1,等待2秒');
                }, 2000);
            } else {
                setTimeout(() => {
                    reject('这是测试函数1错误的参数');
                }, 2000)
            }
        })
    }
    const Test2 = (val: boolean) => {
        return new Promise<string>((resolve, reject) => {
            if (val) {
                setTimeout(() => {
                    resolve('这是测试函数2,等待3秒');
                }, 3000);
            } else {
                setTimeout(() => {
                    reject('这是测试函数2错误的参数');
                }, 3000)
            }
        })
    }
    let test1 = Test1(flag), test2 = Test2(flag);
    Promise.all([test1, test2]).then((values) => {
        console.log(values);
    }).catch(err => {
        console.log(err);
    })
}
// 统一返回promise对象
const Unifiedobject = () => {
    let flag: boolean = false;
    const Test = (val: boolean) => {
        if (val) {
            return new Promise((resolve, reject) => {
                resolve({val1:'A',val2:"B"});
            })
        }else{
            return Promise.resolve({val1:'C',val2:"D"});
            // return {val1:'C',val2:"D"};
        }
    }
    // console.log(1);
    Test(flag).then((res)=>{
        console.log(res);
    })
}
</script>