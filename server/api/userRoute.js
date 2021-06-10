const router = require("express").Router();
const User = require("../db/model/User");

// Errors
const { notFound, badSyntax, conflict, unauthorized } = require("./errors");

//post routes

router.post("/", async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, checked } = req.body;
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            isDonor: checked === "isDonor",
        });
        res.status(201).send(newUser);
    } catch (error) {
        next(error);
    }
});

//put routes

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, gender, race } = req.body;
        console.log(req.body);

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

        // Save changes
        await user.save();

        // Get updated user
        let updatedUser = await User.findOne({ where: { id } });

        console.log(updatedUser);
        res.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//delete routes
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const userToBeDeleted = await User.findByPk(id);

        await userToBeDeleted.destroy();
        res.send(userToBeDeleted).status(204);
    } catch (error) {
        next(error);
    }
});

/* can use for admin */
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

/* for admin to see a single user's info */
// router.get('/:id', async (req, res, next) => {
//   try {
//       const user = await User.findByPk(req.params.id);
//       res.status(200).send(user);

//   } catch (error) {
//     next(error);
//   }
// });
