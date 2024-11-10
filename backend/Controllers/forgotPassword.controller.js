import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserModel from "../Models/User.js"
// import { sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/email.js";

dotenv.config();

export const forgotPassword = async (req, res) => {
    try {   
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if(!user) {
            return res.status(400).json({ success: false, message: "No user found with that email address" });
        }

        // Generate reset token

        const token = crypto.randomBytes(20).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        //send reset email

        // const resetLink = `http://localhost:5173/reset-password/${token}`;

        // await sendPasswordResetEmail(user.email, resetLink);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.APP_PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Reset Password",
            html: `<h1>Reset Your Password</h1>
          <p>Click on the following link to reset your password:</p>
          <a href="https://notenest-client.vercel.app/reset-password/${token}">Reset Password Link</a>
          <p>If you didn't request a password reset, please ignore this email.</p>`,
          };

           // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ success: false, message: err.message });
        }
        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    });
    
    } catch (error) {
        console.error(`Error occurred while sending the reset password link: ${error}`);
        res.status(500).json({ success: false, message: "Error sending email, please try again later" });
    }
};

// Reset Password - Validating token and updating password

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        const user = await UserModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() }, });

        if(!user){
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        // if(user.resetTokenExpiry < Date.now()){
        //     return res.status(400).json({success: false, message: "Reset token has expired" });
        // }

        //update password

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        // await sendResetSuccessEmail(user.email);
        res.status(200).json({ success: true, message: "Password has been successfully updated" });

    } catch (error) {
        console.error(`Error occurred while updating password: ${error}`);
        res.status(500).json({ message: "Internal Server error, please try again later" });
    }
};
