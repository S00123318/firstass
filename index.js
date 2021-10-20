const Joi = require('joi')
const express = require('express')


const books = require('./routes/books');
const home = require('./routes/home');
const users = require('./routes/users');
const auth = require('./routes/auth')

const app = express()
const port = 3000
const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/books2021'

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
    console.log('Database connection refused' + error);
    process.exit(2);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('DB connected')
});


app.use(express.json());
app.use(express.urlencoded({extended: false})); //Parse URL-encoded bodies

app.use('/books/',books)

app.use('/', home )

app.use('/users', users)
app.use('/auth', auth)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
