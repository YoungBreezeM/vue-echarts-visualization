

import Http from "../Http/http";


export let getUserList = async(id)=>{
    let {data,object} = await Http({
        method:"get",
        url:"userList/1/"+id,
    });

    return {data,object}
};

export let getUser = async(id)=>{
    let {data,object} = await Http({
        method:"get",
        url:"user/"+id,
    });

    return {data,object}
};

export let getUserByNum = async (num)=>{
    let {data,object} = await Http({
        method:"get",
        url:"user/num/"+num,
    });

    return {data,object}
};

export let updateUser = async (num,password)=>{
    let {data,object} = await Http({
        method:"put",
        url:"/updateps/"+num+"/"+password,
    });

    return {data,object}
};