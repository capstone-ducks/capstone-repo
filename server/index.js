// Server setup
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4500;
// const morgan = require("morgan");
require("dotenv").config();

let server = "";

// Database Import
const { syncAndSeed } = require("./db");
//syncAndSeed();

// Import api routes
//
//

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Middleware Logging
// *DEV USE ONLY* deactivated for heroku
// app.use(morgan("dev"));

// Api Routes
//
//
app.use("/api/users", require("./api/userRoute"));
app.use("/api/donations", require("./api/donationRoute"));
app.use("/api/auth", require("./api/authRoute"));

// Send the app
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || "Internal server error");
});

const init = async () => {
    try {
        syncAndSeed();
        if (!module.parent) {
            server = app.listen(PORT, () =>
                console.log(`
            Listening on Port ${PORT}
            http://localhost:${PORT}
        `),
            );
        }
    } catch (error) {
        console.log(error);
    }
};

init();

process.on("SIGINT", () => {
    console.log("Bye bye!");
    process.exit();
});

module.exports = { app, PORT };
