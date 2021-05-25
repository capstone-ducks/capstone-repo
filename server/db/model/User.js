const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");

class User extends Model {}

User.init(
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Anonymous",
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "User",
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        publicKey: {
            type: DataTypes.STRING,
            validate: {
                len: [128, 128],
            },
        },
        isDonor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
    },
    { sequelize: db, modelName: "user" },
);

// Additional column fields from our schema that I didn't add at this time
// Employment Status
// Housing Status: select statement
// Income: select statement
// Balance
// password field wasn't in schema?

module.exports = User;
