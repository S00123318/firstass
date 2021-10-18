const express = require('express')
const mongoose = require('mongoose');
const Joi = require('joi');
const { Book, validate } = require('../models/books');
const e = require('express');


const router = express.Router();


router.post('/', async(req, res) => {

  let result = validate(reg.body)

  if (result.error)
    {
      res.status(400).json(result.error);
      return;
    }

  let book = new Book(req.body);

  try{

  book = await book.save();
    res.location(`/${book.id}`)
      .status(201)
      .json(book);
  
  }
  catch{
    res.status(500).json(result.error);
  }
   
  });
  
  router.get('/', async(req, res) => {
    /*try{
      const books = await Book.find();
      res.json(books);
      }
      catch{
        res.status(500),json('db error')
      }*/
      
     const  {title, year, limit} = req.query;
      let filter = {};
  
    if (title) {
      filter.title = title
    }

    const yearNumber = parseInt(year)

    if(!isNaN(yearNumber)){
      filter.year_written = yearNumber
    }
  
    const books = await Book.
      find(filter);
      
   
    
  })
  
  
  router.get('/:id', async (req, res) => {
  
    try{
    const book = await Book.findById(req.params.id);
  
    if (book) {
      res.json(book);
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
    const book = await Book.findByIdAndDelete(req.params.id);
    res.send(book)
    }

    catch{
      res.status(404).json(`book with that ID ${reg.params.id} was not found`);
    }
  })
  
  router.put('/:id', async(req, res) => {
  
    const result = validate(req.body)
  
    if (result.error)
    {
      res.status(400).json(result.error);
      return;
    }

  try{
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if (book) {
        res.json(book);
      }
      else{
      res.status(404).json('Not found');
      }
    }
  catch{
    res.status(404).json('Not found: id is wrong');
  }

  })
  
module.exports = router