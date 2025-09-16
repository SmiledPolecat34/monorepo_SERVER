import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./src/config/swagger.js";
import authRoutes from "./src/authentication/Auth.js";
import userRoutes from "./src/routes/user.routes.js";
import contactRoutes from "./src/routes/contact.routes.js";

dotenv.config();

const app = express();
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const PORT = process.env.PORT;

app.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */
app.use("/api", authRoutes);
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User routes
 */
app.use("/api", userRoutes);
/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact management
 */
// app.use("/", (req, res) => {
//   res.send("Page de test de connexion");
// });

app.use("/api", contactRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const mongoUri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connexion à MongoDB");
    app.listen(PORT, () => {
      console.log(`Le serveur marche en port: ${PORT}`);
      console.log(`API docs disponible à http://localhost:${PORT}/api-docs`);
      console.log(`Lien serv : http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error("La co Mongo n'a pas marché", err);
  });

export default app;
