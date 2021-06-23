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
            cryptoAddress: "0xde2ed08Bbcc470b273b3DfCcd2c2003FABe79238",
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
            cryptoAddress: "0x855Ce1019c9862e79548942a11d954df659690A1",
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
            cryptoAddress: "0x3B78A0005D5831b74A3Fb8D077cfB56f48036CC7",
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
            cryptoAddress: "0x2b32E009c9d2EA80c2E3cb5449967b1b27Ca7c69",
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
            cryptoAddress: "0x4e10A243ee0910Cd27Eb20daF88deC4F87219B18",
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
            cryptoAddress: "0x41BC08472543e3eBE640d3fff4D0D801f4B6AF82",
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
            cryptoAddress: "0xd69dC215C869A1892a6932321c3Fc8A95Dfb2b56",
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
            cryptoAddress: "0x457f607b050636b0e11ee931039Ef66537511348",
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
            cryptoAddress: "0x07Ca6b07D8cb482184B8acCb0B32DaD00188d7d0",
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
