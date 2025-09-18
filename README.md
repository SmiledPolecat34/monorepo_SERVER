# API du Projet

Serveur backend pour l'application, fournissant une API RESTful pour l'authentification des utilisateurs et la gestion des contacts.

## Fonctionnalités

- Inscription et authentification des utilisateurs avec JWT.
- Opérations CRUD pour les contacts.
- Routes protégées.
- Documentation de l'API avec Swagger.

## Prérequis

- [Node.js](https://nodejs.org/) (v14 ou ultérieure)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. **Clonez le dépôt**

   ```bash
   git clone <repository-url>
   cd JS/SERVER
   ```

2. **Installez les dépendances**

   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement**

   Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes. Vous pouvez utiliser le fichier `.env.example` comme modèle.

   ```
   MONGO_DB_HOST=localhost
   MONGO_DB_PORT=27017
   MONGO_DB_NAME=mydatabase
   PORT=3000
   JWT_SECRET=votre_cle_jwt_secrete
   ```

## Scripts Disponibles

- **`npm run dev`**: Démarre le serveur en mode développement avec rechargement automatique (hot-reloading).
- **`npm start`**: Démarre le serveur en mode production.
- **`npm run lint`**: Analyse le code pour les erreurs de style et de syntaxe.
- **`npm run lint:fix`**: Corrige automatiquement les erreurs de style et de syntaxe.
- **`npm test`**: Lance les tests unitaires avec Jest.
- **`npm run test2`**: Lance les tests en utilisant les modules VM expérimentaux de Node.js, ce qui peut être nécessaire pour les projets utilisant des modules ES6 avec Jest.

## Endpoints de l'API

La documentation complète de l'API est disponible via Swagger à l'adresse [http://localhost:3000/api-docs](http://localhost:3000/api-docs) une fois le serveur démarré.

### Authentification

- `POST /api/auth/register`: Inscription d'un nouvel utilisateur.
- `POST /api/auth/login`: Connexion d'un utilisateur et récupération d'un JWT.

### Contacts

- `POST /api/contacts`: Crée un nouveau contact (nécessite une authentification).
- `GET /api/contacts`: Récupère tous les contacts de l'utilisateur connecté (nécessite une authentification).
- `PATCH /api/contacts/:id`: Met à jour un contact (nécessite une authentification).
- `DELETE /api/contacts/:id`: Supprime un contact (nécessite une authentification).
