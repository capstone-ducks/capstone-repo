const db = require("./db");
const {
    model: { User, Transaction },
} = require("./model");
const syncAndSeed = require("./syncAndSeed");

//associations will go here
// Transaction.belongsTo(User, {
//     as: 'donor'
//   });
  
//   Transaction.belongsTo(User, {
//     as: 'recipient'
//   });

module.exports = {
    syncAndSeed,
    db,
    model: {
        User,
        Transaction
    },
};
