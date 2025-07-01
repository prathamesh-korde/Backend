db.employee.find();

db.employee.find({qty:25});

db.employee.find({item:{$in:["journal","mat"]}});

//AND 
db.employee.find({item:"journal",qty:25});


//Or
db.employee.findOne({item:{$in:["journal","mat"]}});

db.employee.find({$or:[{item:"mat"},{qty:85}]});
