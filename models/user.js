const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    },
);

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
      })
    return schema.validate(user);
}

exports.Book = Book;
exports.validate = validateBook;
