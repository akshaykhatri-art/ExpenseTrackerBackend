import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await authModel.register({
      firstName,
      lastName,
      email,
      password: hashed,
    });

    res.status(200).json({ message: "Registered successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await authModel.login(email);

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.Password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { userId: user.PersonId, email: user.LoginId },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user.PersonId,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export default { register, login };
