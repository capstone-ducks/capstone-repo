const Sequelize = require("sequelize");

const db = new Sequelize(
    process.env.DATABASE_URL || "postgres://localhost/capstone",
    {
        logging: false,
        dialect: "postgres",
        ssl: process.env.DATABASE_URL ? true : false,
    },
);

module.exports = db;
