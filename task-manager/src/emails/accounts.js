const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ashtonrbay@gmail.com",
    subject: "Thanks for joining the ThinkBeforeYouInk Family",
    text: `Welcome, ${name}. Please do enjoy the app and feel free to let us know if you experience any issues`,
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ashtonrbay@gmail.com",
    subject: "Sorry to see you go",
    text: `Goodbye ${name}, we truly did love having you with us. Know that there will always be a place for you here, if you ever wish to come back`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};
