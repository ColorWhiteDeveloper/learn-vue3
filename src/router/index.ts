import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name:'CMS',
    component: () => import('../views/CMS/MainView.vue'),
    children:[
      {
        path:'/KeepAlive',
        name:'KeepAlive',
        component: () => import('../views/CMS/KeepAlive.vue'),
        children:[
          {
            path:'KeepInput',
            name:'KeepInput',
            component: () => import('../components/KeepInput.vue'),
          },
          {
            path:'KeepImage',
            name:'KeepImage',
            component: () => import('../components/KeepImage.vue'),
          },
        ]
      },
      {
        path:'/DynamicComponent',
        name:'DynamicComponent',
        component: () => import('../views/CMS/DynamicComponent.vue'),
      },
      {
        path:'/CompositionAPI',
        name:'CompositionAPI',
        component: () => import('../views/CMS/CompositionAPI.vue'),
      },
      {
        path: '/Lifecycle',
        name: 'Lifecycle',
        component: () => import('@/views/CMS/Lifecycle.vue'),
      },
      {
        path: '/Communication',
        name: 'Communication',
        component: () => import('@/views/CMS/Communication.vue'),
      },
      {
        path: '/ScriptSetup',
        name: 'ScriptSetup',
        component: () => import('@/views/CMS/ScriptSetup.vue'),
      },
      {
        path: '/Slot',
        name: 'Slot',
        component: () => import('@/views/CMS/Slot.vue'),
      },
      {
        path: '/RouterParams',
        name: 'RouterParams',
        component: () => import('@/views/CMS/RouterParams.vue'),
      },
      {
        path: '/Promise',
        name: 'Promise',
        component: () => import('@/views/CMS/Promise.vue'),
      },
      {
        path: '/GlobalProperty',
        name: 'GlobalProperty',
        component: () => import('@/views/CMS/GlobalProperty.vue'),
      },
      {
        path: '/Axios',
        name: 'Axios',
        component: () => import('@/views/CMS/Axios.vue'),
      },
    ]
  },
  {
    path:'/PracticeMainView',
    name:'PracticeMainView',
    component: () => import('../views/Practice/PracticeMainView.vue'),
    children:[
      {
        path: '/demo1',
        name: 'demo1',
        component: () => import('@/views/Practice/demo1.vue'),
      },
      {
        path: '/demo2',
        name: 'demo2',
        component: () => import('@/views/Practice/demo2.vue'),
      },
      {
        path: '/demo3',
        name: 'demo3',
        component: () => import('@/views/Practice/demo3.vue'),
      },
      {
        path: '/demo4',
        name: 'demo4',
        component: () => import('@/views/Practice/demo4.vue'),
      },
      {
        path: '/demo5',
        name: 'demo5',
        component: () => import('@/views/Practice/demo5.vue'),
      },
      {
        path: '/demo6',
        name: 'demo6',
        component: () => import('@/views/Practice/demo6.vue'),
      },
      {
        path: '/demo7',
        name: 'demo7',
        component: () => import('@/views/Practice/demo7.vue'),
      },
      {
        path: '/demo8',
        name: 'demo8',
        component: () => import('@/views/Practice/demo8.vue'),
      },
      {
        path: '/demo9',
        name: 'demo9',
        component: () => import('@/views/Practice/demo9.vue'),
      },
      {
        path: '/demo10',
        name: 'demo10',
        component: () => import('@/views/Practice/demo10.vue'),
      },
      {
        path: '/demo11',
        name: 'demo11',
        component: () => import('@/views/Practice/demo11.vue'),
      },
    ]
  },
  {
    path:'/AdminMainView',
    name:'AdminMainView',
    meta:{
      AutoPolicy:'NeedLogin',
    },
    component:()=>import('../views/Admin/AdminMainView.vue'),
    children:[
      {
        path:'/AdminMainView/MessageList',
        name:'MessageList',
        component:()=>import('../views/Admin/MessageList.vue'),
      }
    ]
  },
  {
    path:'/MainViewWebCmd',
    name:'MainViewWebCmd',
    component:()=>import('../views/Admin/MainViewWebCmd.vue'),
    beforeEnter:(to,from,next)=>{
      alert('进入cmd');
      next();
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
