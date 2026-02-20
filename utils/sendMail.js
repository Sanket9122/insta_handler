const nodemailer = require("nodemailer");
const getOtpTemplate = require("./otpTemplate"); 

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (user, otp) => {
  try {
    await transporter.sendMail({
      from: `Instagram Clone <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your OTP Code",
      html: getOtpTemplate(otp, user.username),
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;