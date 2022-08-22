import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import { HelperCore, HelperWebComm, HelperUserAccount, DataModelDataGroup } from "../util/HelperCore.js";
// import { ConfigBiz } from "../util/ConfigBiz.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const { HelperCore, HelperWebComm, HelperUserAccount, DataModelDataGroup } = require('../util/HelperCore.js');
const { ConfigBiz } = require('../util/ConfigBiz.js');
// 导航守卫
router.beforeEach((to, from, next) => {
    if (to.meta.AutoPolicy !== undefined && to.meta.AutoPolicy === 'NeedLogin') {
        // 获取登录凭证
        // window.localStorage.getItem('AccessToken')
        const token = window.localStorage.getItem('AccessToken');
        // 判断登录凭证是否存在
        if (token === null) {
            alert('去登陆');
            HelperUserAccount.handlerLogin();
        } else {
            next();
        }
    } else {
        next();
    }
});
// 请求拦截器
axios.interceptors.request.use(config => {
    // 获取token
    const token = window.localStorage.getItem('AccessToken');
    if (token !== null && config.headers !== undefined) {
        config.headers['authorization'] = token;
    }
    // if(window.sessionStorage.getItem('jsonArrayUserGroup')===null){
    //     config.data = {unused: 0};   
    // }
    return config;
})
// 响应拦截器
axios.interceptors.response.use(response => {
    response.data['strResponse'] = '已经经过响应拦截器';
    return response;
})
const app = createApp(App);
app.config.globalProperties.$HelperAxios = axios;
app.config.globalProperties.$str = 'hello, 全局属性';
app.config.globalProperties.$HelperCore = HelperCore;
app.config.globalProperties.$HelperWebComm = HelperWebComm;
app.config.globalProperties.$HelperUserAccount = HelperUserAccount;
app.config.globalProperties.$DataModelDataGroup = DataModelDataGroup;
app.config.globalProperties.$ConfigBiz = ConfigBiz;
app.use(ElementPlus)
app.use(store).use(router).mount('#app')
