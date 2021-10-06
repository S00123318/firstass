const Joi = require('joi')
const express = require('express')

const books = require('./routes/books');
const home = require('./routes/home');
//const books = require('./models/books');
const app = express()
const port = 3000
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test4DC', {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});


app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies

app.use('/books/',books)


app.use('/', home )





app.listen(port, () => console.log(`Example app listening on port ${port}!`))
