const mongoose=require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;
//make schema
const productSchema=new Schema({
   name: String,
       
   image: String,
   
   author: String,
       
   description: String,

   category: String,
       enum: ['Adventure', 'Romance', 'Horror', 'Sci-Fi', 'Kids+Teens', 'Education'],

   storyText: String,

   reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }
]

});
//delete query middleware
productSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Product = mongoose.model('Product', productSchema);

//export the model from the file
module.exports=Product;
