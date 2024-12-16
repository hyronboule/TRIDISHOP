[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Tridishop

## Description : 

Tridishop est une application de partage et de vente de modèles 3D, destinée aussi bien aux particuliers qu'aux professionnels. Elle permet à ses utilisateurs de publier, acheter ou partager des modèles 3D de manière simple et intuitive. L'objectif est de créer une plateforme pour les passionnés et les professionnels du design 3D.

## Requis : 
- Visual Studio Code (ou un autre IDE)
- Windows
- Docker
- Docker Desktop
- Node.js (version 20.x ou supérieure)
  
## A / Fonctionnalités principales :

* Publications : Les utilisateurs peuvent publier leurs modèles 3D avec des descriptions, tags et fixer un prix, ou les partager gratuitement.  
* Acheter : Les utilisateurs peuvent ajouter dans un panier et payer via PayPal.
* Compte : Les utilisateurs disposent d'un espace personnel pour gérer leurs publications et leurs informations.

## B / Installation et démarrage : 

**Cloner le projet :**
 - téléchargement soit du fichier ZIP
```bash
  git clone <url_du_dépôt>
```

**Installer les dépendances :**
Exécutez le script install.sh à la racine du projet :
```bash
 - ./install.sh
```
**Configurer les variables d'environnement :**

Copiez le fichier .env.example présent dans chaque dossier requis, renommez-le en .env et complétez-le avec vos propres variables d'environnement.

**Lancement du projet :**
- **Lancer tout le projet (frontend + backend) :**  
  À la racine du projet, exécutez la commande suivante :  
```bash
    docker-compose up --build --watch
 ```
- **Lancer uniquement le client :**
 ```bash
    cd client
    npm run dev
```
- **Lancer individuellement un service de l'API :**
Remplacez {le dossier voulu} par le dossier correspondant au service (exemple : auth, products, etc.) :
 ```bash
    cd backend/{le dossier voulu}
    npm run dev
```
## C / Technologies utilisées :

* Frontend : 
  - React avec Vite
  - React Three Fiber et Drei
  - Three.js
  - MUI (Material-UI)
  - Axios
  - react-router-dom
  - SweetAlert2
  - JS Cookie
  - FileSaver.js
  - JSPDF
  - JSZip
  - Sass
  - ESLint
  - Vitest
  - JSDoc

* Backend : 
  - axios
  - dotenv
  - express
  - mongoose
  - nodemon
  - body-parser
  - gridfs-stream
  - multer
  - uuid
  - paypal-rest-sdk

* Outils : 
  - Docker

## D / Structure du projet :

### **Client (Frontend)**

| **Dossier**         | **Description**                                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **docs/**           | Documentation générée automatiquement avec JSDoc.                                                                                                  |
| **src/**            | Code source de l'application.                                                                                                                      |
| **.env.example**    | Exemple de structure des variables d'environnement.                                                                                                |
| **Dockerfile**      |                                                                                                                                                    |
| **vite.config.js**  | Configuration spécifique pour Vite.                                                                                                                |
| **src/assets/**     | Contient les images ainsi que les fichiers relatifs aux CGU, CGV et à la politique de confidentialité.                                             |
| **src/components/** | Regroupe les différents composants de l'application.                                                                                               |
| **src/context/**    | Contient le fichier `User.jsx`, utilisé pour gérer le token et les informations associées.                                                         |
| **src/page/**       | Regroupe les différentes pages de l'application.                                                                                                   |
| **src/services/**   | Contient des fichiers organisés selon les appels API ou leur utilité, ainsi qu’un fichier `url.js`, qui centralise les endpoints des requêtes API. |
| **src/style/**      | Regroupe les fichiers de configuration des styles.                                                                                                 |
| **src/test/**       | Dossier contenant les tests, organisés en sous-dossiers selon le dossier testé.                                                                    |
### **Backend (Api)**

| **Dossier**      | **Description**                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| **admin/**       | Contient le code du service d'administration, dédié à la gestion des requêtes sensibles.                              |
| **api-gateway/** | Service central servant de point d'entrée pour toutes les requêtes, assurant le routage vers les services appropriés. |
| **auth/**        | Service dédié à l'authentification et à la gestion des tokens utilisateurs.                                           |
| **products/**    | Service de gestion des produits, incluant l'ajout, la modification et la suppression des produits.                    |
| **profil/**      | Service gérant les profils utilisateurs et leurs informations personnelles.                                           |
| **service/**     | Service responsable de la gestion des intégrations avec des services tiers (ex. : PayPal).                            |
| **testApi/**     | Dossier contenant les tests organisés pour valider les endpoints des différents services.                             |

### **Structure commune des dossiers avec quelques variations spécifiques** : 

| **Dossier/Fichier** | **Description**                                                                       |
| ------------------- | ------------------------------------------------------------------------------------- |
| **config/**         | Contient les fichiers de configuration du service.                                    |
| **controllers/**    | Contient les fichiers responsables de la logique du service.                          |
| **middlewares/**    | Regroupe les fichiers qui gèrent les étapes avant d’atteindre les contrôleurs.        |
| **models/**         | Contient les fichiers définissant les structures des données pour la base de données. |
| **routes/**         | Contient les fichiers qui définissent les endpoints et les fonctionnalités associées  |
| **utils/**          | Regroupe les fonctions utilitaires                                                    |
| **html/**           | Contient les templates HTML utilisés par le service.                                  |
  

## Documentation de l'application disponible: 
 - **API :** 
    https://documenter.getpostman.com/view/29250095/2sAYHwH4as
 - **Client :**
 La documentation est générée automatiquement avec **JSDoc**. Vous pouvez la retrouver dans le dossier suivant à la racine du projet:  
  ```bash
   cd client/docs
  ```
Pour visualiser la documentation, ouvrez le fichier index.html dans un navigateur.

Pour actualiser la documentation, exécutez la commande suivante à la racine du projet :
  ```bash
  npm run docs
  ```