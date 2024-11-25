FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build
CMD ["npm", "run", "start", "--", "--host"]
