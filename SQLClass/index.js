const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'it',
    password:'Psk@rde123'
  });
try{
connection.query("show tables",(err,result)=>{
    if(err) {
        throw err;
    }
    console.log(result);
    console.log(result.length);
  })
}
catch(err){
   console.log(err);
}

connection.end();

let getRandomUser = () => {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }