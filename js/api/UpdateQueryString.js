let url ="http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");
let country ="india";


btn.addEventListener("click",async()=>{
    let country = document.querySelector("input").value;
    let collages = await getcollages(country);
    show(collages);
});

function show(collages){
    let list = document.querySelector("#list");
    list.innerText="";
    for(collage of collages){
        console.log(collage.name);

        let li = document.createElement("li");
        li.innerText=collage.name;
        list.appendChild(li);
    }
}
async function getcollages(country){
    try{
        let res=await axios.get(url+country);
    return res.data;
    }catch(err){
        console.log(err);
        return [];
    }
}
