import Http from "../Http/http";
import checkApi from "../utils/checkApi";

export let getClassInfo = async(className,page)=>{
    
    let {data,object} = await Http({
        method:"get",
        url:"/classinfo/"+className+"/"+page,
    });

    return  {data,object}
};

export let getDormitoryInfo = async(dormitoryNum)=>{
    let {data,object} = await Http({
        method:"get",
        url:"dormitoryInfo/"+dormitoryNum,
    });

    return {data,object}
};

export let getAllDepartments = async()=>{
    let {data,object} = await Http({
        method:"get",
        url:"alldepartments",
    });

    return {data,object}
};

