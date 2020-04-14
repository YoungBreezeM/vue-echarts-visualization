import Http from "../Http/http";
import checkApi from "../utils/checkApi";

export let getClassInfo = async(className)=>{
    let {data,object} = await Http({
        method:"get",
        url:"classinfo/"+className,
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
