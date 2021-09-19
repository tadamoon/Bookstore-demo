const mongoose=require('mongoose');
//require the product model
const Product=require('./models/product');
//connect to the DB
mongoose.connect('mongodb://localhost:27017/bookApp', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log('MONGO Connection Open!!!');
})
.catch(err =>{
    console.log('MONGO connection Error Detected!!!');
    console.log(err);
})

/*
const p=new Product({
    name: 'The Shipwreck',
    author: 'Charles Eddington',
    price: 12.99,
    category: 'Adventure'
})
p.save().then(p=>{
    console.log(p);
})
.catch(e => {
    console.log(e);
})
*/

const populateBooks=[
    {
        name: 'A Strange Flower',
        author: 'Christine Derryman',
        price: 15.99,
        category: 'Kids+Teens'
    },
    {
        name: 'The Treasure',
        author: 'Erica Fries',
        price: 13.99,
        category: 'Adventure'
    },
    {
        name: 'Angular JS',
        author: 'Patee Kinseeta',
        price:  35.99,
        category: 'Education'
    },
    {
        name: 'Old Maps',
        author: 'Mark Martin',
        price: 19.99,
        category: 'Education'
    },
    {
        name: 'Ceasar Adventures',
        author: 'Myles B.',
        price: 9.99,
        category: 'Kids+Teens'
    }
]


Product.insertMany(populateBooks)
.then(res =>{
    console.log(res);
})
.catch(e =>{
    console.log('Error populating the books!');
    console.log(e);
})