db.products.aggregate( [
   {
      $project: {
         item: 1,
         warehouses: "$instock.warehouse"
      }
   }
] )