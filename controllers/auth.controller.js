import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { v4 as uuid4 } from "uuid";
import "dotenv/config";
import { db } from "../config/db.js";
import {
  createUser,
  findUserByEmail,
  findUserByVerifyToken,
  verifyUser,
} from "../models/user.model.js";
import { sendVerificationMail } from "../config/mailer.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "Email deja utilisé" });

    const passwordHash = await argon2.hash(password);
    const verifyToken = uuid4();

    await createUser(email, passwordHash, verifyToken);

    await sendVerificationMail(email, verifyToken);

    res.status(201).json({ message: "Compte créé , vérifier votre email" });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur ", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const user = await findUserByVerifyToken(token);
    if (!user) return res.status(400).json({ message: "Token Invalidre" });
    await verifyUser(user.id);
    res.status(200).json({ message: "Votre compte a bien été vérifié !" });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur ", error: error.message });
  }
};
