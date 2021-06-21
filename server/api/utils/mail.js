const nodemailer = require("nodemailer");
const newDonation = require("./newDonation");
const {ADMIN_EMAIL, ADMIN_PASS} = require("./env");

const sendEmail = () => { // (to, name) after testing

  let transporter = nodemailer.createTransport({
    service: "gmail",
    logger: true,
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_PASS
    }
  });

  const email = {
    from: "capstonetest.2101flex@gmail.com",
    to: "capstonetest.2101flex@gmail.com",
    subject: `New Donation to Claim`,
    html: newDonation(),
  };

    // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  transporter.sendMail(email, function(err, res) {
    try {
      console.log("email sent!");
      transporter.close();
    }
    catch (err) {
      console.log("Error sending email confirmaion ", err);
      transporter.close();
    }
  })
};



module.exports = sendEmail;
