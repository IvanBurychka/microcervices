const express = require('express');
const router = express.Router();
const User = require('../models/user-model');
const { sequelize } = require('./../config/connection');
const _ = require('lodash');

router.get('/api/v1/users', function(req, res, next) {

  User.findAll({}).then((result)=>{
    res.send(result);
  });

});

router.get('/api/v1/users/:id', function(req, res, next) {

  let id = req.params.id;

  User.find({where : {id : id}}).then((result)=>{
    if (!result){
      return res.send(`Can't find such user`);
    }

    res.send(result);
  });

});

router.post('/api/v1/users/:id', function(req, res, next) {

  let id = req.params.id;

  let editedUser = _.pick(req.body, 'firstName', 'lastName', 'phoneNumber', 'email', 'readNow');

  User.find({where : {id : id}}).then((result)=>{
    if (!result){
      return res.send(`Can't find such user`);
    }
    User.update(editedUser, {
      where: { id : id}
    }).then((updatedUser)=>{
      if (!updatedUser){
        return res.send(`Can't update user`);
      }
      res.send(`User have been successfully updated`);
    }).catch((err)=>{
      return res.send(`Can't update user`);
    });
  });
});

router.put('/api/v1/users', function(req, res, next) {

  let user = _.pick(req.body, 'firstName', 'lastName', 'phoneNumber', 'email');

  User.create(user).then((record)=> {
    console.log(record.get({
      plain: true
    }));
    res.send(record);
  });

});

router.delete('/api/v1/users/:id', function(req, res, next) {

  let id = req.params.id;

  User.destroy({where : {id : id}})
    .then((result)=>{
      if (result === 1){
        res.status(200);
        res.send(`User have been deleted`);
      } else {
        res.status(200);
        res.send(`Can't delete, because this user doesn't exist`);
      }
    })
    .catch((err)=>{
      console.log(err);
    });

});

module.exports = router;
