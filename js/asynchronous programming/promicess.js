/*
//callback Hell

function saveData(data,sucess,failure){
    let internetSpeed = Math.floor(Math.random()*10)+1;
    if(internetSpeed>=5){
        sucess();
    }else{
        failure();
    }
}

saveData("pratghamesh korde",()=>{
    console.log("data was saved sucessfully");
    saveData("hellow world",()=>{
        console.log("data2 was saved sucessfully");
        saveData("Navodaya",()=>{
            console.log("data3 was saved sucessfully");
        },()=>{
            console.log("data3 no't saved");
        })
    },()=>{
        console.log("data2 no't saved");
    })
},()=>{
    console.log("data no't saved");
});

*/


//Promice Chaining
function saveDb(data){
   return new Promise((sucess,failure)=>{
    let internetSpeed = Math.floor(Math.random()*10)+1;
    if(internetSpeed>=5){
        sucess("data was saved sucessifully");
    }
    else{
        failure("data not saved");
    }
   });
}

saveDb("data").then((result)=>{
    console.log("promice was resolved");
    console.log("result of promise:",result);
    return saveDb("data2");
}).then((result)=>{
    console.log("data 2 was saved");
    console.log("result of promise:",result);
    return saveDb("data 3")
}).then((result)=>{
    console.log("data 3 was saved");
    console.log("result of promise:",result);
})
.catch((error)=>{
    console.log("promice was rejected");
    console.log("error of promice:",error);
})