const router = require("express").Router();
const User = require("../db/model/User");

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
        if (req.user.id === req.params.id) {
            const updateData = req.body;
            const { id } = req.params;
            const userToBeUpdated = await User.findByPk(id);
            const editedUser = await userToBeUpdated.update(updateData);
            res.send(editedUser.dataValues).status(204);
        }
    } catch (error) {
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
