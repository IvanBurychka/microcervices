const {sequelize} = require('./../config/connection');
const {Sequelize} = require('./../config/connection');

const User = sequelize.define('users', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phoneNumber : Sequelize.STRING,
  email : Sequelize.STRING,
  readNow : {
    type: Sequelize.INTEGER,
    defaultValue : function() {
      return null;
    }
  }
});

User.sync({force: false});

module.exports = User;