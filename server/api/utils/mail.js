const nodemailer = require("nodemailer");
const newDonation = require("./newDonation");

const sendEmail = (name, recipientEmail) => { // (to, name) after testing

  let transporter = nodemailer.createTransport({
    service: "gmail",
    logger: true,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASS
    }
  });

  const email = {
    from: "capstonetest.2101flex@gmail.com",
    to: "capstonetest.2101flex@gmail.com",
    subject: `New Donation to Claim`,
    html: newDonation(name),
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
