
const db = require('./db');

const User = require('./user');
const Transaction = require('./transaction');

//associations will go here
Transaction.belongsTo(User, {
  as: 'donor'
});

Transaction.belongsTo(User, {
  as: 'recipient'
});

module.exports = {
  db,
  User,
  Transaction
};
