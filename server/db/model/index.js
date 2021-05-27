const User = require("./User");
const Transaction = require("./Transaction");

// ----------- Associations -----------
Transaction.belongsTo(User, {
    as: 'donor'
});
  
Transaction.belongsTo(User, {
    as: 'recipient'
});

module.exports = {
    models: { User, Transaction },
};
