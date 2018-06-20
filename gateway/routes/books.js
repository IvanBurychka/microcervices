const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const _ = require('lodash');
const {URLSearchParams} = require('url');

router.get('/api/v1/books', function (req, res, next) {

  fetch('http://localhost:3001/api/v1/books')
        .then(res => res.json())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            res.send(`Can't find any books`);
        });
});

router.get('/api/v1/books/:id', function (req, res, next) {

    let id = req.params.id;
    let url = 'http://localhost:3001/api/v1/books/' + id;

    fetch(url)
        .then(res => res.json())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            res.send(`Can't find any books`);
        });
});

router.put('/api/v1/books', function (req, res, next) {

    let book = _.pick(req.body, ['name', 'year', 'numberOfPage']);

    const params = new URLSearchParams();
    params.append('name', book.name);
    params.append('year', book.year);
    params.append('numberOfPage', book.numberOfPage);

    fetch('http://localhost:3001/api/v1/books', {method: 'PUT', body: params})
        .then(res => res.json())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            console.log(err);
            res.send(`Can't find any books`);
        });

});

router.delete('/api/v1/books/:id', function (req, res, next) {

    let id = req.params.id;
    let URL = 'http://localhost:3001/api/v1/books/' + id;
    //
    console.log(URL);

    fetch(URL, {method: 'DELETE'})
        .then(res => res.text())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            res.send(`Can't delete book. Book doesn't exist`);
        });

});

router.post('/api/v1/books/:id', function (req, res, next) {

  let id = req.params.id;

  let editedBook = _.pick(req.body, 'name', 'year', 'numberOfPage');

  const params = new URLSearchParams();
  params.append('name', editedBook.name);
  params.append('year', editedBook.year);
  params.append('numberOfPage', editedBook.numberOfPage);

  let URL = 'http://localhost:3001/api/v1/books/' + id;

  fetch(URL, {method: 'POST', body: params})
    .then(res => res.text())
    .then(body => {
      res.send(body);
    })
    .catch((err) => {
      console.log(err);
      res.send(`Can't update book`);
    });

});

router.post('/api/v1/givebook', function (req, res, next) {

  let bookId = req.body.bookId;
  let userId = req.body.userId;

  let userUrl = 'http://localhost:3002/api/v1/users/' + userId;
  let bookUrl = 'http://localhost:3001/api/v1/books/' + bookId;

  let currentUser;
  let currentBook;

  fetch(userUrl)
    .then(res => res.json())
    .then(user => {
      currentUser = user

      fetch(bookUrl)
        .then(res => res.json())
        .then(book => {
          currentBook = book;

          if (!currentBook.isFree){
            return res.send('This book already uses')
          }

          const bookParams = new URLSearchParams();
          bookParams.append('ifFree', false);
          bookParams.append('whoUse', userId);

          let giveBookUrl = 'http://localhost:3001/api/v1/books/' + bookId;

          fetch(giveBookUrl, {method: 'POST', body: bookParams})
            .then(res => res.text())
            .then(body => {
              res.send(body);
            })
            .catch((err) => {
              console.log(err);
              res.send(`Can't update book`);
            });

          let takeUserUrl = 'http://localhost:3002/api/v1/users/' + userId;

          const userParams = new URLSearchParams();
          userParams.append('readNow', bookId);

          fetch(takeUserUrl, {method: 'POST', body: userParams})
            .then(res => res.text())
            .then(body => {
              res.send(body);
            })
            .catch((err) => {
              console.log(err);
              res.send(`Can't update user`);
            });


        })
        .catch((err) => {
          res.send(`Can't find such book`);
        });



    })
    .catch((err) => {
      res.send(`Can't find such user`);
    });






});

module.exports = router;