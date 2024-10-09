FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build && npx prisma generate
CMD ["npm", "start"]

