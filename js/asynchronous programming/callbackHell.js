/*let heading=document.querySelector("h1");
function colorChange(color,delay,Nxtcolor){
    setTimeout(()=>{
        heading.style.color = color;
        if(Nxtcolor){
            Nxtcolor();
        }
    },delay);
}


colorChange("red",2000,()=>{
    colorChange("yellow",3000,()=>{
        colorChange("green",1000);
    });
});

//callback nexting - callback hell


*/
let heading=document.querySelector("h1");
function colorChange(color,delay){
    return new Promise((resolve,rejecte)=>{
        setTimeout(()=>{
            heading.style.color = color;
            resolve("color changed sucessfully");
        },delay)
    })
}
colorChange("red",1000).then(()=>{
    colorChange("orange",1000);
}).then(()=>{
    colorChange("green",1000);
})




