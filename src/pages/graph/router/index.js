
import routerCenter from "../../../lib/routerCenter";
import verifyLogin from "../../../lib/interceptor";
let GraphIndex = () => import("../view/GraphIndex.vue");
let TempTable =()=>import("../components/tempTable/TempTable");
let ClassInfo =()=>import("../components/classInfo/ClassInfo");
let DormitoryInfo =()=>import("../components/dormitoryInfo/DormitoryInfo");
let UninputTable =()=>import("../components/unInputTable/UninputTable") ;
let TeacherInfo =()=>import("../components/teacherInfo/TeacherInfo");


let routes = [
    {
        path: "/graph",
        name: 'graph',
        component: GraphIndex
    },
    {
        path:"/graph/tempTable/:date",
        name:"tempTable",
        component:TempTable
    },
    {
        path:"/graph/classInfo/:className",
        name:"classInfo",
        component:ClassInfo
    },
    {
        path:"/graph/dormitoryInfo/:dormitoryNum",
        name:"dormitoryInfo",
        component:DormitoryInfo
    },
    {
        path:"/graph/unInputTable",
        name:"unInputTable",
        component:UninputTable
    },
    {
        path:'/graph/teacherInfo',
        name:"teacherInfo",
        component:TeacherInfo
    }
];

//注册路由
let index = routerCenter.registerRouter(routes);

//验证是否登录
verifyLogin(index);

export default index;