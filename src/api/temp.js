import Http from "../Http/http";


export let temp = async()=>{
    let {data,object} = await Http({
        method:"get",
        url:"/temp/student",
    });

    return {data,object}
};

export let tempLine = async ()=>{
    let {data,object} = await Http({
        method:"get",
        url:"/temp/line/student",
    });
    return {data,object};
};

export let unusualTemp = async (time)=>{
    let {data,object} = await Http({
        method:"get",
        url:"/unusual/student/"+time,
    });
    return {data,object};
};