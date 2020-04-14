import Http from "../Http/http";
import checkApi from "../utils/checkApi";

const mapPeople = async (id)=>{
    let {data,object} = await Http({
        method:"get",
        url:"/china/"+id,
    });
    return {data,object}
};

export default mapPeople

