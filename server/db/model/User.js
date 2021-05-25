const { Sequelize, DataTypes, Model } = require("sequelize");
const db = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const faker = require("faker");

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
                len: [130, 130],
            },
        },
        cryptoAddress: {
            type: DataTypes.STRING,
            validate: {
                len: [40, 40],
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
User.addHook('beforeCreate', async (user) => {
    user.password = await bcrypt.hash(user.password, 5);
    user.publicKey = faker.random.alphaNumeric(130);
    user.cryptoAddress = faker.random.alphaNumeric(40)

});

// Additional column fields from our schema that I didn't add at this time
// Employment Status
// Housing Status: select statement
// Income: select statement
// Balance
// password field wasn't in schema?
// User.byToken = async function (token) {
//     try {
//       const { id } = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//       const user = await User.findByPk(id);
//       if (user) return user;
//       const error = Error('bad credentials');
//       error.status = 401;
//       throw error;
//     } catch (ex) {
//       const error = Error('bad credentials');
//       error.status = 401;
//       throw error;
//     }
//   };

module.exports = User;
