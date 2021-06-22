const router = require("express").Router();
const sendEmail = require("./utils/mail");
const {
    models: { User, Donation, DonationsRecipients },
} = require("../db/model/index");


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
        res.status(200).send(donations);
    } catch (err) {
        console.log("Error in GET /api/donations route ", err);
        next(err);
    }
});


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
        console.log("Error in GET /api/donations/:id route ", err);
        next(err);
    }
});

// Save new donation to db
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
        } = req.body;
        if(!donorId ){
            const newUser = await User.create({
                isDonor:true
            });
            donorId = newUser.id;
            console.log(donorId, "DonationRoute")
        }
        const donation = await Donation.create({
            id,
            amount,
            numRecipients,
            donorId,
            transactionHash,
            contractAddress,
            // TODO: add recipient location, etc. data that is selected by donor
        });
        recipientIds.map(async (recipientId) => {
            const amountOwed = donation.amount / donation.numRecipients;
            await DonationsRecipients.create({
                donationId: donation.id,
                recipientId: recipientId,
                amountOwed,
            });
            const recipient = await User.findByPk(recipientId);
            await sendEmail(recipient.firstName, recipient.email, amountOwed, recipientId); // sends email to each recipient
        });
        res.status(201).send(donation);
    } catch (err) {
        console.log('Error in POST /api/donations route ', err);
        next(err);
    }
});

// route called when recipient claims donation
router.put("/:donationId/:userId", async (req, res, next) => {
    try {
        const { donationId, userId } = req.params;
        let donation = await DonationsRecipients.findOne({
            where: {
                donationId: donationId,
                recipientId: userId
            }
        });
        const claimedDonation = await donation.update({ isClaimed: true });
        await donation.save();
        res.status(200).send(claimedDonation);
    }
    catch (err) {
        console.log("Error in PUT /api/donations/:donationId/:userId route ", err);
        next(err);
    }
});

module.exports = router;


