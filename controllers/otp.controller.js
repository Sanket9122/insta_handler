const Otp = require("../models/otp.model");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const randomNo = Math.floor(100000 + Math.random() * 900000).toString();
    const code = await bcrypt.hash(randomNo, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const user = await User.findOne({ where: { email } });
    console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingOtp = await Otp.findOne({ where: { userId: user.id } });
    if (existingOtp) {
      await existingOtp.destroy();
    }
    await Otp.create({ userId: user.id, code, expiresAt });
    sendMail(user, randomNo);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingOtp = await Otp.findOne({ where: { userId: user.id } });

    if (!existingOtp) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (existingOtp.expiresAt < new Date()) {
      await existingOtp.destroy();
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp, existingOtp.code);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await existingOtp.destroy();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 60 * 1000 * 5,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `OTP verified successfully. Welcome ${user.username}`,
        success: true,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message }); 
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  resetPassword,
};