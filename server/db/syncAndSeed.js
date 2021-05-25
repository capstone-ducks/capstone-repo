const db = require("./db");
const { seedUsers } = require("./seed");

const syncAndSeed = async () => {
    try {
        await db.sync({ force: true });
        console.log("Database Connected");

        await seedUsers();
    } catch (err) {
        console.log("error seeding data :", err);
    }
};

module.exports = syncAndSeed;
