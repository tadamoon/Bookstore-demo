const mongoose=require('mongoose');

//make schema
const productSchema=new mongoose.Schema({
   name: {
       type: String,
       required:  [true, 'book name cannot be blank']
   },
   author: {
       type: String,
       required: [true, 'author cannot be blank']
   },
   price: {
       type: Number,
       required: [true, 'price cannot be blank'],
       min: 0
   },
   category:{
       type: String,
       enum: ['Adventure', 'Romance', 'Horror', 'Sci-Fi', 'Kids+Teens', 'Education']
   }

})

//compile the model
const Product = mongoose.model('Product', productSchema);

//export the model from the file
module.exports=Product;
