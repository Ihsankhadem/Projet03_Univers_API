# Image Node officielle légère
FROM node:lts-alpine

# Répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installation dépendances
RUN npm install

# Copie du projet
COPY . .

# Compilation TypeScript -> dist
RUN npm run build

# Port exposé
EXPOSE 5000

# Démarrage serveur
CMD ["node", "dist/server.js"]