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
    } catch (err) {
        console.log('Error with /api/auth GET route: ', err);
        next(err);
    }
});

// post route for logging in and signing up

router.post("/", async (req, res, next) => {
    const { email, password } = req.body;
    console.log('LOGIN BODY', req.body)
    await User.authenticate({ email, password })
        .then((token) => {
            res.status(201).send({ token });
        })
        .catch((err) => {
            console.log('Error with /api/auth POST login route: ', err);
            next(err);
        });
});

// post route for signing up
// have currently left off publicKey, cryptoAddress, and the city and state fields
// for privacty, entering city and state should be optional, so we could add '' as a defaultValue in the model and then make a put request if a user wants to later provide their location to be matched w/i their local community

router.post("/signup", async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, isDonor } = req.body;
        // console.log('BODY', req.body)
        const alreadyRegistered = await User.findAll({ where: {email} });
        // console.log('alreadyRegistered', alreadyRegistered)
        if (alreadyRegistered.length) {
            res.status(401).send(`Email address ${email} already in use.`);
        }
        else {
            const newUser = await User.create({
                firstName, lastName, email, password, isDonor
            });
            console.log('newUser', newUser.dataValues)

            const token =  await newUser.authenticate({ email, password });
            console.log('TOKEN', token)
            res.status(201).send( token );
        }
    }
    catch(err) {
            console.log('Error with /api/auth/signup POST route: ', err);
            next(err);
        };
});

module.exports = router;
