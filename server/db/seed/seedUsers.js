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

        // let fakeUsers = [];
        // for (let i = 0; i < NUM_FAKE_USERS; i++) {
        //     const isDonor = i > Math.floor(NUM_FAKE_USERS / 2) ? true : false;

        //     const user = new User({
        //         firstName: faker.name.firstName(),
        //         lastName: faker.name.lastName(),
        //         email: faker.internet.email(),
        //         password: faker.internet.password(),
        //         publicKey: faker.random.alphaNumeric(130),
        //         cryptoAddress: faker.random.alphaNumeric(40),
        //         isDonor,
        //     }).save();

        //     fakeUsers.push(user);
        // }

        // await Promise.all(fakeUsers);

        //create transactions
        // const testDonors = await User.findAll({
        //     where: {
        //         isDonor: true,
        //     },
        // });
        // const testRecipients = await User.findAll({
        //     where: {
        //         isDonor: false,
        //     },
        // });

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

        const donor1 = await User.create({
            firstName: "Monica",
            lastName: "Moneybags",
            email: "donortest1@gmail.com",
            password: "123",
            gender: "Non-Binary",
            race: "White",
            city: "New York",
            state: "NY",
            isDonor: true,
        });

        const donor2 = await User.create({
            firstName: "Chandler",
            lastName: "Moneybags",
            email: "donortest2@gmail.com",
            password: "123",
            gender: "Other",
            race: "Hispanic or Latino",
            city: "San Diego",
            state: "CA",
            isDonor: true,
        });

        const recipient1 = await User.create({
            firstName: "Tiny",
            lastName: "Tim",
            email: "recipient1@gmail.com",
            password: "123",
            gender: "Male",
            race: "Multiracial",
            isDonor: false,
            cryptoAddress: "0x0EF5722F2b06524A451e492060dAfd85BE5C7dd1",
        });

        const recipient2 = await User.create({
            firstName: "Billy",
            lastName: "Valentine",
            email: "recipient2@gmail.com",
            password: "123",
            gender: "Female",
            race: "Black / African American",
            city: "Queens",
            state: "NY",
            isDonor: false,
            cryptoAddress: "0xF5D87DE354c64c4097f2Fa8c3208835910aD234b",
        });

        const recipient3 = await User.create({
            firstName: "Joe",
            lastName: "Shmo",
            email: "recipient3@gmail.com",
            password: "123",
            gender: "Female",
            race: "Hispanic or Latino",
            city: "Hartford",
            state: "CT",
            isDonor: false,
            cryptoAddress: "0x76C868dE20aDA4b584F82B34fb8a1F60e4968810",
        });

        const recipient4 = await User.create({
            firstName: "Jane",
            lastName: "Shmo",
            email: "recipient4@gmail.com",
            password: "123",
            gender: "Male",
            race: "Multiracial",
            city: "Los Angeles",
            state: "CA",
            isDonor: false,
            cryptoAddress: "0x12c434db1AE6c20201E989E52Fdc1482860C3909",
        });

        const recipient5 = await User.create({
            firstName: "Thomas",
            lastName: "Hobbes",
            email: "recipient5@gmail.com",
            password: "123",
            gender: "Transgender",
            race: "Asian",
            city: "San Diego",
            state: "CA",
            isDonor: false,
            cryptoAddress: "0x41832B13C08b0eC3bFF5FEEb901cB0230F5B8C7b",
        });

        const recipient6 = await User.create({
            firstName: "Mike",
            lastName: "Wazowski",
            email: "recipient6@gmail.com",
            password: "123",
            gender: "Non-Binary",
            race: "Native Hawaiian or Other Pacific Islander",
            city: "Queens",
            state: "NY",
            isDonor: false,
            cryptoAddress: "0x5019529359C3D07B8c1A0717BDb0cc4F2D49d565",
        });

        const recipient7 = await User.create({
            firstName: "Ben",
            lastName: "Grimm",
            email: "ff4@gmail.com",
            password: "123",
            gender: "Non-Binary",
            race: "Native Hawaiian or Other Pacific Islander",
            city: "New York",
            state: "NY",
            isDonor: false,
            cryptoAddress: "0x832ACCcC7DA7881053A8F2C154C2Dc49c83B667f",
        });

        const recipient8 = await User.create({
            firstName: "Bender",
            lastName: "Rodriguez",
            email: "benderb@gmail.com",
            password: "123",
            gender: "Non-Binary",
            race: "Multiracial",
            city: "Brooklyn",
            state: "NY",
            isDonor: false,
            cryptoAddress: "0x8b14063E3f30a295A0583374934C8612096d967f",
        });

        const recipient9 = await User.create({
            firstName: "Clint",
            lastName: "Barton",
            email: "hawkeye@gmail.com",
            password: "123",
            gender: "Male",
            race: "White",
            city: "Akron",
            state: "OH",
            isDonor: false,
            cryptoAddress: "0xa6400E702ed31947EfB176d23160da236e1Efe8F",
        });

        const donation1 = await Donation.create({
            id: 1,
            amount: 500,
            numRecipients: 2,
            transactionHash: "IAMDONATION1",
            contractAddress: "CONTRACTSHOULDBETHESAME",
            donorId: 1,
        });

        const donation2 = await Donation.create({
            id: 2,
            amount: 1000,
            numRecipients: 3,
            transactionHash: "SDIFEMCIWE9",
            contractAddress: "CONTRACTSHOULDBETHESAMEASTHIS",
            donorId: 2,
        });

        const donationsRecipients1 = await DonationsRecipients.create({
            id: 1,
            donationId: donation1.id,
            recipientId: recipient1.id,
            amountOwed: donation1.amount / 2,
        });

        const donationsRecipients2 = await DonationsRecipients.create({
            id: 2,
            donationId: donation1.id,
            recipientId: recipient2.id,
            amountOwed: donation1.amount / donation1.numRecipients,
        });

        const donationsRecipients3 = await DonationsRecipients.create({
            id: 3,
            donationId: donation2.id,
            recipientId: recipient2.id,
            amountOwed: donation2.amount / donation2.numRecipients,
        });

        const donationsRecipients4 = await DonationsRecipients.create({
            id: 4,
            donationId: donation2.id,
            recipientId: recipient3.id,
            amountOwed: donation2.amount / 3,
        });

        const donationsRecipients5 = await DonationsRecipients.create({
            id: 5,
            donationId: donation2.id,
            recipientId: recipient4.id,
            amountOwed: donation2.amount / 3,
        });

        // Saving to db
        await donationsRecipients1.save();
        await donationsRecipients2.save();
        await donationsRecipients3.save();
        await donationsRecipients4.save();
        await donationsRecipients5.save();
    } catch (err) {
        console.error(err);
    }
};

module.exports = seedUsers;
