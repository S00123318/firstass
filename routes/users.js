const express = require('express')
const mongoose = require('mongoose');
const Joi = require('joi');
const crypto = require('crypto');
const { User, validate } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {

    let result = validate(req.body)
  
    if (result.error) {
      res.status(400).json(result.error);
      return;
    }
  
  // check if a user with that e-mail already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    // encrypt the password using a salt 
    
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
  
    user = new User(req.body);
    user = await user.save();
  
    // note we don't want to return the entire user object as that includes the password.
  
    res.location(user._id).
      status(201).
      json(user._id);
  })
    
  router.get('/:id', async (req, res) => {
  
    try{
    const user = await User.findById(req.params.id);
  
    if (user) {
      res.json(user);
    }
    else{
      res.status(404).json('not found');
      }
  }
  catch{
    res.status(404).json('Not Found: Id is wrong')
  }
  })
  

  router.delete('/:id', async(req, res) => {
  
    try{
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user)
    }

    catch{
      res.status(404).json(`user with that ID ${reg.params.id} was not found`);
    }
  })



module.exports = router