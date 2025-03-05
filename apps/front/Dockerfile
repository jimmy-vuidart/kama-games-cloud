# /monorepo/apps/front/Dockerfile

# Utilisez une image de base officielle pour servir l'application
FROM node:22

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de build pré-construits
COPY apps/front/dist/kama-games-cloud /app/dist

# Exposez le port sur lequel l'application va tourner
EXPOSE 4000

# Commande pour démarrer l'application avec SSR
CMD ["node", "dist/server/server.mjs"]
