const User = require("./User");
const Donation = require("./Donation");
const DonationsRecipients = require("./DonationsRecipients");

// ----------- Associations -----------
Donation.belongsTo(User, {
    as: "donor",
});

// Possibly redundant, come back to me please!
// User.hasMany(Donation, {
//     as: "donation",
// });

Donation.belongsToMany(User, {
    through: "donationsRecipients",
    foreignKey: "donationId",
    otherKey: "recipientId",
});

User.belongsToMany(Donation, {
    through: "donationsRecipients",
    foreignKey: "recipientId",
    otherKey: "donationId",
});

module.exports = {
    models: { User, Donation, DonationsRecipients },
};
