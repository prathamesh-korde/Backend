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
/*
function Person(name,age){
    this.name=name;
    this.age = age;
}

Person.prototype.talk=function(){
    console.log(`hii my name is ${this.name}`);
};

p1 = new Person("ajay",21);

*/
/*
Classes-
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    talk(){
        console.log(`hi my name is ${this.name}`);
    }
}

p1=new Person("prtham",21);
p2=new Person("pran",21);
*/

// Inheritance
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    talk(){
        console.log(`hii my name is ${this.name}`);
    }
}

class student extends Person{
    constructor(name,age,mark){
        super(name,age);
        this.mark=mark;
    }
}

s1=new student("pratham",21,99);

class Teacher extends Person{
    constructor(name,age,sub){
        super(name,age);
        this.sub=sub;
    }
}

t1=new Teacher("adam",40,"math");