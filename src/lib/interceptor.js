
/**
 * @param router  拦截该路由验证登录
 * */
export default function verifyLogin(router) {
    router.beforeEach((to, from, next) => {
        if (to.matched.some((r) => r.meta.requireAuth)) {
          if(window.localStorage.token){
              next()
          }else {
              window.location.href ="/login.html"
          }
        } else {
          next();
        }
    });
}

