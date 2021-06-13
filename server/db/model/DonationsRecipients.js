const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class DonationsRecipients extends Model {}

DonationsRecipients.init(
    {
        donationId: {
            type: DataTypes.INTEGER,
        },
        recipientId: {
            type: DataTypes.INTEGER,
        },
        amountOwed: {
            type: DataTypes.DOUBLE,
        },
        isClaimed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize: db,
        modelName: "donationsRecipients",
    },
);

module.exports = DonationsRecipients;
