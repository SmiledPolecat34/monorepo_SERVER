import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Récup le profil de l'user connecté
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur
 *       401:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur du serveur
 */
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
