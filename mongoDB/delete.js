db.employee.deleteMany({})


db.employee.deleteMany( { status: "D" } )


//Additional Methods

db.collection.findOneAndDelete().

findOneAndDelete() // provides a sort option. The option allows for the deletion of the first document sorted by the specified order.

db.collection.findAndModify().

db.collection.findAndModify() //provides a sort option. The option allows for the deletion of the first document sorted by the specified order.

db.collection.bulkWrite()