const Sequelize = require("sequelize");

const db = process.env.DATABASE_URL
    ? // Heroku database settings
      new Sequelize(process.env.DATABASE_URL, {
          logging: false,
          dialect: "postgres",
          ssl: true,
          dialectOptions: {
              ssl: {
                  require: true,
                  rejectUnauthorized: false,
              },
          },
      })
    : // Our local development database settings
      new Sequelize("postgres://localhost/capstone", {
          logging: false,
      });

module.exports = db;
