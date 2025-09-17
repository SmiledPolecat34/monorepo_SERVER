import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Routes d'authentification
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Enregistrer un user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User créé
 *       400:
 *         description: User déjà existant
 *       404:
 *        description: Ressource non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  console.log("Inscription de :", email);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User déjà existant" });
    }
    const hashedPassword = await bcrypt.hash(password, JWT_SECRET);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", userId: newUser._id });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login d'un user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login réussi
 *       400:
 *         description: Identifiants invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Ressource non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Connexion de :", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User non trouvé" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
