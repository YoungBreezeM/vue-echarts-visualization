import Http from "../Http/http";
import checkApi from "../utils/checkApi";

export let populationNum = async (id)=>{
    let {data,object} = await Http({
        method:"get",
        url:"population/"+id
    });
    return {data,object};
};