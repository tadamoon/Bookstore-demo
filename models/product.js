const mongoose=require('mongoose');

//make schema
const productSchema=new mongoose.Schema({
   name: {
       type: String,
       required:  true
   },
   author: {
       type: String,
       required: true
   },
   price: {
       type: Number,
       required: true,
       min: 0
   },
   category:{
       type: String,
       enum: ['Adventure', 'Romance', 'Horror', 'Sci-Fi', 'Kids+Teens', 'Educational']
   }

})

//compile the model
const Product = mongoose.model('Product', productSchema);

//export the model from the file
module.exports=Product;
