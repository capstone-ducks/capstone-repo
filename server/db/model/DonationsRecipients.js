const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class DonationsRecipients extends Model {}

DonationsRecipients.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        donationId: {
            type: DataTypes.INTEGER,
        },
        recipientId: {
            type: DataTypes.INTEGER,
        },
        amountOwed: {
            type: DataTypes.DOUBLE,
        },
    },
    {
        sequelize: db,
        modelName: "donationsRecipients",
    },
);

module.exports = DonationsRecipients;
