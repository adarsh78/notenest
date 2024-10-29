import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(409)
        .json({
          message: "User already exists, you can login",
          success: false,
        });
    }

    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ message: "SignUp Successfully", success: true });
  } catch (error) {
    console.error(`Error occurred while signup, ${error}`);
    res
      .status(500)
      .json({ message: `Internal server error: ${error}`, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({
        message: "Login Successfully",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
  } catch (error) {
    console.error(`Error occurred while login, ${error}`);
    res
      .status(500)
      .json({ message: `Internal server error: ${error}`, success: false });
  }
};
