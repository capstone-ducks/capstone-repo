const User = require("./User");
const Transaction = require("./Transaction");

// ----------- Associations -----------

module.exports = {
    model: { User, Transaction },
};
