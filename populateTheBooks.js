
const mongoose=require('mongoose');
//require the product model
const Product=require('./models/product');
//connect to the DB
mongoose.connect('mongodb://localhost:27017/storyApp', { useNewUrlParser: true, useUnifiedTopology: true})
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
        image: 'https://media.istockphoto.com/photos/portrait-of-millennial-parents-with-kids-outdoor-picture-id1256558920?b=1&k=20&m=1256558920&s=170667a&w=0&h=oSpGSJZ5t1tsQIX8Q_X9B_pJzMdnnXUX9uelpeEqyAE=',
        author: 'Christine Derryman',
        description: 'This story is about the unlikely friendship between a man and a plant. Recommended for those with a green thumb!' ,
        category: 'Kids+Teens',
        storyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, dignissimos harum sit provident ex aspernatur, eum molestias, nisi animi temporibus eos qui optio fugiat dolore facere vel rerum at blanditiis.'
    },
    {
        name: 'The Treasure',
        image:  'https://thumbs.dreamstime.com/z/multi-generation-black-family-parents-piggybacking-kids-134199815.jpg',
        author: 'Erica Fries',
        description: 'This story follows the adventure a family undertakes when they find a mysterious map to a lost pirate treasure',
        category: 'Adventure',
        storyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, dignissimos harum sit provident ex aspernatur, eum molestias, nisi animi temporibus eos qui optio fugiat dolore facere vel rerum at blanditiis.'
    },
    {
        name: 'Goobye JS',
        image:  'https://www.pinclipart.com/picdir/middle/7-74637_clip-art-free-download-black-family-clipart-family.png',
        author: 'Patee Kinseeta',
        description: 'A Short story which teaches kids how to deaal with loss and grief',
        category: 'Education',
        storyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, dignissimos harum sit provident ex aspernatur, eum molestias, nisi animi temporibus eos qui optio fugiat dolore facere vel rerum at blanditiis.'
    },
    {
        name: 'Old Maps',
        image:  'https://img.freepik.com/free-photo/young-cheerful-family-during-quarantine-insulation-spending-time-together-home_155003-13025.jpg?size=626&ext=jpg',
        author: 'Mark Martin',
        description: 'A story that makes you reconsider following old maps. They may lead you to danger',
        category: 'Horror',
        storyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, dignissimos harum sit provident ex aspernatur, eum molestias, nisi animi temporibus eos qui optio fugiat dolore facere vel rerum at blanditiis.'
    },
    {
        name: 'Zekes Adventures',
        image:  'https://clipartion.com/wp-content/uploads/2015/12/happy-black-family-clipart-free.jpeg',
        author: 'Myles B.',
        description: 'A Short story about a kid and his dog and their wacky adventure',
        category: 'Kids+Teens',
        storyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, dignissimos harum sit provident ex aspernatur, eum molestias, nisi animi temporibus eos qui optio fugiat dolore facere vel rerum at blanditiis.'
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