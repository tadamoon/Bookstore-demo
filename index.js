// npm stuff, seting up the scaffolding
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const methodOverride=require('method-override');

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

const categories=['Adventure', 'Romance', 'Horror', 'Sci-Fi', 'Kids+Teens', 'Educational'];
//////////////////////////////////////CRUD///////////////////////////////////////////////////////////////////////

//routes(products)
app.get('/books', async (req, res) =>{
    const {category}=req.query;
   
    if(category){
        const books=await Product.find({category})
        res.render('products/index', {books, category});  //list all the books for that category
    }else{
        const books=await Product.find({});
        res.render('products/index', {books, category: 'All'});  //list all the books 
    }
    
})

//create new books
app.get('/books/new', (req, res) =>{
    res.render('products/new', {categories});
})

app.post('/books', async (req, res) =>{
    const newBook=new Product(req.body);
    await newBook.save();
    console.log(newBook);
    res.redirect(`/books/${newBook._id}`)   //back to the show page
})


app.get('/books/:id', async (req, res) =>{
    const{ id } =req.params;
    const book = await Product.findById(id);
    console.log(book);
    res.render('products/show', { book });    //show page for individual book details
})

app.get('/books/:id/edit', async (req, res)=>{
    const{ id } =req.params;
    const book = await Product.findById(id);
    res.render('products/edit', {book, categories});
})

app.put('/books/:id', async (req, res)=>{
    const {id}=req.params;
    const book = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    
    res.redirect(`/books/${book._id}`)
})

app.delete('/books/:id', async (req, res)=>{
    const {id}=req.params;
    const deletedBook= await Product.findByIdAndDelete(id);
    res.redirect('/books')
})


app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000');
})