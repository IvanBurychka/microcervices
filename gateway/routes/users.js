const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const _ = require('lodash');
const {URLSearchParams} = require('url');

router.get('/api/v1/users', function (req, res, next) {

  fetch('http://localhost:3002/api/v1/users')
        .then(res => res.json())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            res.send(`Can't find any users`);
        });
});

router.get('/api/v1/users/:id', function (req, res, next) {

    let id = req.params.id;
    let url = 'http://localhost:3002/api/v1/users/' + id;

    fetch(url)
        .then(res => res.json())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            res.send(`Can't find such user`);
        });
});

router.put('/api/v1/users', function (req, res, next) {

 let user = _.pick(req.body, ['firstName', 'lastName', 'phoneNumber', 'email']);

    const params = new URLSearchParams();
    params.append('firstName', user.firstName);
    params.append('lastName', user.lastName);
    params.append('phoneNumber', user.phoneNumber);
    params.append('email', user.email);

    fetch('http://localhost:3002/api/v1/users', {method: 'PUT', body: params})
        .then(res => res.json())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            console.log(err);
            res.send(`Can't find any users`);
        });

});

router.delete('/api/v1/users/:id', function (req, res, next) {

    let id = req.params.id;
    let URL = 'http://localhost:3002/api/v1/users/' + id;

    fetch(URL, {method: 'DELETE'})
        .then(res => res.text())
        .then(body => {
            res.send(body);
        })
        .catch((err) => {
            res.send(`Can't delete user. User doesn't exist`);
        });

});

router.post('/api/v1/users/:id', function (req, res, next) {

  let id = req.params.id;

  let userToUpdate = _.pick(req.body, ['firstName', 'lastName', 'phoneNumber', 'email']);

  const params = new URLSearchParams();
  params.append('firstName', userToUpdate.firstName);
  params.append('lastName', userToUpdate.lastName);
  params.append('phoneNumber', userToUpdate.phoneNumber);
  params.append('email', userToUpdate.email);

  let URL = 'http://localhost:3002/api/v1/users/' + id;

  fetch(URL, {method: 'POST', body: params})
    .then(res => res.text())
    .then(body => {
      res.send(body);
    })
    .catch((err) => {
      console.log(err);
      res.send(`Can't update user`);
    });




});

router.get('/api/v1/returnbook/:userId', function (req, res, next) {

  let userId = req.params.userId;

  let url = 'http://localhost:3002/api/v1/users/' + userId;

  fetch(url)
    .then(res => res.json())
    .then(user => {
      if (user.readNow === null || user.readNow === 0){
        return res.send(`This user don't have any books`);
      }

      const bookParams = new URLSearchParams();
      bookParams.append('ifFree', true);
      bookParams.append('whoUse', null);

      let giveBookUrl = 'http://localhost:3001/api/v1/books/' + user.readNow;

      fetch(giveBookUrl, {method: 'POST', body: bookParams})
        .then(res => res.text())
        .then(body => {

        })
        .catch((err) => {
          console.log(err);
          res.send(`Can't update book`);
        });

      let takeUserUrl = 'http://localhost:3002/api/v1/users/' + userId;

      const userParams = new URLSearchParams();
      userParams.append('readNow', 0);

      fetch(takeUserUrl, {method: 'POST', body: userParams})
        .then(res => res.text())
        .then(body => {

        })
        .catch((err) => {
          console.log(err);

        });

      // res.send(user);
    })
    .catch((err) => {
      res.send(`Can't find such user`);
    });




});

module.exports = router;
