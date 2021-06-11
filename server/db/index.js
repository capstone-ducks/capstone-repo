const db = require("./db");
const {
    models: { User, Donation, DonationsRecipients },
} = require("./model");

const syncAndSeed = require("./syncAndSeed");

module.exports = {
    syncAndSeed,
    db,
    models: {
        User,
        Donation,
        DonationsRecipients,
    },
};
