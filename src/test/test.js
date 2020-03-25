let a ={
    name:{
        a:"1",
        b:"2"
    },
    age:[
    ]

};
let b ={
    name:{
        a:"16"
    },
    age:[
       18
    ]
};
let tem = Object.assign({},a);

for (let i in b ){
    if(b[i] instanceof Array){
        tem[i] = Object.assign([],a[i],b[i])
    }else{
         tem[i] = Object.assign({},a[i],b[i])
    }


}
console.log(tem)
console.log(a)
console.log(b)
