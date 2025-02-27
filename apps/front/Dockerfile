# Étape de build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

## Etape de production
FROM busybox:1.35
# Create a non-root user to own the files and run our server
RUN adduser -D static
USER static
WORKDIR /home/static

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY --from=build /app/dist/kama-games-cloud/browser .

# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-v", "-p", "5000"]
