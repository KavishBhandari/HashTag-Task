FROM node:22-alpine
WORKDIR /HashTag-Task
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]       