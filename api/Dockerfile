FROM node:alpine
WORKDIR /social-media-api
COPY ./package*.json ./
RUN npm install
COPY . .
CMD ["npm","start"]
ENV NAME api
EXPOSE 5000


