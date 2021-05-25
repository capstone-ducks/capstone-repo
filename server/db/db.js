const Sequelize = require("sequelize");

const db = new Sequelize(
    process.env.DATABASE_URL || "postgres://localhost/capstone",
    { logging: false },
);

module.exports = db;