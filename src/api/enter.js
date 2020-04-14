import Http from "../Http/http";
import checkApi from "../utils/checkApi";

export let enter = async()=> {
    let {data,object} = await Http({
        method: "get",
        url: "/enter/student",
    });
    return {
        data,
        object
    }
};


export let unEnterMan = async ()=>{
    let {data,object} = await Http({
        method: "get",
        url: "unenter/detail/1",
    });
    return {
        data,
        object
    }
};