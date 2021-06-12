const router = require("express").Router();
const {
    models: { User, Donation, DonationsRecipients },
} = require("../db/model/index");

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
router.post("/:id/donations", async (req, res, next) => {
    try {
        if (!req.body) res.sendStatus(400);

        const { donorId } = req.params;
        const { amount, numRecipients, transactionHash, contractAddress } = req.body;
        const newDonation = await Donation.create({
            id, // can calculate id with a sequelize method that iteratively derives the integer
            amount,
            numRecipients,
            donorId,
            transactionHash,
            contractAddress,
            // recipient location, etc. data that is selected by donor
        });
// need to set recipients
// sequelize method
        newDonation.save();
        res.status(201).send(newDonation);
    } catch (err) {
        next(err);
    }
});

module.exports = router;


// get all donations
// router.get("/", async (req, res, next) => {
//     try {
//         const donations = await Donation.findAll({
//             include: [
//                 {
//                     model: User,
//                     as: "donor",
//                 },
//                 { model: DonationsRecipients },
//             ],
//         });

//         //console.log(donations, 'success in get route Donations');
//         res.status(200).send(donations);
//     } catch (err) {
//         //console.log(err, 'error in get route donations');
//         next(err);
//     }
// });
