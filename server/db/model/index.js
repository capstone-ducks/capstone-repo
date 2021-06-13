const User = require("./User");
const Donation = require("./Donation");
const DonationsRecipients = require("./DonationsRecipients");

// ----------- Associations -----------
Donation.belongsTo(User, {
    as: "donor",
});

// Possibly redundant, come back to me please!
// User.hasMany(Donation, {
//     as: "donor"
// });

Donation.belongsToMany(User, {
    through: DonationsRecipients,
    foreignKey: "donationId",
    otherKey: "recipientId",
});

User.belongsToMany(Donation, {
    through: DonationsRecipients,
    foreignKey: "recipientId",
    otherKey: "donationId",
});

module.exports = {
    models: { User, Donation, DonationsRecipients },
};
