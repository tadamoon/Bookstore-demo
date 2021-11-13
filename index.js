// npm stuff, seting up the scaffolding
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const AppError= require('./AppError');
const Product=require('./models/product');
const ejsMate=require('ejs-mate');
const  catchAsync=require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');
const {productSchema, reviewSchema}=require('./schemas.js');
const Review=require('./models/review');

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

const validateStory=(req, res, next)=>{
    
     const {error}=productSchema.validate(req.body);
     if(error){
         const msg=error.details.map(el=>el.message).join(',')
         throw new ExpressError(msg, 400);
     }else {
         next();
     }    
}

const validateReview=(req, res, next)=>{
    
    const {error}=reviewSchema.validate(req.body);
    if(error){
        const msg=error.details.map(el=>el.message).join(',')
        throw new ExpressError(msg, 400);
    }else {
        next();
    }    
}

//mongoose stuff

mongoose.connect('mongodb://localhost:27017/storyApp', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('MONGO Connection Open!!!');
})
.catch(err =>{
    console.log('MONGO connection Error Detected!!!');
    console.log(err);
})

const categories=['Adventure', 'Romance', 'Horror', 'Sci-Fi', 'Kids+Teens', 'Education'];
//////////////////////////////////////CRUD///////////////////////////////////////////////////////////////////////

//routes(products)
app.get('/books', catchAsync(async (req, res, next) =>{
                                                 //try catch pattern for handling async errors
    const {category}=req.query;
    if(category){
        const books=await Product.find({category})
        res.render('products/index', {books, category});  //list all the books for that category
    }else{
        const books=await Product.find({});
        res.render('products/index', {books, category: 'All'});  //list all the books 
    }
       
}))

//create new books
app.get('/books/new', (req, res) =>{
    //throw new AppError('NOT ALLOWED', 401);
    res.render('products/new', {categories});
})

app.post('/books', validateStory, catchAsync(async (req, res, next) =>{
  
     const book=new Product(req.body.book);
    await book.save();
   // console.log(newBook);
    res.redirect(`/books/${book._id}`)   //back to the show page
    
}))
/*
//function to wrap our async callbacks in
function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(e=>next(e))    //any errors in fn get passed to next
    }
}
*/
//fn is below inside the function(async)
app.get('/books/:id', catchAsync(async (req, res, next) =>{
//Only This Works to resolve bad book id errors!!!
    try {
        const book = await Product.findById(req.params.id).populate('reviews');
        //console.log(book)
        res.render("products/show", { book });
        } catch(err) {
            throw new Error('Page Not Found!');
        }


/*    //this is fn below DOESNT WORK!!!
    const{ id } =req.params;
    const book = await Product.findById(id);
    if(!book)
    {
        throw new ExpressError('OOOPS!, Looks like we do not have that story!', 404);
    }
   // console.log(book);
    res.render('products/show', { book });    //show page for individual book details
  */      
}))

app.get('/books/:id/edit', catchAsync(async (req, res, next)=>{

    const{ id } =req.params;
    const book = await Product.findById(id);
    if(!book)
    {
       throw new AppError('OOOPS!, Looks like we do not have that story!', 404);
    }
    res.render('products/edit', {book, categories});
       
}))

app.put('/books/:id', validateStory, catchAsync(async (req, res, next)=>{
    
    const {id}=req.params;
    const book = await Product.findByIdAndUpdate(id, req.body.book, { runValidators: true, new: true})   
    res.redirect(`/books/${book._id}`)
    
}))
//delete a story
app.delete('/books/:id', catchAsync(async (req, res)=>{
    
    const {id}=req.params;
    const deletedBook= await Product.findByIdAndDelete(id);
    res.redirect('/books')
       
}))
//reviews route
app.post('/books/:id/reviews', validateReview, catchAsync(async(req, res, next)=>{
    const book= await Product.findById(req.params.id);
    const review=new Review(req.body.review);
    book.reviews.push(review);
    await review.save();
    await book.save();
    res.redirect(`/books/${book._id}`);
}))

app.delete('/books/:id/reviews/:reviewId', catchAsync(async(req, res)=>{
    const{id, reviewId}=req.params;
    await Product.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});    //pull operator removes from anexisting array all instances of a value that match a specified condition(mongoDB)
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/books/${id}`);
}))

/*
const handleValidationError=err=>{
    console.dir(err);
    return new AppError(`Input Error...${err.message}`, 400);
}

app.use((err, req, res, next)=>{
    console.log(err.name);
    if(err.name==='ValidationError'){
        err=handleValidationError(err);
    }
    next(err);
})

*/

app.all('*', (req, res, next)=>{
   next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next)=>{
   
    const {statusCode=500}=err;
    if(!err.message) err.message='Something Went Wrong...'
    res.status(statusCode).render('error', {err})
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000');
})