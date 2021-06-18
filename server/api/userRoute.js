const router = require("express").Router();
const {
    models: { User, Donation, DonationsRecipients },
} = require("../db");

// Errors
const { notFound, badSyntax, conflict, unauthorized } = require("./errors");


const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const combineReduce = require("../../client/utils/combineReduce");

router.post("/", async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            city,
            state,
            checked,
            gender,
            clientWalletAddress,
        } = req.body;

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            city,
            state,
            isDonor: checked === "isDonor",
            gender,
            cryptoAddress: clientWalletAddress,
        });
        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
});


router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, gender, race, city, state } =
            req.body;

        // Need token to prove you have the authentication to edit yourself
        const token = req.headers.authorization;
        if (!token) throw unauthorized("Invalid credentials");

        // Finds user who made request
        const requestor = await User.byToken(token);
        if (!requestor) throw unauthorized("Invalid credentials");

        // Prevents anybody from accessing this route and editing people
        if (requestor.id !== parseInt(id)) {
            throw unauthorized("Invalid credentials");
        }

        // Finds user
        let user = await User.findOne({ where: { id } });

        // If no user, 404
        if (!user) throw notFound("User not found");

        // Make changes
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (race) user.race = race;
        if (gender) user.gender = gender;
        if (city) user.city = city;
        if (state) user.state = state;

        // Save changes
        await user.save();

        // Get updated user
        let updatedUser = await User.findOne({ where: { id } });

        res.status(200).send(updatedUser);
    } catch (error) {
        next(error);
    }
});

// Gets associated donations with specific user
router.get("/:id/donations", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (user.isDonor) {
            const donations = await Donation.findAll({
                where: { donorId: id },
                include: [
                    { model: User, as: "donor" },
                    { model: User, through: DonationsRecipients },
                ],
            });
            res.status(200).send(donations);
        } else {
            const donations = await Donation.findAll({
                include: [
                    {
                        model: User,
                        where: {
                            id,
                        },
                        through: { DonationsRecipients },
                    },
                    {
                        model: User,
                        as: "donor",
                    },
                ],
            });
            res.status(200).send(donations);
        }
    } catch (error) {
        console.log("Error in GET /api/users/:id/donations route", error);
        next(error);
    }
});

// Create an object that we send back
router.post("/recipients", async (req, res, next) => {
    try {
            const { races, genders, cities, states, numRecipients } = req.body;
            let usersbyGender = [];
            let usersbyRace = [];
            let usersbyCity = [];
            let usersbyState = [];
            let allRecipients = [];

            if(races){
                usersbyRace = await User.findAll({ 
                    where: { 
                        race: {
                            [Op.in]: races
                        },
                        isDonor: false
                    }
                });
            }

            if(genders){
                usersbyGender = await User.findAll({ 
                    where: { 
                        gender: {
                            [Op.in]: genders
                        },
                        isDonor: false
                    }
                });
            }

            if(cities){
                usersbyCity = await User.findAll({ 
                    where: { 
                        city: {
                            [Op.in]: cities
                        },
                        isDonor: false
                    }
                });
            }

            if(states){
                usersbyState = await User.findAll({ 
                    where: { 
                        state: {
                            [Op.in]: states
                        },
                        isDonor: false
                    }
                });
            }
            
            //if no selections given find all recipient users to get randomly chosen
            if(!genders.length && !races.length && !cities.length && !states.length)
            {
                allRecipients = await User.findAll({
                    where: {
                        isDonor: false
                    }
                });
            } 
            else if(!genders.length || !races.length || !cities.length || !states.length)
            {
                //if only some selections made check the length of the returned recipient array
                allRecipients = combineReduce(usersbyGender, usersbyRace, usersbyCity, usersbyState);
                if(allRecipients.length < numRecipients)
                    {
                        //get more users but those not included in existing recipient array
                        let idArr = [];
                        allRecipients.forEach(user => idArr.push(user.id));
                        const addlUsers = await User.findAll({
                            where: {
                                id: {
                                    [Op.notIn]: idArr,
                                },
                                isDonor: false
                            }
                        });

                        allRecipients = allRecipients.concat(addlUsers);
                    }
            } else
            {
                allRecipients = combineReduce(usersbyGender, usersbyRace, usersbyCity, usersbyState);
            }
                
            // console.log(usersbyGender.length, 'Gender Users');
            // console.log(usersbyRace.length, 'Race Users');
            // console.log(usersbyCity.length, 'City Users');
            // console.log(usersbyState.length, 'State Users');
            // console.log(allRecipients.length, 'All Users');

            const recipients = await User.randomRecipients(numRecipients, allRecipients);
            const recipientIds = recipients.map(({ id }) => id);
            const cryptoAddresses = recipients.map(
                ({ cryptoAddress }) => cryptoAddress,
            );
            res.status(201).send({ recipientIds, cryptoAddresses });
        } catch (error) {
            console.log("Error in POST /users/recipients route", error);
            next(error);
        }
    });

module.exports = router;

// donor makes a donation - male/female/nonbinary/don't care
// send a post request to users
// we send back an array of recipients that is the same number that they specify in numRecipients
// then these addresses are used to create the donation
// post request to our donations route including the origin recipient array.

// router.delete("/:id", async (req, res, next) => {
//     try {
//         const { id } = req.params;

//         const userToBeDeleted = await User.findByPk(id);

//         await userToBeDeleted.destroy();
//         res.send(userToBeDeleted).status(204);
//     } catch (error) {
//         next(error);
//     }
// });

/* can use for admin */
// router.get("/", async (req, res, next) => {
//     try {
//         const users = await User.findAll();
//         res.status(200).send(users);
//     } catch (error) {
//         next(error);
//     }
// });
