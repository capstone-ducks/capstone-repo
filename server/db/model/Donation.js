//const Sequelize = require('sequelize');
const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class Donation extends Model {}

Donation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: false,
            unique: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.0,
        },
        transactionHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contractAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "donation",
    },
);

module.exports = Donation;
