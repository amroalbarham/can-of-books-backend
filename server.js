'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
// process.env.MONGODB_URI
//'mongodb://localhost:27017/books'
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true });


const BookSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    status: String,
});

const UserSchema = new mongoose.Schema({
    email: String,
    books: [BookSchema],
})

const myUser = mongoose.model('user', UserSchema);
const mybooks = mongoose.model('books', BookSchema);


function seedMyUsercollection() {
    const amro = new myUser({
        email: 'amroalbarham@gmail.com',
        books: [
            {
                name: 'asdf',
                description: 'asdffdas',
                img: 'https://static01.nyt.com/images/2019/12/17/books/review/17fatbooks/17fatbooks-superJumbo.jpg',
                status: 'finish reading',
            },
            {
                name: ';lafdkas;lk',
                description: 'asdffcxvxvcxvcxdas',
                img: 'https://d2r68eeixpqexd.cloudfront.net/41fd2ced63aa8d47a3142fa4cd46849b.jpg',
                status: 'finish reading',
            }
        ]

    });
    const fadi = new myUser({
        email: 'nanawmistkeh@gmail.com',
        books: [
            {
                name: 'fadi',
                description: 'love programming',
                img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT730-A2uDXZwaHw-ABPh_67imtOifFY3Depg&usqp=CAU',
                status: 'finish reading',
            },
            {
                name: ';lafdkas;lk',
                description: 'asdffcxvxvcxvcxdas',
                img: 'https://d2r68eeixpqexd.cloudfront.net/41fd2ced63aa8d47a3142fa4cd46849b.jpg',
                status: 'finish reading',
            }
        ]

    })

    console.log(amro);
    console.log(fadi);

    amro.save();
    fadi.save();


}
// seedMyUsercollection();
// console.log(seedMyUsercollection());



app.get('/', prooflife);
function prooflife(req, res) {
    res.send('working');
}


app.get(`/books`, bookshandler);

function bookshandler(req, res) {
    let name = req.query.name;

    myUser.find({ email: name }, function (error, ownerData) {
        if (error) {
            console.log(error);
            res.stauts(500).send('please write correct E-mail')
        } else {
            res.send(ownerData[0])

        }
    })
}

app.post('/addBooks', addBooksHandler);

function addBooksHandler(req, res) {

    const { name, description, img, status, email } = req.body;
    console.log(name);

    myUser.find({ email: email }, (error, userData) => {
        if (error) {
            res.send('did not work')
        } else {
            userData[0].books.push({
                name: name,
                description: description,
                img: img,
                status: status,
            })
            userData[0].save();
            res.send(userData[0])
        }
    })
}

app.delete('/deleteBook/:index', deleteBooksHandler);

function deleteBooksHandler(req, res) {
    const { email } = req.query;

    const index = Number(req.params.index)

    myUser.find({ email: email }, (error, userData) => {
        const newBookArr = userData[0].books.filter((book, idx) => {
            if (idx !== index) {
                return book;
            }
        })
        userData[0].books = newBookArr;
        userData[0].save();
        res.send(userData[0]);
    })
}


app.put('/editBook/:index',updateBookshandler);

function updateBookshandler(req,res){
    const{bookName,description,imgUrl,status,email}=req.body;
    const index=Number(req.params.index);

    myUser.findOne({email:email},(errors,userData)=>{
        userData.books.splice(index,1,{
            name:bookName,
            description:description,
            img:imgUrl,
            status:status,
        })
        userData.save();
        res.send(userData);
    })
}


app.listen(PORT, () => {
    console.log(`listen ${PORT}`);
})
