# /monorepo/apps/backend/Dockerfile

# Utilisez une image de base officielle
FROM node:22

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de build pré-construits
COPY apps/backend/dist/bundle/index.js /app

# Exposez le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "index.js"]
