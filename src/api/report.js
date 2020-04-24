import Http from "../Http/http";

export let reportLogin = async(body)=>{
    let {data,object} = await Http({
        method:"post",
        data:body,
        url:"/record/login",
    });

    return {data,object}
};


export let reportTemp = async(body)=>{
    let {data,object} = await Http({
        method:"post",
        data:body,
        url:"/temReport",
    });

    return {data,object}
};

export let reportUpdatePwd = async(body)=>{
    let {data,object} = await Http({
        method:"put",
        data:body,
        url:"/upRecordPs",
    });

    return {data,object}
};

