import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import Contact from "../models/Contact.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Management des contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récup la liste des contacts de l'utilisateur
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur du serveur
 */
router.get("/contacts", requireAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact creé avec succès
 *       400:
 *         description: Entrées invalides
 *       401:
 *         description: Accès non autorisé
 *       500:
 *         description: Erreur du serveur
 */
router.post("/contacts", requireAuth, async (req, res) => {
  const { firstName, lastName, phone } = req.body;

  try {
    const newContact = new Contact({
      user: req.user.id,
      firstName,
      lastName,
      phone,
    });

    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      return res.status(400).json({ errors: err.errors });
    }
    res.status(500).send("Server Error");
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   patch:
 *     summary: Mise à jour d'un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur du serveur
 */
router.patch("/contacts/:id", requireAuth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Pour s'assurer que l'utilisateur possède le contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur du serveur
 */
router.delete("/contacts/:id", requireAuth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Pour s'assurer que l'utilisateur possède le contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
