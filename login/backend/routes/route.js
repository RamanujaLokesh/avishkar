require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");
const { sendEmail, mailTemplate } = require("../utils/email");

const NumSaltRounds = Number(process.env.NO_OF_SALT_ROUNDS);

// Login route using registration number and password
router.post("/login", async (req, res) => {
  const reg_no = req.body.reg_no;  // Use reg_no instead of email
  const loginpassword = req.body.password;

  try {
    const user = await db.get_user_by_reg_no(reg_no); 

    if (!user || user.length === 0) {
      return res.json({
        success: false,
        message: "You are not registered!",
      });
    }

    const storedHashPassword = user[0].password;
    const isPasswordMatch = await bcrypt.compare(loginpassword, storedHashPassword);
    
    if (isPasswordMatch) {
      res.json({
        success: true,
        message: "Login Successful",
      });
    } else {
      res.json({
        success: false,
        message: "Wrong password",
      });
    }
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Forgot password route using registration number to retrieve email
router.post("/forgotPassword", async (req, res) => {
  const reg_no = req.body.reg_no;

  try {
    const user = await db.get_email_by_reg_no(reg_no);

    if (!user || user.length === 0) {
      return res.json({
        success: false,
        message: "You are not registered!",
      });
    }

    const email = user[0].clg_mail;  // Updated to match the correct column name
    const token = crypto.randomBytes(20).toString("hex");
    const resetToken = crypto.createHash("sha256").update(token).digest("hex");

    await db.update_forgot_password_token(reg_no, resetToken);  // Use reg_no instead of userId

    const mailOption = {
      email: email,
      subject: "Forgot Password Link",
      message: mailTemplate(
        "We have received a request to reset your password. Please reset your password using the link below.",
        `${process.env.FRONTEND_URL}/resetPassword?reg_no=${reg_no}&token=${resetToken}`, // Updated parameter
        "Reset Password"
      ),
    };
    await sendEmail(mailOption);
    
    res.json({
      success: true,
      message: "A password reset link has been sent to your email.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Reset password route
router.post("/resetPassword", async (req, res) => {
  const { password, token, reg_no } = req.body; // Changed userId to reg_no

  try {
    // Check if reg_no and token are provided
    if (!reg_no || !token) {
      console.log("Request body missing reg_no or token:", req.body); // Log the entire body
      return res.status(400).json({
        success: false,
        message: "Registration number and token are required!",
      });
    }

    // Log reg_no for debugging
    console.log("Reset Password Request - reg_no:", reg_no, "token:", token);

    const userToken = await db.get_password_reset_token(reg_no); // Use reg_no instead of userId

    // Log the retrieved userToken for debugging
    console.log("Retrieved User Token:", userToken);

    if (!userToken || userToken.length === 0) {
      console.log("No token found for reg_no:", reg_no); // Log if no token found
      return res.status(400).json({
        success: false,
        message: "Some problem occurred! Invalid registration number or token.",
      });
    }

    const currDateTime = new Date();
    const expiresAt = new Date(userToken[0].expires_at);
    
    if (currDateTime > expiresAt) {
      return res.status(400).json({
        success: false,
        message: "Reset Password link has expired!",
      });
    }

    if (userToken[0].token !== token) {
      return res.status(400).json({
        success: false,
        message: "Reset Password link is invalid!",
      });
    }

    await db.update_password_reset_token(reg_no); // Use reg_no instead of userId
    const salt = await bcrypt.genSalt(NumSaltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.update_user_password(reg_no, hashedPassword); // Use reg_no instead of userId

    res.json({
      success: true,
      message: "Your password reset was successful!",
    });
  } catch (err) {
    console.log("Error during password reset:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
