//const Sequelize = require('sequelize');
const { Sequelize, DataTypes, Model } = require('sequelize');
const db  = require('../db');

// const Transaction = db.define('Transaction', {
//   amount: {
//     type: Sequelize.DECIMAL(10, 2),
//     allowNull: true,
//     defaultValue: 0,
//   },
// });

class Transaction extends Model {}

Transaction.init({
  // Model attributes are defined here
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
}, 
{
  sequelize: db, 
  modelName: "transaction" 
});

module.exports = Transaction;