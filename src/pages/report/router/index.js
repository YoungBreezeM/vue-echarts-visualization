
import routerCenter from "../../../lib/routerCenter";

import login from "../view/login/login";
import home from "../view/home/home";
import updatePwd from "../view/updatePwd/updatePwd";
import {verifyReportLogin} from "../../../lib/interceptor";

let routes = [
  {
    path: '/report',
    component: home,
    meta: {
      requireAuth: true,  // 该路由项需要权限校验
    },

  },
  {
    path: '/report/login',
    component:login
  },
  {
    path: '/report/setPassword',
    component:updatePwd
  }


];
//注册路由信息
let index = routerCenter.registerRouter(routes);
//验证登录
verifyReportLogin(index);

export default index;