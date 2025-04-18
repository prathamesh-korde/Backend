/*
//using promices
let url ="https://catfact.ninja/fact";
fetch(url)
.then((responce)=>{
    console.log(responce);
   return responce.json()
}).then((data)=>{
    console.log("data1=",data.fact);
    return fetch(url);
})
.then((responce)=>{
    return responce.json();
}).then((data2)=>{
    console.log("data2=",data2.fact);
})
.catch((error)=>{
    console.log(error);
})

*/
//using async await functions


let url ="https://catfact.ninja/fact";
(async function getFacts(){
    try{
        let res = await fetch(url);
    let data =await res.json();
    console.log(data.fact);

    let res2 = await fetch(url);
    let data2 =await res2.json();
    console.log(data2.fact);
    }
    catch(e){
        console.log(e);
    }
}

)();