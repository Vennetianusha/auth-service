FROM node:18-bullseye-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 🔥 Generate Prisma client INSIDE container
RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "dev"]
