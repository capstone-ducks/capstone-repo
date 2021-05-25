const db = require("./db");
const {
    model: { User },
} = require("./model");
const syncAndSeed = require("./syncAndSeed");

//associations will go here

module.exports = {
    syncAndSeed,
    db,
    model: {
        User,
    },
};
