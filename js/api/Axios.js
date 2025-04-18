let btn = document.querySelector("button");
let para = document.querySelector("#fact");

btn.addEventListener("click",async ()=>{
   let fact = await getFact();
   para.innerText=fact;
})

let url ="https://catfact.ninja/fact";
async function getFact(){
    try{
    let res = await axios.get(url);
    return res.data.fact;
    }
    catch(err){
        return "No Fact Found";
    }
}