/*Factory Function

function personmaker(name,age){
    const person={
        name:name,
        age:age,
        talk(){
            console.log(`hii may name is ${this.name}`);
        },
    }
return person;
}

let p1=personmaker("pratha",21);
let p2=personmaker("pritesh",20);

*/

//constructer - dos't return anything and start with capital letter
function Person(name,age){
    this.name=name;
    this.age=age;
    
}
Person.prototype.talk=function (){
    console.log(`hi, my name is ${this.name}`);
};

let p1=new Person("pratham",21);
let p2=new Person("pritesh",20);