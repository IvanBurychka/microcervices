const express = require('express');
const router = express.Router();
const Book = require('./../models/book-model');
const { sequelize } = require('./../config/connection');
const _ = require('lodash');



router.get('/api/v1/books', function(req, res, next) {

  Book.findAll({}).then((result)=>{
    res.send(result);
  });

});

router.get('/api/v1/books/:id', function(req, res, next) {

  let id = req.params.id;

  Book.find({where : {id : id}}).then((result)=>{
    if (!result){
      return res.send(`Can't find this book`);
    }

    res.send(result);
  });

});

router.post('/api/v1/books/:id', function(req, res, next) {

  let id = req.params.id;

  let editedBook = _.pick(req.body, 'name', 'year', 'numberOfPage', 'isFree', 'whoUse');

  Book.find({where : {id : id}}).then((result)=>{
    if (!result){
      return res.send(`Can't find this book`);
    }
    Book.update(editedBook, {
      where: { id : id}
    }).then((updatedBook)=>{
      if (!updatedBook){
        return res.send(`Can't update book`);
      }
      res.send(`Book successfully updated`);
    });
  });
});

router.put('/api/v1/books', function(req, res, next) {

  let book = _.pick(req.body, 'name', 'year', 'numberOfPage');

  Book.create(book).then((record)=> {
    console.log(record.get({
      plain: true
    }));
    res.send(record);
  });

});

router.delete('/api/v1/books/:id', function(req, res, next) {

  let id = req.params.id;

  Book.destroy({where : {id : id}})
    .then((result)=>{
      if (result === 1){
        res.status(200);
        res.send(`Book have been deleted`);
      } else {
        res.status(200);
        res.send(`Can't delete, because this book doesn't exist`);
      }
    })
    .catch((err)=>{
      console.log(err);
      // res.send(`ERROR`);
    });

});


module.exports = router;