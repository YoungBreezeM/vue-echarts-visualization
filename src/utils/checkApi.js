const Status ={
  110:()=>{
      window.location.href = "login.html?msg=110";
  },
  1001:()=>{

      window.location.href = "login.html?msg=1001";

  }
};

const checkApi = (responseData)=>{
    let {code} = responseData;
    console.log(code)
    if(Status[code]){
        console.log(code)
        Status[code]();
    }

};

export default checkApi;