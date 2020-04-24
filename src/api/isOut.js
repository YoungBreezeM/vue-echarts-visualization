import Http from "../Http/http";


export let isOut = async(role)=>{
    let {data,object} = await Http({
        method:"get",
        url:"/outside/"+role,
    });
    return {data,object}
};

export let outSideTable = async(role,time)=>{
    let {data,object} = await Http({
        method:"get",
        url:"/outside/"+role+"/"+time,
    });
    return {data,object}
};