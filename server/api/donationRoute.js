const router = require("express").Router();
const {
    models: { User, Donation, DonationsRecipients },
} = require("../db/model/index");


// All donations, for generate donation id
router.get("/", async (req, res, next) => {
    try {
        const donations = await Donation.findAll({
            include: [{ all: true }],
        });

        //console.log(donations, 'success in get route Donations');
        res.status(200).send(donations);
    } catch (err) {
        //console.log(err, 'error in get route donations');
        next(err);
    }
});


// *** I haven't touched this one - I think it could be moved to the userRoute file
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

        const {
            id,
            amount,
            numRecipients,
            donorId,
            transactionHash,
            contractAddress,
            // recipient location, etc. data that is selected by donor

        } = req.body;
        const donation = await Donation.create({
            id,
            amount,
            numRecipients,
            donorId,
            transactionHash,
            contractAddress,
            // recipient location, etc. data that is selected by donor
        });
        const recipients = await User.randomRecipients(numRecipients); // fetch from findALL
        recipients.map(async (recipient) => {
            await DonationsRecipients.create({
                donationId: donation.id,
                recipientId: recipient.id,
                amountOwed: donation.amount / donation.numRecipients
            });
        });
        res.status(201).send(donation);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

