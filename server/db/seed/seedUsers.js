const db = require("../db");
const {
    model: { User },
} = require("../model");

const faker = require("faker");

const seedUsers = async () => {
    try {
        // Change this to modify number of users
        const NUM_FAKE_USERS = 10;

        let fakeUsers = [];
        for (let i = 0; i < NUM_FAKE_USERS; i++) {
            const isDonor = i > Math.floor(NUM_FAKE_USERS / 2) ? true : false;

            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                publicKey: faker.random.alphaNumeric(130),
                cryptoAddress: faker.random.alphaNumeric(40),
                isDonor,
            }).save();

            fakeUsers.push(user);
        }

        await Promise.all(fakeUsers);
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedUsers;
