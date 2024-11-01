require("dotenv").config();

const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const router = express.Router();

const db = require("../db");
const { sendEmail, mailTemplate } = require("../utils/email");

const NumSaltRounds = Number(process.env.NO_OF_SALT_ROUNDS);

router.post("/forgotPassword", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await db.get_user_by_email(email);

    if (!user || user.length === 0) {
      res.json({
        success: false,
        message: "Your are not registered!",
      });
    } else {
      const token = crypto.randomBytes(20).toString("hex");
      const resetToken = crypto.createHash("sha256")
        .update(token)
        .digest("hex");
      await db.update_forgot_password_token(user[0].id, resetToken);

      const mailOption = {
        email: email,
        subject: "Forgot Password Link",
        message: mailTemplate(
          "We have received a request to reset your password. Please reset your password using the link below.",
          `${process.env.FRONTEND_URL}/resetPassword?id=${user[0].id}&token=${resetToken}`,
          "Reset Password"
        ),
      };
      await sendEmail(mailOption);
      res.json({
        success: true,
        message: "A password reset link has been sent to your email.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/resetPassword", async (req, res) => {
  try {
    const { password, token, userId } = req.body;
    const userToken = await db.get_password_reset_token(userId);
    if (!res || res.length === 0) {
      res.json({
        success: false,
        message: "Some problem occurred!",
      });
    } else {
      const currDateTime = new Date();
      const expiresAt = new Date(userToken[0].expires_at);
      if (currDateTime > expiresAt) {
        res.json({
          success: false,
          message: "Reset Password link has expired!",
        });
      } else if (userToken[0].token !== token) {
        res.json({
          success: false,
          message: "Reset Password link is invalid!",
        });
      } else {
        await db.update_password_reset_token(userId);
        const salt = await bcrypt.genSalt(NumSaltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        await db.update_user_password(userId, hashedPassword);
        res.json({
          success: true,
          message: "Your password reset was successfully!",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;