### Lancement d'un projet Node.js avec Express, Nodemon, ESLint et Prettier

// Initialisation du projet Node.js
npm init -y // Pour init le projet (package.json)
npm i express // Pour le serveur web

npm i --save-dev nodemon // Pour le rechargement auto du serveur

npm i --save-dev eslint // Pour l'analyse statique du code
npm i --save-dev prettier // Pour le formatage du code

npm install --save-dev eslint-config-prettier // Pour désactiver les règles ESLint qui pourraient entrer en conflit avec Prettier
npm install --save-dev eslint-plugin-prettier // Pour intégrer Prettier dans ESLint

// Configuration de ESLint
npx eslint --init // Pour initialiser ESLint (création du fichier .eslintrc.json)
Noms de fichiers créés : .eslintrc.json, .eslint.config.js

// Configuration de Prettier
.prettierrc.json // Création du fichier de configuration Prettier

// Fichier pour les variables d'environnement
.env.example
