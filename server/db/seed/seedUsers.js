const db = require("../db");
const {
    models: { User, Donation, DonationsRecipients },
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

        let donationArr = [];
        let donationRecipientArr = [];
        // for (let i = 0; i < 9; i++) {
        //     const amount = Math.floor(Math.random() * 300);
        //     const donation = new Donation({
        //         id: i,
        //         amount,
        //         transactionHash: "fadslfaksdjhflkadjshflkasdj",
        //         contractAddress: "Gadfdsfadsfasdfadf",
        //         donorId:
        //             testDonors[
        //                 Math.floor(Math.random() * testDonors.length - 1)
        //             ].id,
        //     }).save();

        //     for (let j = 0; j < 3; j++) {
        //         const donationRecipient = new DonationsRecipients({
        //             amountOwed: amount / 3,
        //             donationId: i,
        //             recipientId:
        //                 testDonors[
        //                     Math.floor(Math.random() * testDonors.length)
        //                 ].id,
        //         }).save();
        //         donationRecipientArr.push(donationRecipient);
        //     }
        //     donationArr.push(donation);
        // }

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

        const donationTest1 = new Donation({
            id: 1,
            amount: 500,
            transactionHash: "IAMDONATION1",
            contractAddress: "CONTRACTSHOULDBETHESAME",
            donorId: 1,
        }).save();

        const donationTest2 = new Donation({
            id: 2,
            amount: 10000,
            transactionHash: "IAM_DONATION_2",
            contractAddress: "CONTRACTSHOULDBETHESAME",
            donorId: 1,
        }).save();

        const donationTest3 = new Donation({
            id: 3,
            amount: 9000000,
            transactionHash: "IAM_DONATION_3!!!!",
            contractAddress: "CONTRACTSHOULDBETHESAME",
            donorId: 2,
        }).save();

        const donationRecipient1 = new DonationsRecipients({
            amountOwed: 500 / 2,
            donationId: 1,
            recipientId: 3,
        }).save();

        const donationRecipient2 = new DonationsRecipients({
            amountOwed: 500 / 2,
            donationId: 1,
            recipientId: 4,
        }).save();

        const donationRecipient3 = new DonationsRecipients({
            amountOwed: 10000 / 3,
            donationId: 2,
            recipientId: 3,
        }).save();

        const donationRecipient4 = new DonationsRecipients({
            amountOwed: 10000 / 3,
            donationId: 2,
            recipientId: 5,
        }).save();

        const donationRecipient5 = new DonationsRecipients({
            amountOwed: 10000 / 3,
            donationId: 2,
            recipientId: 6,
        }).save();

        const donationRecipient6 = new DonationsRecipients({
            amountOwed: 9000000,
            donationId: 3,
            recipientId: 9,
        }).save();

        await Promise.all([donationTest1, donationTest2, donationTest3]);
        await Promise.all([
            donationRecipient1,
            donationRecipient2,
            donationRecipient3,
            donationRecipient4,
            donationRecipient5,
            donationRecipient6,
        ]);
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedUsers;
