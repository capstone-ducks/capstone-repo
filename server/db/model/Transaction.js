const Sequelize = require('sequelize');
const db  = require('../db');

const Transaction = db.define('transaction', {
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = Transaction;