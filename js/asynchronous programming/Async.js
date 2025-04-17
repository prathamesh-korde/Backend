/*function getNum(){
    return new Promise((resolve,rejecte)=>{
        setTimeout(()=>{
            let num = Math.floor(Math.random()*10)+1;
            console.log(num);
            resolve();
        },1000)
    });
}
async function xyz(){
   await getNum();
   await getNum();
   await getNum();
}

*/

let heading=document.querySelector("h1");


function colorChange(color,delay){
    return new Promise((resolve,rejecte)=>{
        setTimeout(()=>{
            let num = Math.floor(Math.random()*5)+1;
            if(num> 3){
                rejecte("promice rejected");
            }
            heading.style.color = color;
            resolve("color changed sucessfully");
        },delay)
    })
}

(async function ChangeColor(){
   try{
    await colorChange("red",1000)
    await colorChange("orange",1000)
    await colorChange("green",1000)
   }catch(error){
    console.log("error found:",error);
   }
})();