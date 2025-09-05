import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const MONGO_DB_PORT = process.env.MONGO_DB_PORT;
const MONGO_DB_HOST = process.env.MONGO_DB_HOST;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

app.use(express.json());

const mongoUri = `mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;
mongoose.connect(mongoUri,)
    .then(() => {
        console.log('Connexion à MongoDB');
        const PORT = process.env.MONGO_DB_PORT
        app.listen(PORT, () => {
            console.log(`Le serveur marche en port: ${PORT}`);
        });
    }
    ).catch(err => {
        console.error("La co Mongo n'a pas marché", err);
    });

export default app;