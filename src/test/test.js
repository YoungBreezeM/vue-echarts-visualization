





let tabList = new Map();

tabList.set("/home",{route:"/home",name:"首页"});
// tabList.delete("/home")

for (let [,value] of tabList.entries()){
    console.log(value)
}
