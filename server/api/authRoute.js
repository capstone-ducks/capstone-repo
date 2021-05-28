const router = require("express").Router();
const User = require("../db/model/User");

async function requireToken(req, res, next) {
    try {
        if (!req.headers.authorization) res.status(401).send("GTFO");
        const token = req.headers.authorization;
        const user = await User.byToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

// get route for user login

router.get("/", requireToken, async (req, res, next) => {
    try {
        const { user } = req;
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
});

// post route for logging in and signing up

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;
    await User.authenticate({ email, password })
        .then((token) => {
            res.status(201).send({ token });
        })
        .catch((err) => {
            //console.log(err);
            next(err);
        });
});

module.exports = router;
