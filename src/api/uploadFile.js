/**
 * 文件上传
 */
import Http from "../Http/http";

export let fileUpload = async (file,role)=> {
    console.log(role)
    let param = new FormData();
    param.append('file',file);
    return Http({
        method: 'post',
        url: '/fileupload/'+role,
        headers: {"mimeType": "multipart/form-data"},
        data: param
    })
};