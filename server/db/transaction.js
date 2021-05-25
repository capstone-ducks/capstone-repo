const Sequelize = require('sequelize');
const { db } = require('../index');

const Transaction = db.define('transaction', {
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
});


module.exports = Transaction;