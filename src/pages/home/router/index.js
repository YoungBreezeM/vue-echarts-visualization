import Vue from 'vue';
import VueRouter from "vue-router";
import store from "../../../store/store.js";
import types from "../../../store/types";

let Index = () => import('../view/Index.vue');
let IndexHome = () => import("../../../components/common/IndexHome/IndexHome");
let Port = () => import('../../../components/management/port/Port.vue')
let User = () => import('../../../components/management/user/User.vue')
Vue.use(VueRouter); //全局注册路由

let routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    },
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '首页',
        component: IndexHome
      },
      {
        path: '/port',
        name: '数据导入、导出',
        component: Port
      },
      {
        path: '/user',
        name: '用户管理',
        component: User
      }
    ]
  }
];
// 页面刷新时，重新赋值token
if(window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

let index = new VueRouter({
  mode: 'history',
  routes: routes
});

index.beforeEach((to, from, next) => {
  // if (to.matched.some((r) => r.meta.requireAuth)) {
  //   // eslint-disable-next-line no-undef
  //   if (localStorage.token) {   //判断是否已经登录
  //     console.log(JSON.parse(localStorage.token).role);
  //     if(JSON.parse(localStorage.token).role[0]==="admin"){
  //       next();
  //     }else {
  //       window.location = "/whole/message"
  //     }
  //
  //   } else {
  //     next({
  //       path: '/',
  //       // query: { redirect: to.fullPath }
  //     });
  //   }
  // } else {
  //   next();
  // }
  next()
});
export default index;