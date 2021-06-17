const router = require("express").Router();
const {
    models: { User, Donation, DonationsRecipients },
} = require("../db/model/index");


// All donations, for generate donation id
// router.get("/", async (req, res, next) => {
//     try {
//         const donations = await Donation.findAll({
//             include: [{ all: true }],
//         });

//         //console.log(donations, 'success in get route Donations');
//         res.status(200).send(donations);
//     } catch (err) {
//         //console.log(err, 'error in get route donations');
//         next(err);
//     }
// });


// get all donations
router.get("/", async (req, res, next) => {
    try {
        const donations = await Donation.findAll({
            include: [
                {
                    model: User,
                    as: "donor",
                },
                { model: User },
            ],
        });
        //does not work with a second alias for...reasons?
        //console.log(donations, 'success in get route Donations');
        res.status(200).send(donations);
    } catch (err) {
        //console.log(err, 'error in get route donations');
        next(err);
    }
});

// get one donation by id
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        let donations = {};

        if (user.isDonor === true) {
            donations = await Donation.findAll({
                where: {
                    donorId: id,
                },
                include: [
                    {
                        model: User,
                        as: "donor",
                    },
                    {
                        model: User,
                        as: "recipient",
                    },
                ],
            });
        } else {
            donations = await Donation.findAll({
                where: {
                    recipientId: id,
                },
                include: [
                    {
                        model: User,
                        as: "donor",
                    },
                    {
                        model: User,
                        as: "recipient",
                    },
                ],
            });
        }
        res.status(200).send(donations);
    } catch (err) {
        next(err);
    }
});

// This will post from the blockchain to the db...
router.post("/", async (req, res, next) => {
    try {
        if (!req.body) res.sendStatus(400);

        let {
            id,
            amount,
            numRecipients,
            donorId,
            transactionHash,
            contractAddress,
            recipientIds
            // recipient location, etc. data that is selected by donor

        } = req.body;
        console.log(donorId, "before DonationRoute")
        console.log(req.body, "before DonationRoute req body")
        if(!donorId ){
            const newUser = await User.create({
                isDonor:true
            });
            donorId = newUser.id;
            // recipientId = Number(1);
            console.log(donorId, "DonationRoute")
        }
        const donation = await Donation.create({
            id,
            amount,
            numRecipients,
            donorId,
            transactionHash,
            contractAddress,
            // recipient location, etc. data that is selected by donor
        });
        // const recipients = await User.randomRecipients(numRecipients); // fetch from findALL
        recipientIds.map(async (recipientId) => {
            await DonationsRecipients.create({
                donationId: donation.id,
                recipientId: recipientId,
                amountOwed: donation.amount / donation.numRecipients
            });
        })
        res.status(201).send(donation);
    } catch (err) {
        console.log('Donation POST route error ', err)
        next(err);
    }
});

module.exports = router;


