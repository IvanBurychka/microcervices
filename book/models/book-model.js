const {sequelize} = require('./../config/connection');
const {Sequelize} = require('./../config/connection');

var Book = sequelize.define('books', {
  name: Sequelize.STRING,
  year: Sequelize.STRING,
  numberOfPage : Sequelize.INTEGER,
  isFree : {
    type: Sequelize.BOOLEAN,
    defaultValue : function() {
      return true;
    }
  },
  whoUse : {
    type: Sequelize.INTEGER,
    defaultValue : function() {
      return null;
    }
  }
});

Book.sync({force: false});

module.exports = Book;