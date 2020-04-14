import Http from "../Http/http";
import checkApi from "../utils/checkApi";

export let isOut = async()=>{
    let {data,object} = await Http({
        method:"get",
        url:"/outside/student",
    });
    return {data,object}
};