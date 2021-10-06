// npm stuff, seting up the scaffolding
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const AppError= require('./AppError');
const Product=require('./models/product');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

//mongoose stuff

mongoose.connect('mongodb://localhost:27017/bookApp', { useNewUrlParser: true, useUnifiedTopology: true})
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
app.get('/books', wrapAsync(async (req, res, next) =>{
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

app.post('/books', wrapAsync(async (req, res, next) =>{
                                        // handle mongoose error
    const newBook=new Product(req.body);
    await newBook.save();
   // console.log(newBook);
    res.redirect(`/books/${newBook._id}`)   //back to the show page
    
}))
//function to wrap our async callbacks in
function wrapAsync(fn){
    return function(req, res, next){
        fn(req, res, next).catch(e=>next(e))    //any errors in fn get passed to next
    }
}
//fn is below inside the function(async)
app.get('/books/:id', wrapAsync(async (req, res, next) =>{
    //this is fn below
    const{ id } =req.params;
    const book = await Product.findById(id);
    if(!book)
    {
        throw new AppError('OOOPS!, Looks like we do not have that book!', 404);
    }
   // console.log(book);
    res.render('products/show', { book });    //show page for individual book details
        
}))

app.get('/books/:id/edit', wrapAsync(async (req, res, next)=>{

    const{ id } =req.params;
    const book = await Product.findById(id);
    if(!book)
    {
       throw new AppError('OOOPS!, Looks like we do not have that book!', 404);
    }
    res.render('products/edit', {book, categories});
       
}))

app.put('/books/:id', wrapAsync(async (req, res, next)=>{
    
    const {id}=req.params;
    const book = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})   
    res.redirect(`/books/${book._id}`)
    
}))

app.delete('/books/:id', wrapAsync(async (req, res)=>{
    
    const {id}=req.params;
    const deletedBook= await Product.findByIdAndDelete(id);
    res.redirect('/books')
       
}))

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

app.use((err, req, res, next)=>{
    const {status=500, message='Something went wrong'}=err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000');
})