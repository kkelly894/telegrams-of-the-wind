import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../db/queries/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required.",
    });
  }

  try {
    const existingUsername = await getUserByUsername(username);

    if (existingUsername) {
      return res.status(400).json({
        message: "Username is already in use.",
      });
    }

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      return res.status(400).json({
        message: "Email is already in use.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(username, email, passwordHash);

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to register user.",
    });
  }
});

export default router;
