const mongoose=require('mongoose');

//make schema
const productSchema=new mongoose.Schema({
   name: {
       type: String,
       required:  [true, 'book name cannot be blank']
   },
   image: {
       type: String

   },
   author: {
       type: String,
       required: [true, 'author cannot be blank']
   },
   description: {
       type: String,
       required: [true, 'description cannot be blank']
   },
   category:{
       type: String,
       enum: ['Adventure', 'Romance', 'Horror', 'Sci-Fi', 'Kids+Teens', 'Education']
   },
   storyText:{
       type: String,
       required:[true, 'You must include your short story']
   }

})

//compile the model
const Product = mongoose.model('Product', productSchema);

//export the model from the file
module.exports=Product;
