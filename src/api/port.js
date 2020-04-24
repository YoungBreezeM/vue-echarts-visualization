import Http from "../Http/http";


export let getAllRecordFile = async()=>{
    let {data,object} = await Http({
        method:"get",
        url:"allRecordFile",
    });

    return {data,object}
};
