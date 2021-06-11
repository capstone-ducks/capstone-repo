const db = require("../db");
const {
    models: { User, Donation },
} = require("../model/index");

const faker = require("faker");

const seedUsers = async () => {
    try {
        await db.sync({ force: true });
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

        //create transactions
        const testDonors = await User.findAll({
            where: {
                isDonor: true,
            },
        });
        const testRecipients = await User.findAll({
            where: {
                isDonor: false,
            },
        });

        // let transactionArr = [];
        // for(let i = 0; i < 9; i++){
        //     const transaction = new Transaction({
        //         amount: (Math.floor(Math.random() * 300)),
        //         donorId: testDonors[Math.floor(Math.random() * testDonors.length)].id,
        //         recipientId: testRecipients[Math.floor(Math.random() * testRecipients.length)].id
        //     }).save();
        //     transactionArr.push(transaction);
        // }
        // await Promise.all(transactionArr);

        const donorTest = await User.create({
            firstName: "Ms.",
            lastName: "Moneybags",
            email: "donortest@gmail.com",
            password: "123",
            isDonor: true,
        });
        donorTest.save();

        const recipTest = await User.create({
            firstName: "Tiny",
            lastName: "Tim",
            email: "recipienttest@gmail.com",
            password: "123",
            isDonor: false,
        });
        recipTest.save();
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedUsers;
