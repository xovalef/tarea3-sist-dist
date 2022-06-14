FROM node:18.1.0-alpine3.15
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev"]