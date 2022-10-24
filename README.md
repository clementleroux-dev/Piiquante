# Formation développeur web

## 📎 Projet 6 : Piiquante

Developpement du backend de l'application Piiquante

## Technologies :

- Node.js
- Express
- Mongoose

## Base de données :

- MongoDB Atlas

## Installation :

Cloner les repository :

- backend : `git clone https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git frontend`
- frontend : `git clone https://github.com/clementleroux-dev/Piiquante.git backend`

Installer les dépendances dans chacuns des deux dossiers avec la commande `npm install`

### Frontend :

Pour démarrer le serveur vous pouvez utiliser la commande `npm run start`\
Puis vous rendre sur `http://localhost:4200/`

### Backend :

A la racine du dossier back\
créer un répertoire `images`\
créer un fichier `.env` en complétant les valeurs :

```
USER_DB = '<Nom d'utilisateur mongoDB>'
PASSWORD_DB = '<Mot de passe mongoDB>'
NAME_DATABASE = '<Nom base de donnée mongoDB>'
```

Démarrer ensuite le serveur avec la commande `nodemon server` ou `node server`
