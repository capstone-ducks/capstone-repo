const db = require("./db");
const {
    models: { User, Transaction },
} = require("./model");
const syncAndSeed = require("./syncAndSeed");

//associations will go here
// Transaction.belongsTo(User, {
//     as: 'donor'
//   });
  
// Transaction.belongsTo(User, {
//     as: 'recipient'
// });

module.exports = {
    syncAndSeed,
    db,
    models: {
        User,
        Transaction
    },
};
