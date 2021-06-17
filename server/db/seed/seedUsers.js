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
            isDonor: true,
        });

        const donor2 = await User.create({
            firstName: "Chandler",
            lastName: "Moneybags",
            email: "donortest2@gmail.com",
            password: "123",
            isDonor: true,
        });

        const recipient1 = await User.create({
            firstName: "Tiny",
            lastName: "Tim",
            email: "recipient1@gmail.com",
            password: "123",
            gender: "Male",
            isDonor: false,
            cryptoAddress: "0x279EF613Cd59dbe6F44248384d92584E2D78c1C0",
        });

        const recipient2 = await User.create({
            firstName: "Billy",
            lastName: "Valentine",
            email: "recipient2@gmail.com",
            password: "123",
            cryptoAddress: "0xC806740a59Ed36D8aBE3F7b83D51a74fd5E59403",
            isDonor: false,
            gender: "Female",
        });

        const recipient3 = await User.create({
            firstName: "Joe",
            lastName: "Shmo",
            email: "recipient3@gmail.com",
            password: "123",
            isDonor: false,
            gender: "Female",
            cryptoAddress: "0xB790c0FD9417b2Eb69292579748dA4C71246466E",
        });

        const recipient4 = await User.create({
            firstName: "Jane",
            lastName: "Shmo",
            email: "recipient4@gmail.com",
            password: "123",
            isDonor: false,
            gender: "Male",
            cryptoAddress: "0x84f15426f06F230B4d549e7558Aa9c4d59c7A049",
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
