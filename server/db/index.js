const db = require("./db");
const {
    models: { User, Donation },
} = require("./model");
const syncAndSeed = require("./syncAndSeed");

//associations will go here
// Donation.belongsTo(User, {
//     as: 'donor'
//   });

// Donation.belongsTo(User, {
//     as: 'recipient'
// });

module.exports = {
    syncAndSeed,
    db,
    models: {
        User,
        Donation,
    },
};
