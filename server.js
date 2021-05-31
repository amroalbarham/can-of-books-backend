'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost:27017/books',
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
    // let bad='';
    // try {

        myUser.find({ email: name }, function (error, ownerData) {
            if (error) {
            console.log(error);
            res.stauts(500).send('please write correct E-mail')
            } else {
            res.send(ownerData[0])
            // }
            // } catch  {
            }
        })
    }
        // res.stauts(500).send('please write correct E-mail');

// }



app.listen(PORT, () => {
    console.log(`listen ${PORT}`);
})
