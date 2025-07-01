db.employee.find().limit(1)

db.employee.find().skip(1);//skip document

db.employee.find().sort({qty:1})//accending order sorting 

db.employee.find().sort({qty:-1})//descinding order sorting
