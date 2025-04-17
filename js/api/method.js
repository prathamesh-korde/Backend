let jsonRes = 
'{"fact":"A cats whiskers are thought to be a kind of radar, which helps a cat gauge the space it intends to walk through.","length":113}';
console.log(JSON.parse(jsonRes).fact);

let data = {
    name:"prathamesh korde",
    mark:96,
    age:20
}

let JsonObj = JSON.stringify(data);
console.log(JsonObj);