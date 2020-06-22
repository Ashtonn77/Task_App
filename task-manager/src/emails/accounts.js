const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(sendGridApiKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ashtonrbay@gmail.com",
    subject: "Thanks for joining the ThinkBeforeYouInk Family",
    text: `Welcome, ${name}. Please do enjoy the app and feel free to let us know if you experience any issues`,
  });
};

module.exports = {
  sendWelcomeEmail,
};
