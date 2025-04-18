const url = "https://icanhazdadjoke.com/";
let btn = document.querySelector("button");
let para = document.querySelector("p");

btn.addEventListener("click",async()=>{
    let res = await getJokes();
    para.innerText=res;
})

async function getJokes(){
    try{
        const config = {headers:{Accept:"application/json"}}
        let res = await axios.get(url,config);
        return res.data.joke;
    }
    catch(er){
        console.log(er);
    }
}