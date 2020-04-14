import Http from "../Http/http";
import checkApi from "../utils/checkApi";

const LoginApi = async (body)=>{
    let {data,object} = await Http({
        method:"Post",
        url:"/login",
        data:body
    });
    return {data,object}
};

export default LoginApi

