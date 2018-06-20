var Sequelize = require('sequelize');

var sequelize = new Sequelize('books_DB', 'root', 'mova1111', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

module.exports = {sequelize, Sequelize};